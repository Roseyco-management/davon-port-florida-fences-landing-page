import { NextResponse } from 'next/server';
import { notifyAgencyLead } from '@/lib/agencyNotify';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      propertyRole,
      preferredDate,
      preferredTime,
      notes,
    } = body;

    // Check if API key is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      // Still return success so the user sees confirmation
      // Log the lead data so it's not lost
      console.log('=== Lead Data (email not sent - API key missing) ===');
      console.log({ firstName, lastName, email, phone, address, city, state, zip, propertyRole, preferredDate, preferredTime, notes });
      return NextResponse.json({
        success: true,
        id: 'pending-' + Date.now(),
        note: 'Email service not configured'
      });
    }

    // Dynamically import Resend only when API key exists
    const { Resend } = await import('resend');
    const EstimateRequestEmail = (await import('@/emails/estimate-request')).default;

    const resend = new Resend(apiKey);

    // Use verified subdomain for sending
    const fromEmail = process.env.SENDER_EMAIL || 'Davenport Fences <info@landingpage.davenportfloridafences.com>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [process.env.BUSINESS_EMAIL || 'info@landingpage.davenportfloridafences.com'],
      replyTo: email,
      subject: `New Fence Estimate Request - ${firstName} ${lastName}`,
      react: EstimateRequestEmail({
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        propertyRole,
        preferredDate,
        preferredTime,
        notes,
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Agency lead notification — the ONE standard shape.
    // See marketing-ide/docs/LEAD-NOTIFICATION-STANDARD.md. Zero PII by design.
    await notifyAgencyLead({
      client: "Davenport Fences",
      apiKey: apiKey,
      source: "Fence estimate form",
      ownerLabel: "the client",
      timeZone: "America/New_York",
    });

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

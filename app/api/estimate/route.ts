import { NextResponse } from 'next/server';

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

    // Use custom domain if verified, otherwise use Resend's default sender
    const fromEmail = process.env.SENDER_EMAIL || 'Davenport Fences <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [process.env.BUSINESS_EMAIL || 'info@davenportfloridafences.com'],
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

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

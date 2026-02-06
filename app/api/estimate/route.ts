import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EstimateRequestEmail from '@/emails/estimate-request';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } = await resend.emails.send({
      from: 'Davenport Fences <info@davenportfloridafences.com>',
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

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, message } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitized = {
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      message: (message || '').trim().slice(0, 5000),
      timestamp: new Date().toISOString(),
    };

    // Log for now — connect to email service / Airtable / database later
    console.log('Contact form submission:', sanitized);

    return NextResponse.json(
      { success: true, message: 'Message received. We will get back to you within 24 hours.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

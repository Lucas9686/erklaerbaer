import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

// Rate limiting: simple in-memory store (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  // Get client IP for rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
             request.headers.get('x-real-ip') ||
             'unknown';

  // Check rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte warte einen Moment.' },
      { status: 429 }
    );
  }

  // Validate webhook URL is configured
  if (!WEBHOOK_URL) {
    console.error('N8N_WEBHOOK_URL is not configured');
    return NextResponse.json(
      { error: 'Server nicht korrekt konfiguriert' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    // Validate request body
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'Nachricht fehlt oder ungültig' },
        { status: 400 }
      );
    }

    if (!body.sessionId || typeof body.sessionId !== 'string') {
      return NextResponse.json(
        { error: 'Session ID fehlt oder ungültig' },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic length limits)
    const message = body.message.slice(0, 2000);
    const sessionId = body.sessionId.slice(0, 100);

    // Forward to n8n webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: {
          message,
          sessionId,
        }
      }),
    });

    if (!response.ok) {
      console.error(`n8n webhook error: ${response.status}`);
      return NextResponse.json(
        { error: 'Der Bär schläft gerade...' },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ response: data.response });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}

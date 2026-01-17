const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';

interface WebhookResponse {
  response: string;
}

export async function sendMessage(message: string, sessionId: string): Promise<string> {
  if (!WEBHOOK_URL) {
    throw new Error('Webhook URL nicht konfiguriert');
  }

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
    throw new Error(`Der Bär schläft gerade... (HTTP ${response.status})`);
  }

  const data: WebhookResponse = await response.json();
  return data.response;
}

export function generateSessionId(): string {
  return `eb_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

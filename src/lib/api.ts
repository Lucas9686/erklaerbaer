interface ApiResponse {
  response?: string;
  error?: string;
}

export async function sendMessage(message: string, sessionId: string): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      sessionId,
    }),
  });

  const data: ApiResponse = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || `Der Bär schläft gerade... (HTTP ${response.status})`);
  }

  if (!data.response) {
    throw new Error('Keine Antwort erhalten');
  }

  return data.response;
}

export function generateSessionId(): string {
  return `eb_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

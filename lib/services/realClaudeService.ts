/**
 * Real Claude API Service
 *
 * Calls the actual Claude API via our Next.js API route
 */

interface ClaudeResponse {
  answer: string;
  citations?: string[];
  tokensUsed: number;
}

/**
 * Get a real Claude API response
 */
export async function getRealClaudeAnswer(
  message: string,
  roleId: string
): Promise<ClaudeResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        roleId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      answer: data.answer,
      citations: data.citations || [],
      tokensUsed: data.tokensUsed || 0,
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

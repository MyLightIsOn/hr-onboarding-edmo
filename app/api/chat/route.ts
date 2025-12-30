import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message, roleId } = await req.json();

    if (!message || !roleId) {
      return NextResponse.json(
        { error: 'Missing message or roleId' },
        { status: 400 }
      );
    }

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are an AI onboarding assistant for Airbnb employees. The user is in the role: ${roleId}.
          
Please answer their question about Airbnb policies, benefits, or onboarding.

User question: ${message}

Provide a helpful, friendly response. If you reference policies, mention them by name.`,
        },
      ],
    });

    // Extract text from response
    const textContent = response.content.find((block) => block.type === 'text');
    const answer = textContent && textContent.type === 'text' ? textContent.text : 'Sorry, I could not generate a response.';

    return NextResponse.json({
      answer,
      citations: [], // We can enhance this later with actual policy citations
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    });
  } catch (error) {
    console.error('Claude API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from Claude' },
      { status: 500 }
    );
  }
}

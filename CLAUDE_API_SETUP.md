# Real Claude API Setup Guide

## Steps to Enable Real Claude API

### 1. Install Anthropic SDK

```bash
npm install @anthropic-ai/sdk
```

### 2. Verify Environment Variable

Make sure your `.env.local` file has:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

### 3. Restart the Development Server

```bash
npm run dev
```

### 4. Test the Integration

1. Open the app: `http://localhost:3000`
2. Select any role
3. Click the chat button (bottom right)
4. Click "Use Real Claude" button in the chat panel
5. Ask a question!

## How It Works

### Architecture

1. **Client** (ChatPanel.tsx) → Sends message to API route
2. **API Route** (`app/api/chat/route.ts`) → Calls Claude API
3. **Claude API** → Returns response
4. **Client** → Displays answer

### Toggle Switch

The chat panel has a toggle that switches between:
- **Mock Mode**: Uses local `mockClaudeService.ts` for instant, pre-programmed responses
- **Real Claude**: Calls actual Claude API via `/api/chat` endpoint

### Files Created

1. `app/api/chat/route.ts` - Next.js API route that calls Claude
2. `lib/services/realClaudeService.ts` - Client-side service to call our API
3. `components/panels/ChatPanel.tsx` - Updated with toggle switch

### API Route Details

The API route (`/api/chat`):
- Uses `claude-sonnet-4-20250514` model
- Max 1024 tokens
- Receives: `{ message, roleId }`
- Returns: `{ answer, citations, tokensUsed }`

### Error Handling

- Network errors → Shows error message to user
- API errors → Logs to console, shows friendly error
- Missing API key → Will fail with 500 error

## Testing Real Claude

Try these questions:

1. "What's the remote work policy for engineers?"
2. "How do I expense a conference?"
3. "What security training do I need?"
4. "What are Airbnb's benefits?"

Compare the answers between:
- **Mock mode**: Detailed, pre-written, policy-based answers
- **Real Claude**: Fresh, AI-generated answers from Claude API

## Future Enhancements

### Policy Context (Phase 2)
```typescript
// Add policy documents to Claude's context
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  system: `You are an HR assistant. Here are the relevant policies:\n\n${policyContext}`,
  messages: [...]
});
```

### Streaming (Phase 3)
```typescript
// Stream responses for better UX
const stream = await anthropic.messages.stream({
  model: 'claude-sonnet-4-20250514',
  messages: [...]
});

for await (const chunk of stream) {
  // Send chunks to client
}
```

### Citations (Phase 4)
- Parse policy references from Claude's response
- Link to actual policy documents
- Show confidence scores

## Troubleshooting

### Error: "Module not found: @anthropic-ai/sdk"
**Solution**: Run `npm install @anthropic-ai/sdk`

### Error: "API key not found"
**Solution**: Check `.env.local` has `ANTHROPIC_API_KEY=...`

### Error: "Failed to get response from Claude"
**Solution**: Check console for detailed error. Might be:
- Invalid API key
- Rate limit exceeded
- Network issues

### Toggle doesn't work
**Solution**: Make sure you've restarted the dev server after installing the SDK

## Cost Considerations

Each API call costs based on tokens:
- Input: ~$3 per million tokens
- Output: ~$15 per million tokens

Typical chat message:
- Input: ~200 tokens
- Output: ~300 tokens
- Cost: ~$0.005 per message

For demo purposes, this is very affordable!

## Next Steps

Once this works, we can:
1. Add Skills-based routing (route to role-specific skills)
2. Add policy document context
3. Stream responses
4. Add better error handling
5. Add conversation memory
6. Track token usage in UI

Enjoy testing real Claude! 🚀

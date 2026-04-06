# Chatbot System Documentation

## Overview

The BlueForge chatbot is a simple, intelligent assistant that helps visitors learn about services, solutions, products, and processes. It appears as a floating button in the bottom-right corner of every page.

## Architecture

### Components

1. **ChatInterface** (`src/components/chatbot/chat-interface.tsx`)
   - Handles UI rendering (chat window, button, messages)
   - Manages conversation state
   - Sends user messages to API
   - Displays bot responses
   - Real-time typing indicator

2. **API Route** (`src/app/api/chatbot/route.ts`)
   - Receives user messages
   - Processes and generates responses
   - Uses keyword matching against knowledge base
   - Returns response to frontend

3. **Knowledge Base** (`src/lib/site-data.tsx`)
   - `chatbotKnowledge` array with site topics
   - Each topic has slug, title, summary, and href
   - Used for intelligent routing and responses

## Features

✅ **Responds to Common Questions**
- Greetings ("Hi", "Hello")
- Help requests ("What can you do?")
- Service inquiries (mention of services, solutions, products)
- Contact requests ("Contact us")
- Pricing questions ("How much?")

✅ **Intelligent Routing**
- Recognizes keywords and links users to relevant pages
- Provides summaries from knowledge base
- Suggests related pages

✅ **User Friendly**
- Clean, modern chat interface
- Smooth animations
- Loading indicators
- Works on all screen sizes
- Mobile responsive

## Customization

### Adding New Topics to Knowledge Base

Edit `src/lib/site-data.tsx`:

```typescript
export const chatbotKnowledge = [
  {
    slug: "my-topic",
    title: "My Topic Name",
    summary: "Brief summary of this topic...",
    href: "/my-page",
  },
  // ... more topics
];
```

### Updating Response Patterns

Edit `src/app/api/chatbot/route.ts` in the `generateResponse()` function:

```typescript
if (lowerMessage.includes("your-keyword")) {
  return "Your custom response here...";
}
```

### Styling Changes

The chat component uses Tailwind CSS. Modify `src/components/chatbot/chat-interface.tsx`:

- **Chat button**: Update `bg-blue-600` classes
- **Chat window**: Modify header gradient, colors
- **Message bubbles**: Change colors, padding, radius

### Localization

Currently English only. To add multiple languages:

```typescript
type Message = {
  id: string;
  type: "user" | "bot";
  content: string;
  language: "en" | "es" | "fr";
  timestamp: Date;
};
```

## API Endpoint

### POST /api/chatbot

**Request:**
```json
{
  "message": "What services do you offer?"
}
```

**Response:**
```json
{
  "response": "BlueForge offers web development, mobile app development, ERP systems..."
}
```

**Error Response:**
```json
{
  "error": "Failed to process your message"
}
```

## Response Logic Flow

```
User Message
    ↓
Check for keyword match in knowledge base
    ↓
If match found → Return topic summary + link
    ↓
If no match → Check for common question patterns
    ↓
If pattern found → Return relevant response
    ↓
If no pattern → Return helpful generic response
```

## Enhancing the Chatbot

### Phase 2: AI Integration

To use OpenAI or similar AI service:

```typescript
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateResponse(userMessage: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a BlueForge assistant..." },
      { role: "user", content: userMessage },
    ],
  });
  return response.choices[0].message.content;
}
```

### Phase 2: Conversation History

Add database to store conversations for analytics and improvement.

### Phase 2: User Handoff

Add option to escalate to human support:

```typescript
if (conversationLength > 5) {
  return "Would you like to speak with someone from our team? Contact /support";
}
```

## Monitoring & Analytics

Track these metrics:
- Total conversations started
- Average conversation length
- Common user questions
- Handoff rate to human support
- User satisfaction

Example tracking code:

```typescript
await fetch("/api/analytics/chat", {
  method: "POST",
  body: JSON.stringify({
    event: "message_sent",
    timestamp: new Date(),
    messageLength: input.length,
  }),
});
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Chat button not appearing | Ensure ChatInterface is imported in root layout |
| API errors | Check `/api/chatbot` route and CORS settings |
| Responses not helpful | Add/update keyword patterns in generateResponse() |
| Mobile not responsive | Verify Tailwind breakpoints on chat window |

## Security Considerations

1. **Input Validation** - Sanitize user messages
2. **Rate Limiting** - Consider adding rate limit to /api/chatbot
3. **Content Filtering** - Screen for inappropriate content
4. **Privacy** - Don't store sensitive information in chat history

## Integration Points

The chatbot is integrated into:
- ✅ Root layout (global availability)
- ✅ All pages via ChatInterface component
- ✅ API accessible at /api/chatbot

To modify availability per page:
- Wrap ChatInterface with conditional logic
- Pass props to control visibility

---

**Estimated Improvement Path:**
- ⏱️ Current State: Rule-based responses
- ⏱️ Phase 2 (1-2 weeks): AI integration + analytics
- ⏱️ Phase 3 (2-4 weeks): Human handoff + training
- ⏱️ Phase 4: Automated support workflows

**Last Updated:** April 2, 2026

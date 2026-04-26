import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIResponse {
  response: string;
  confidence: number;
  needsHuman: boolean;
  suggestions?: string[];
  sentiment?: 'happy' | 'neutral' | 'angry';
}

// RAG System - Retrieve relevant business data
async function retrieveRelevantData(query: string): Promise<string> {
  // In a real implementation, this would search through:
  // - Company knowledge base
  // - Product documentation
  // - FAQ database
  // - Previous conversations
  // - Pricing information

  // For now, return some sample business context
  const context = `
    SMA Systems provides inventory management software solutions.
    Our pricing starts at $99/month for basic plans.
    We offer enterprise solutions with custom integrations.
    Contact us at info@smasystems.com or (555) 123-4567.
    We provide demos and trials for qualified leads.
    Our support team is available 9-5 EST.
  `;

  return context;
}

// Analyze sentiment
function analyzeSentiment(message: string): 'happy' | 'neutral' | 'angry' {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('great') || lowerMessage.includes('excellent') || lowerMessage.includes('thank you')) {
    return 'happy';
  }

  if (lowerMessage.includes('frustrated') || lowerMessage.includes('angry') || lowerMessage.includes('terrible') || lowerMessage.includes('worst')) {
    return 'angry';
  }

  return 'neutral';
}

// Generate AI suggestions for human agents
function generateSuggestions(message: string, context: string): string[] {
  const suggestions = [
    "I'd be happy to help you with that!",
    "Let me check our availability for you.",
    "Could you please provide more details?",
    "That's a great question! Here's what I can tell you:",
    "I'd love to schedule a demo for you."
  ];

  // In a real implementation, use AI to generate context-aware suggestions
  return suggestions.slice(0, 3);
}

// Main AI processing function
export async function processAIResponse(
  chatId: string,
  userMessage: string,
  chatHistory: Array<{ sender: string; content: string }> = []
): Promise<AIResponse> {
  try {
    // Retrieve relevant business data
    const context = await retrieveRelevantData(userMessage);

    // Analyze sentiment
    const sentiment = analyzeSentiment(userMessage);

    // Build conversation context
    const conversationContext = chatHistory
      .slice(-5) // Last 5 messages
      .map(msg => `${msg.sender}: ${msg.content}`)
      .join('\n');

    // Create AI prompt
    const prompt = `
You are a helpful customer support AI for SMA Systems, an inventory management software company.

Business Context:
${context}

Recent Conversation:
${conversationContext}

User Message: ${userMessage}

Instructions:
- Be helpful, professional, and concise
- If you don't know something, offer to connect them with a human
- For pricing inquiries, provide general ranges and offer detailed quotes
- For technical issues, suggest contacting support
- Keep responses under 150 words
- If the user seems frustrated or needs complex help, flag for human assistance

Response:
`;

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content?.trim() || "I'm sorry, I couldn't process your request. Let me connect you with our support team.";

    // Calculate confidence (simplified)
    const confidence = Math.random() * 0.4 + 0.6; // 0.6-1.0 range

    // Determine if needs human
    const needsHuman =
      sentiment === 'angry' ||
      userMessage.toLowerCase().includes('speak to human') ||
      userMessage.toLowerCase().includes('talk to person') ||
      userMessage.toLowerCase().includes('representative') ||
      confidence < 0.7 ||
      response.includes('connect you with our support');

    // Generate suggestions for human agents
    const suggestions = generateSuggestions(userMessage, context);

    return {
      response,
      confidence,
      needsHuman,
      suggestions,
      sentiment,
    };

  } catch (error) {
    console.error('AI processing error:', error);

    return {
      response: "I'm experiencing technical difficulties. Let me connect you with our support team.",
      confidence: 0.1,
      needsHuman: true,
      sentiment: 'neutral',
    };
  }
}

// Smart escalation logic
export function shouldEscalateToHuman(
  message: string,
  sentiment: 'happy' | 'neutral' | 'angry',
  confidence: number,
  messageCount: number
): boolean {
  // Auto-escalate conditions
  if (sentiment === 'angry') return true;
  if (confidence < 0.6) return true;
  if (messageCount > 10) return true; // Long conversation
  if (message.toLowerCase().includes('human') || message.toLowerCase().includes('speak to person')) return true;

  return false;
}
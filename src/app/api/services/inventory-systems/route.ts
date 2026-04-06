import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';
import { 
  SMA_SYSTEMS_KNOWLEDGE, 
  CHATBOT_SYSTEM_PROMPT 
} from '@/app/(marketing)/services/inventory-systems/chatbot-context';
import { CASE_STUDIES, TECH_STACK, TESTIMONIALS, LEADERSHIP, LOCATIONS_AND_REMOTE_POLICY } from '@/app/(marketing)/services/inventory-systems/chatbot-data';

// Initialize the Groq client with your API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, context } = body;
    
    // Extract currentPath from the context provided by the Zustand store
    const currentPath = context?.currentPath || '/';

    // 1. Find if the user is viewing a specific service page
    const activeService = SMA_SYSTEMS_KNOWLEDGE.services.find(
      (service) => service.url === currentPath
    );

    // 2. Augment the system prompt with dynamic "Location Awareness"
    let dynamicContext = `\n\n[CAPABILITIES]
You have tools available to look up real-world case studies, our technical stack, client testimonials, company leadership, and office locations/remote work policies. 
Use 'get_case_studies' when users ask for examples of our work.
Use 'get_tech_stack' when users ask about our expertise or technologies.
Use 'get_client_testimonials' when users ask for social proof or what others say about SMA Systems.
Use 'get_company_leadership' when users ask about who runs the company or the team members.
Use 'get_company_locations_and_remote_policy' when users ask about our office locations, remote work, or global presence.

[USER CONTEXT]
The user is currently browsing the page: ${currentPath}.`;

    if (activeService) {
      dynamicContext += `
They are specifically looking at our "${activeService.name}" solution. 
Value Proposition to emphasize: ${activeService.focus}
If the user asks 'how do you work?' or 'what can you do?', tailor your answer to highlight how we handle ${activeService.name} specifically.`;
    } else if (currentPath === '/contact') {
      dynamicContext += `\nThe user is on the contact page. They are likely ready to start a project. Be encouraging and offer to answer any technical questions that might help them decide to reach out.`;
    }

    // 3. Create the full system message
    const systemMessage = {
      role: 'system',
      content: CHATBOT_SYSTEM_PROMPT + dynamicContext,
    };

    // 4. Define Tools
    const tools: Groq.Chat.ChatCompletionTool[] = [
      {
        type: "function",
        function: {
          name: "get_case_studies",
          description: "Retrieve real-world examples and case studies of SMA Systems projects.",
          parameters: { type: "object", properties: {} }
        }
      },
      {
        type: "function",
        function: {
          name: "get_tech_stack",
          description: "Get detailed information about SMA Systems' technology stack and technical expertise.",
          parameters: { type: "object", properties: {} }
        }
      },
      {
        type: "function",
        function: {
          name: "get_client_testimonials",
          description: "Retrieve client testimonials and reviews regarding SMA Systems' services.",
          parameters: { type: "object", properties: {} }
        }
      },
      {
        type: "function",
        function: {
          name: "get_company_leadership",
          description: "Retrieve information about SMA Systems' leadership team and key members.",
          parameters: { type: "object", properties: {} }
        }
      },
      {
        type: "function",
        function: {
          name: "get_company_locations_and_remote_policy",
          description: "Retrieve information about SMA Systems' office locations and remote work policy.",
          parameters: { type: "object", properties: {} }
        }
      }
    ];

    // 5. Initial Call to Groq
    let response = await groq.chat.completions.create({
      messages: [systemMessage, ...messages] as any,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 1024,
      tools,
      tool_choice: "auto",
    });

    const responseMessage = response.choices[0].message;

    // 6. Handle Tool Calls
    if (responseMessage.tool_calls) {
      const toolMessages = responseMessage.tool_calls.map((toolCall) => {
        const functionName = toolCall.function.name;
        let toolData;

        switch (functionName) {
          case 'get_case_studies':
            toolData = CASE_STUDIES;
            break;
          case 'get_tech_stack':
            toolData = TECH_STACK;
            break;
          case 'get_client_testimonials':
            toolData = TESTIMONIALS;
            break;
          case 'get_company_leadership':
            toolData = LEADERSHIP;
            break;
          case 'get_company_locations_and_remote_policy':
            toolData = LOCATIONS_AND_REMOTE_POLICY;
            break;
          default:
            toolData = { error: `Tool ${functionName} not found` };
        }
        
        return {
          tool_call_id: toolCall.id,
          role: "tool",
          name: functionName,
          content: JSON.stringify(toolData),
        };
      });

      // Final call to generate the natural language response using tool data
      response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [systemMessage, ...messages, responseMessage, ...toolMessages] as any,
      });
    }

    const responseContent = response.choices[0]?.message?.content || "I'm here to help. Could you tell me more about your project?";

    return NextResponse.json({ content: responseContent });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

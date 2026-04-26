import { WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import { parse } from 'url';
import { createMessage, getChatById, updateChatState, logChatEvent, getMessagesByChatId } from '@/lib/database';
import { processAIResponse } from '@/lib/ai-service';

function broadcastToChat(chatId: string, data: any) {
  const connections = chatConnections.get(chatId);
  if (connections) {
    connections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      }
    });
  }
}

export function setupWebSocketServer(server: any) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
    const { query } = parse(request.url || '', true);
    const clientId = query.clientId as string;
    const chatId = query.chatId as string;
    const userType = query.userType as 'user' | 'admin'; // 'user' or 'admin'

    if (clientId) {
      clients.set(clientId, ws);
    }

    if (chatId) {
      if (!chatConnections.has(chatId)) {
        chatConnections.set(chatId, new Set());
      }
      chatConnections.get(chatId)?.add(ws);
    }

    ws.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());

        switch (message.type) {
          case 'join_chat':
            // User joining chat
            broadcastToChat(chatId, {
              type: 'user_joined',
              userId: clientId,
              timestamp: new Date().toISOString()
            });
            break;

          case 'send_message':
            const { content, sender } = message;
            const chat = await getChatById(chatId);

            if (!chat) {
              ws.send(JSON.stringify({ type: 'error', message: 'Chat not found' }));
              return;
            }

            // Create message in database
            const dbMessage = await createMessage({
              chatId,
              sender,
              content,
              status: 'delivered'
            });

            // For admin messages, use the hybrid API
            if (sender === 'admin') {
              // This would be handled by the admin API, but for WebSocket we handle it here
            }

            // Broadcast message to all chat participants
            broadcastToChat(chatId, {
              type: 'new_message',
              message: {
                id: dbMessage.id,
                sender: dbMessage.sender,
                content: dbMessage.content,
                timestamp: dbMessage.timestamp,
              }
            });

            // Handle AI response if AI is active
            if (chat.state === 'AI_ACTIVE' && sender === 'user') {
              // Get recent chat history for context
              const recentMessages = await getMessagesByChatId(chatId, { limit: 10 });
              const chatHistory = recentMessages.map(msg => ({
                sender: msg.sender,
                content: msg.content
              }));

              // Show typing indicator
              broadcastToChat(chatId, {
                type: 'typing_start',
                user: 'ai'
              });

              try {
                const aiResult = await processAIResponse(chatId, content, chatHistory);

                // Create AI message
                const aiMessage = await createMessage({
                  chatId,
                  sender: 'ai',
                  content: aiResult.response,
                  aiConfidence: aiResult.confidence,
                  aiSuggestions: aiResult.suggestions,
                  status: 'delivered'
                });

                // Stop typing
                broadcastToChat(chatId, {
                  type: 'typing_stop',
                  user: 'ai'
                });

                // Send AI message
                broadcastToChat(chatId, {
                  type: 'new_message',
                  message: {
                    id: aiMessage.id,
                    sender: 'ai',
                    content: aiMessage.content,
                    timestamp: aiMessage.timestamp,
                    aiConfidence: aiMessage.aiConfidence,
                    aiSuggestions: aiMessage.aiSuggestions,
                  }
                });

                // Check if needs human
                if (aiResult.needsHuman) {
                  await updateChatState(chatId, 'WAITING');
                  await logChatEvent({
                    chatId,
                    eventType: 'state_changed',
                    data: { from: 'AI_ACTIVE', to: 'WAITING', reason: 'ai_flagged' }
                  });

                  broadcastToChat(chatId, {
                    type: 'system_message',
                    content: 'AI has flagged this conversation for human assistance.'
                  });
                }
              } catch (error) {
                console.error('AI processing error:', error);
                broadcastToChat(chatId, {
                  type: 'typing_stop',
                  user: 'ai'
                });
              }
            }
            break;

          case 'typing_start':
            broadcastToChat(chatId, {
              type: 'typing_start',
              user: message.user
            });
            break;

          case 'typing_stop':
            broadcastToChat(chatId, {
              type: 'typing_stop',
              user: message.user
            });
            break;

          case 'takeover':
            if (userType === 'admin') {
              await updateChatState(chatId, 'HUMAN_ACTIVE', clientId);
              await logChatEvent({
                chatId,
                eventType: 'human_takeover',
                triggeredBy: clientId
              });

              broadcastToChat(chatId, {
                type: 'system_message',
                content: 'You are now chatting with a human agent.'
              });

              broadcastToChat(chatId, {
                type: 'state_changed',
                state: 'HUMAN_ACTIVE'
              });
            }
            break;

          case 'return_to_ai':
            if (userType === 'admin') {
              await updateChatState(chatId, 'AI_ACTIVE');
              await logChatEvent({
                chatId,
                eventType: 'ai_takeover'
              });

              broadcastToChat(chatId, {
                type: 'system_message',
                content: 'AI assistant has resumed the conversation.'
              });

              broadcastToChat(chatId, {
                type: 'state_changed',
                state: 'AI_ACTIVE'
              });
            }
            break;
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
      }
    });

    ws.on('close', () => {
      clients.delete(clientId);
      if (chatId) {
        const connections = chatConnections.get(chatId);
        if (connections) {
          connections.delete(ws);
          if (connections.size === 0) {
            chatConnections.delete(chatId);
          }
        }
      }
    });

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connected',
      clientId,
      chatId
    }));
  });

  return wss;
}
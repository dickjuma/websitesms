"use client";

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'admin' | 'system';
  content: string;
  timestamp: string;
  aiConfidence?: number;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startChat = async () => {
    try {
      const response = await fetch('/api/chat/hybrid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: `user_${Date.now()}`,
          userName: 'Website Visitor',
          initialMessage: 'Hi, I need help with your services.',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setChatId(data.chat.id);
        setIsOpen(true);
        // In a real implementation, establish WebSocket connection here
        // For now, simulate initial AI response
        setTimeout(() => {
          const welcomeMessage: Message = {
            id: `msg_${Date.now()}`,
            sender: 'ai',
            content: 'Hello! Welcome to SMA Systems. How can I help you today?',
            timestamp: new Date().toISOString(),
            aiConfidence: 0.9,
          };
          setMessages([welcomeMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to start chat:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatId) return;

    const messageText = newMessage.trim();
    setNewMessage('');

    // Add user message to UI immediately
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Send to API
    try {
      await fetch('/api/chat/hybrid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          message: messageText,
          sender: 'user'
        }),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }

    // Simulate AI response (in real implementation, this comes via WebSocket)
    setIsTyping(true);
    setTimeout(async () => {
      try {
        // Simulate AI processing
        const response = await fetch('/api/chat/hybrid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatId,
            message: messageText,
            sender: 'ai' // Simulate AI response
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // In real implementation, AI response comes via WebSocket
            // For demo, generate a simple response
            const aiMessage: Message = {
              id: `msg_${Date.now() + 1}`,
              sender: 'ai',
              content: 'Thank you for your question. Our team specializes in inventory management solutions. Could you tell me more about your specific needs?',
              timestamp: new Date().toISOString(),
              aiConfidence: 0.85,
            };
            setMessages(prev => [...prev, aiMessage]);
          }
        }
      } catch (error) {
        console.error('AI response error:', error);
      }
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={startChat}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-colors"
        >
          💬
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 h-96 bg-white rounded-lg shadow-xl border flex flex-col">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Chat Support</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : message.sender === 'ai'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-green-200 text-gray-800'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="text-xs text-gray-600 mb-1">🤖 AI Assistant</div>
              )}
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
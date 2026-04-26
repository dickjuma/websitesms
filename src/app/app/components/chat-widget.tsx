'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Mail, ChevronLeft, SendHorizontal } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'chat' | 'contact'>('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to SMA Systems. How can we help you transform your business today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOffline] = useState(true); // Simulated offline status for demonstration

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: "Thank you for reaching out! One of our specialists will be with you shortly to discuss your requirements.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
      setView('chat');
    }, 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">SMA {view === 'chat' ? 'Support' : 'Contact Form'}</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  {isOffline && view === 'chat' ? (
                    <>
                      <span className="w-2 h-2 bg-amber-400 rounded-full" />
                      Offline | Leave a message
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online | Active now
                    </>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {view === 'chat' ? (
            <>
              {/* Messages Area */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isOffline && (
                  <button
                    onClick={() => setView('contact')}
                    className="w-full mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail size={14} />
                    Support is currently offline. Send an email instead?
                  </button>
                )}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={!message.trim()}
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          ) : (
            /* Contact Form View */
            <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto">
              <button
                onClick={() => setView('chat')}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
              >
                <ChevronLeft size={16} /> Back to chat
              </button>

              {isSubmitted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-green-100 text-green-600 p-4 rounded-full">
                    <SendHorizontal size={32} />
                  </div>
                  <h4 className="font-semibold text-gray-900">Message Sent!</h4>
                  <p className="text-sm text-gray-500">We've received your inquiry and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="John Doe"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="john@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                      placeholder="How can we help?"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}

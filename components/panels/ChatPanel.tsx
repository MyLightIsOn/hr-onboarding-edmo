'use client';

import { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ExamplePrompts } from './ExamplePrompts';
import { getMockPolicyAnswer } from '@/lib/services/mockClaudeService';
import type { ChatMessage as ChatMessageType } from '@/lib/types';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  roleId: string;
}

export function ChatPanel({ isOpen, onClose, roleId }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI onboarding assistant. I can help you with questions about Airbnb policies, benefits, and your onboarding process. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate loading
    setIsLoading(true);

    // Get mock response (simulates Claude API call)
    setTimeout(() => {
      const response = getMockPolicyAnswer(content, roleId);

      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        citations: response.citations,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000); // Simulate API delay
  };

  const handleExampleClick = (question: string) => {
    handleSendMessage(question);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Policy Navigator</h2>
              <p className="text-sm text-gray-500">Ask me anything about HR policies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm">Thinking...</span>
            </div>
          )}
        </div>

        {/* Example Prompts (show only if no messages from user) */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <ExamplePrompts onExampleClick={handleExampleClick} roleId={roleId} />
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t">
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </>
  );
}

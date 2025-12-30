'use client';

import { useState } from 'react';
import { X, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ExamplePrompts } from './ExamplePrompts';
import { getMockPolicyAnswer } from '@/lib/services/mockClaudeService';
import { getRealClaudeAnswer } from '@/lib/services/realClaudeService';
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
      content: "Hi! I'm your AI onboarding assistant, here to help you navigate Airbnb's policies, benefits, and your personalized onboarding journey. Ask me anything—I'm here to make your first weeks smooth and successful!",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [useRealClaude, setUseRealClaude] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Set loading
    setIsLoading(true);

    try {
      let response;

      if (useRealClaude) {
        // Call real Claude API
        response = await getRealClaudeAnswer(content, roleId);
      } else {
        // Simulate loading for mock
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = getMockPolicyAnswer(content, roleId);
      }

      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        citations: response.citations,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);

      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Policy Navigator</h2>
              <p className="text-sm text-gray-500">Ask me anything about HR policies</p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Toggle Switch */}
        <div className="px-6 py-3 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className={`h-4 w-4 transition-colors ${useRealClaude ? 'text-purple-600' : 'text-gray-400'}`} />
              <div>
                <label htmlFor="real-claude-toggle" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Use Real Claude API
                </label>
                <p className="text-xs text-gray-500">
                  {useRealClaude ? 'Connected • Powered by real AI' : 'Using mock responses for demo'}
                </p>
              </div>
            </div>
            <Switch
              id="real-claude-toggle"
              checked={useRealClaude}
              onCheckedChange={setUseRealClaude}
            />
          </div>
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

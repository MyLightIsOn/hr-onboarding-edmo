import { Badge } from '@/components/ui/badge';
import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAssistant ? 'bg-blue-100' : 'bg-gray-200'
      }`}>
        {isAssistant ? (
          <Bot className="h-5 w-5 text-blue-600" />
        ) : (
          <User className="h-5 w-5 text-gray-600" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isAssistant ? '' : 'flex justify-end'}`}>
        <div className={`max-w-[85%] ${
          isAssistant 
            ? 'bg-gray-100 text-gray-900' 
            : 'bg-blue-600 text-white'
        } rounded-2xl px-4 py-3`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>

          {/* Citations */}
          {message.citations && message.citations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Sources:</p>
              <div className="flex flex-wrap gap-1">
                {message.citations.map((citation, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-xs bg-white hover:bg-gray-50"
                  >
                    {citation}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className="text-xs text-gray-400 mt-1 px-1">
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
}

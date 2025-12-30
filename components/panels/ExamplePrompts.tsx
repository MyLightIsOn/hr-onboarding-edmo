import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface ExamplePromptsProps {
  onExampleClick: (question: string) => void;
  roleId: string;
}

export function ExamplePrompts({ onExampleClick, roleId }: ExamplePromptsProps) {
  // Role-specific example questions
  const examples: Record<string, string[]> = {
    'software-engineer': [
      "What's the remote work policy for engineers?",
      "How do I expense a conference?",
      "What security training do I need to complete?",
      "Can I work from anywhere in the US?",
    ],
    'product-manager': [
      "What's the remote work policy for PMs?",
      "How do I request PTO?",
      "What are the required training courses?",
      "What benefits does Airbnb offer?",
    ],
    'hr-coordinator': [
      "What's the remote work policy?",
      "How do I handle employee PTO requests?",
      "What GDPR training do I need?",
      "What are Airbnb's benefits?",
    ],
  };

  const roleExamples = examples[roleId] || examples['software-engineer'];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-blue-600" />
        <p className="text-sm font-medium text-gray-700">Try asking:</p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {roleExamples.map((example, idx) => (
          <Button
            key={idx}
            variant="outline"
            className="justify-start text-left h-auto py-2 px-3 text-sm hover:bg-blue-50 hover:border-blue-200 transition-colors"
            onClick={() => onExampleClick(example)}
          >
            {example}
          </Button>
        ))}
      </div>
    </div>
  );
}

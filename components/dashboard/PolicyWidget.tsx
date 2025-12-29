import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPoliciesByRole } from '@/lib/data-access/policyService';
import { FileText, ChevronRight } from 'lucide-react';

interface PolicyWidgetProps {
  roleId: string;
}

export function PolicyWidget({ roleId }: PolicyWidgetProps) {
  const policies = getPoliciesByRole(roleId);

  // Show top 4 most relevant policies
  const displayPolicies = policies.slice(0, 4);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'remote-work':
        return 'bg-blue-100 text-blue-800';
      case 'expense':
        return 'bg-green-100 text-green-800';
      case 'pto':
        return 'bg-purple-100 text-purple-800';
      case 'security':
        return 'bg-red-100 text-red-800';
      case 'benefits':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Policy Quick Access</CardTitle>
        <CardDescription>Important policies for your role</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayPolicies.map((policy) => (
            <button
              key={policy.id}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
            >
              <div className="flex-shrink-0">
                <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <FileText className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {policy.name}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {policy.summary}
                </p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2">
                <Badge variant="secondary" className={`text-xs ${getCategoryColor(policy.category)}`}>
                  {policy.category}
                </Badge>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </button>
          ))}
        </div>

        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
          View all policies
          <ChevronRight className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getHighPriorityPeople } from '@/lib/data-access/peopleService';
import { User, ChevronRight } from 'lucide-react';

interface PeopleWidgetProps {
  roleId: string;
}

export function PeopleWidget({ roleId }: PeopleWidgetProps) {
  const highPriorityPeople = getHighPriorityPeople(roleId, 4);

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'manager':
        return 'bg-purple-100 text-purple-800';
      case 'buddy':
        return 'bg-green-100 text-green-800';
      case 'peer':
        return 'bg-blue-100 text-blue-800';
      case 'cross-functional':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>People to Meet</CardTitle>
        <CardDescription>Key connections for your first weeks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {highPriorityPeople.map((rec) => (
            <div
              key={rec.person.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
                  {rec.person.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {rec.person.name}
                  </p>
                  <Badge variant="secondary" className={`text-xs ${getRelationshipColor(rec.relationship)}`}>
                    {rec.relationship}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-1">{rec.person.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{rec.reason}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-2" />
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
          View all recommendations
          <ChevronRight className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}

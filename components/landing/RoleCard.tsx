'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Role } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface RoleCardProps {
  role: Role;
}

export function RoleCard({ role }: RoleCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard?role=${role.id}`);
  };

  // Map category to color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'engineering':
        return 'bg-blue-100 text-blue-800';
      case 'product':
        return 'bg-purple-100 text-purple-800';
      case 'operations':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 group"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge className={getCategoryColor(role.category)}>
            {role.category}
          </Badge>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
        <CardTitle className="text-xl">{role.title}</CardTitle>
        <CardDescription className="text-sm">{role.department}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{role.description}</p>
        <div className="space-y-2">
          <div className="text-xs text-gray-500">
            <span className="font-medium">Common Teams:</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {role.commonTeams.slice(0, 3).map((team) => (
                <span key={team} className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {team}
                </span>
              ))}
              {role.commonTeams.length > 3 && (
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                  +{role.commonTeams.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

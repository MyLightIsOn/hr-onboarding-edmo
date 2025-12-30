import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Role } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface RoleCardProps {
  role: Role;
  delay?: number;
}

export function RoleCard({ role, delay = 0 }: RoleCardProps) {
  const router = useRouter();

  const getCategoryColor = () => {
    switch (role.category) {
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

  const handleClick = () => {
    router.push(`/dashboard?role=${role.id}`);
  };

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-blue-300 group animate-in slide-in-from-bottom duration-700"
      style={{ animationDelay: `${delay}ms` }}
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge className={getCategoryColor()}>
            {role.category}
          </Badge>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-all duration-300 group-hover:translate-x-1" />
        </div>
        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">
          {role.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {role.department}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {role.description}
        </p>

        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">Common Teams:</div>
          <div className="flex flex-wrap gap-1">
            {role.commonTeams.slice(0, 3).map((team) => (
              <Badge key={team} variant="secondary" className="text-xs">
                {team}
              </Badge>
            ))}
            {role.commonTeams.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{role.commonTeams.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

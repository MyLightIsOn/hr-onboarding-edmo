import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Employee, Role } from '@/lib/types';
import { Calendar, MapPin, Users } from 'lucide-react';

interface WelcomeHeaderProps {
  employee: Employee;
  role: Role;
}

export function WelcomeHeader({ employee, role }: WelcomeHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {employee.name}!
          </h1>
          <p className="text-xl text-gray-600 mb-4">{role.title}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{employee.team}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{employee.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Started {formatDate(employee.startDate)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline" className="text-sm">
            {employee.workType}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {employee.level}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { calculateProgress } from '@/lib/data-access/taskService';
import { calculateLearningProgress } from '@/lib/data-access/learningService';
import { getRecommendedPeople } from '@/lib/data-access/peopleService';
import { CheckCircle2, GraduationCap, Users, TrendingUp } from 'lucide-react';

interface QuickStatsProps {
  roleId: string;
  completedTaskIds: string[];
  completedCourseIds: string[];
}

export function QuickStats({ roleId, completedTaskIds, completedCourseIds }: QuickStatsProps) {
  const taskProgress = calculateProgress(roleId, completedTaskIds);
  const learningProgress = calculateLearningProgress(roleId, completedCourseIds);
  const recommendedPeople = getRecommendedPeople(roleId);

  const stats = [
    {
      label: 'Tasks Completed',
      value: `${taskProgress.completed}/${taskProgress.total}`,
      subtext: `${taskProgress.percentage}% complete`,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Required Training',
      value: `${learningProgress.requiredCompleted}/${learningProgress.requiredTotal}`,
      subtext: 'courses completed',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'People to Meet',
      value: recommendedPeople.length,
      subtext: 'introductions suggested',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Progress',
      value: `${taskProgress.percentage}%`,
      subtext: 'overall onboarding',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.subtext}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

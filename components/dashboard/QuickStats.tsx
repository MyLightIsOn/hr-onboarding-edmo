import { Card, CardContent } from '@/components/ui/card';
import { 
  getTasksByRole, 
  calculateProgress, 
  areRequiredTasksComplete 
} from '@/lib/data-access/taskService';
import { 
  getRequiredCourses,
  calculateLearningProgress 
} from '@/lib/data-access/learningService';
import { getRecommendedPeople } from '@/lib/data-access/peopleService';
import { CheckCircle2, GraduationCap, Users, TrendingUp } from 'lucide-react';

interface QuickStatsProps {
  roleId: string;
  completedTaskIds: string[];
  completedCourseIds: string[];
}

export function QuickStats({ roleId, completedTaskIds, completedCourseIds }: QuickStatsProps) {
  const allTasks = getTasksByRole(roleId);
  const taskProgress = calculateProgress(allTasks, completedTaskIds);
  
  const requiredCourses = getRequiredCourses(roleId);
  const learningProgress = calculateLearningProgress(roleId, completedCourseIds);
  
  const recommendedPeople = getRecommendedPeople(roleId);
  
  // Calculate overall progress (weighted average)
  const overallProgress = Math.round(
    (taskProgress.percentage * 0.4) + 
    (learningProgress.percentage * 0.4) + 
    ((recommendedPeople.length > 0 ? 20 : 0) * 0.2)
  );

  const stats = [
    {
      label: 'Tasks Completed',
      value: `${taskProgress.completed}/${taskProgress.total}`,
      subtext: `${taskProgress.percentage}% complete`,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      delay: 100,
    },
    {
      label: 'Required Training',
      value: `${learningProgress.requiredCompleted}/${learningProgress.requiredTotal}`,
      subtext: 'courses',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      delay: 200,
    },
    {
      label: 'People to Meet',
      value: recommendedPeople.length,
      subtext: 'recommended connections',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      delay: 300,
    },
    {
      label: 'Progress',
      value: `${overallProgress}%`,
      subtext: 'overall completion',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      delay: 400,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.label}
            className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in slide-in-from-bottom duration-500"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`${stat.bgColor} p-3 rounded-lg transition-transform duration-300 hover:scale-110`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtext}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

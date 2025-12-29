import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getRequiredCourses, calculateLearningProgress } from '@/lib/data-access/learningService';
import { GraduationCap, Clock, ChevronRight } from 'lucide-react';

interface LearningWidgetProps {
  roleId: string;
  completedCourseIds: string[];
}

export function LearningWidget({ roleId, completedCourseIds }: LearningWidgetProps) {
  const requiredCourses = getRequiredCourses(roleId);
  const progress = calculateLearningProgress(roleId, completedCourseIds);

  // Show first 3 courses
  const displayCourses = requiredCourses.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Learning Path</CardTitle>
            <CardDescription>Required training for your role</CardDescription>
          </div>
          <Badge variant="secondary">
            {progress.requiredCompleted}/{progress.requiredTotal}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm text-gray-500">{progress.percentage}%</span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
        </div>

        {/* Course List */}
        <div className="space-y-3">
          {displayCourses.map((item) => {
            const isCompleted = completedCourseIds.includes(item.course.id);

            return (
              <div
                key={item.course.id}
                className={`p-3 rounded-lg border transition-colors ${
                  isCompleted
                    ? 'bg-green-50 border-green-200'
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`p-2 rounded-lg ${
                      isCompleted ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <GraduationCap className={`h-4 w-4 ${
                        isCompleted ? 'text-green-600' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium mb-1 ${
                      isCompleted ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      {item.course.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.course.duration} min</span>
                      </div>
                      {item.deadline && (
                        <Badge variant="outline" className="text-xs">
                          Due: {item.deadline}
                        </Badge>
                      )}
                    </div>
                    {item.reason && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {item.reason}
                      </p>
                    )}
                  </div>
                  {isCompleted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      ✓ Complete
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
          View full learning path
          <ChevronRight className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}

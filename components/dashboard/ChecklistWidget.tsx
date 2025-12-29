import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTasksByTimeline, getNextTask } from '@/lib/data-access/taskService';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface ChecklistWidgetProps {
  roleId: string;
  completedTaskIds: string[];
}

export function ChecklistWidget({ roleId, completedTaskIds }: ChecklistWidgetProps) {
  // Get tasks for current phase (week-1 for demo)
  const currentTasks = getTasksByTimeline(roleId, 'week-1');
  const nextTask = getNextTask(roleId, completedTaskIds, 'week-1');

  // Show first 5 tasks
  const displayTasks = currentTasks.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Checklist</CardTitle>
            <CardDescription>Week 1 priorities</CardDescription>
          </div>
          <Badge variant="secondary">
            {completedTaskIds.length}/{currentTasks.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayTasks.map((task) => {
            const isCompleted = completedTaskIds.includes(task.id);
            const isNext = nextTask?.id === task.id;

            return (
              <div
                key={task.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  isNext ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {task.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{task.estimatedTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {nextTask && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs font-medium text-gray-600 mb-2">UP NEXT</p>
            <p className="text-sm text-gray-900 font-medium">{nextTask.title}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

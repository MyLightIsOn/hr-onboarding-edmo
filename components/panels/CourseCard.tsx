import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LearningItemWithCourse } from '@/lib/types';
import { Clock, PlayCircle, CheckCircle2, Calendar, ExternalLink } from 'lucide-react';

interface CourseCardProps {
  learningItem: LearningItemWithCourse;
  isCompleted: boolean;
  isRequired: boolean;
}

export function CourseCard({ learningItem, isCompleted, isRequired }: CourseCardProps) {
  const { course, deadline, reason } = learningItem;

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'Internal':
        return 'bg-purple-100 text-purple-800';
      case 'LinkedIn Learning':
        return 'bg-blue-100 text-blue-800';
      case 'Coursera':
        return 'bg-orange-100 text-orange-800';
      case 'SHRM':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video':
        return PlayCircle;
      case 'interactive':
        return ExternalLink;
      default:
        return PlayCircle;
    }
  };

  const FormatIcon = getFormatIcon(course.format);

  return (
    <Card className={`mb-3 ${isCompleted ? 'bg-gray-50 border-gray-200' : 'border-gray-300'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
            isCompleted ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            {isCompleted ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <FormatIcon className="h-6 w-6 text-blue-600" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title & Badges */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className={`font-semibold text-sm ${
                isCompleted ? 'text-gray-600' : 'text-gray-900'
              }`}>
                {course.title}
              </h4>
              <div className="flex-shrink-0 flex flex-col gap-1">
                {isRequired && (
                  <Badge variant="destructive" className="text-xs whitespace-nowrap">
                    Required
                  </Badge>
                )}
                {isCompleted && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 whitespace-nowrap">
                    ✓ Complete
                  </Badge>
                )}
              </div>
            </div>

            {/* Provider */}
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={`text-xs ${getProviderColor(course.provider)}`}>
                {course.provider}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">
                {course.format}
              </Badge>
            </div>

            {/* Description */}
            <p className={`text-xs mb-3 ${
              isCompleted ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {course.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{course.duration} min</span>
              </div>
              {deadline && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Due: {deadline}</span>
                </div>
              )}
            </div>

            {/* Reason */}
            {reason && (
              <div className={`text-xs p-2 rounded mb-3 ${
                isCompleted 
                  ? 'bg-gray-100 text-gray-600' 
                  : 'bg-blue-50 text-blue-800'
              }`}>
                <span className="font-medium">Why this course: </span>
                {reason}
              </div>
            )}

            {/* Tags */}
            {course.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {course.tags.slice(0, 4).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </Badge>
                ))}
                {course.tags.length > 4 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                    +{course.tags.length - 4}
                  </Badge>
                )}
              </div>
            )}

            {/* Action Button */}
            <div className="flex gap-2">
              {!isCompleted && (
                <Button size="sm" className="flex-1">
                  <PlayCircle className="h-3.5 w-3.5 mr-1.5" />
                  Start Course
                </Button>
              )}
              {course.url && (
                <Button variant="outline" size="sm" className={isCompleted ? 'flex-1' : ''}>
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  View Details
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

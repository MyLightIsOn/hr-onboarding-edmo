'use client';

import { useState } from 'react';
import { X, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getRequiredCourses, 
  getRecommendedCourses, 
  calculateLearningProgress,
  getTotalRequiredTime,
  getTotalRecommendedTime
} from '@/lib/data-access/learningService';
import { CourseCard } from './CourseCard';

interface LearningPanelProps {
  isOpen: boolean;
  onClose: () => void;
  roleId: string;
  completedCourseIds: string[];
}

export function LearningPanel({ isOpen, onClose, roleId, completedCourseIds }: LearningPanelProps) {
  const [activeTab, setActiveTab] = useState<'required' | 'recommended'>('required');
  
  const requiredCourses = getRequiredCourses(roleId);
  const recommendedCourses = getRecommendedCourses(roleId);
  const progress = calculateLearningProgress(roleId, completedCourseIds);
  const totalRequiredTime = getTotalRequiredTime(roleId);
  const totalRecommendedTime = getTotalRecommendedTime(roleId);

  // Filter completed/incomplete
  const completedRequired = requiredCourses.filter(item => 
    completedCourseIds.includes(item.course.id)
  );
  const incompleteRequired = requiredCourses.filter(item => 
    !completedCourseIds.includes(item.course.id)
  );

  const completedRecommended = recommendedCourses.filter(item =>
    completedCourseIds.includes(item.course.id)
  );
  const incompleteRecommended = recommendedCourses.filter(item =>
    !completedCourseIds.includes(item.course.id)
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Learning Path</h2>
              <p className="text-sm text-gray-500">Your training roadmap</p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Progress Summary */}
        <div className="p-6 border-b bg-gradient-to-br from-green-50 to-blue-50 flex-shrink-0">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
              <span className="text-2xl font-bold text-green-600">{progress.percentage}%</span>
            </div>
            <Progress value={progress.percentage} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-3 border border-green-100">
              <div className="text-xs text-gray-600 mb-1">Required</div>
              <div className="text-lg font-bold text-gray-900">
                {progress.requiredCompleted}/{progress.requiredTotal}
              </div>
              <div className="text-xs text-gray-500">
                {Math.floor(totalRequiredTime / 60)}h {totalRequiredTime % 60}m total
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <div className="text-xs text-gray-600 mb-1">Recommended</div>
              <div className="text-lg font-bold text-gray-900">
                {completedRecommended.length}/{recommendedCourses.length}
              </div>
              <div className="text-xs text-gray-500">
                {Math.floor(totalRecommendedTime / 60)}h {totalRecommendedTime % 60}m total
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - This needs to flex and overflow */}
        <div className="flex-1 min-h-0 flex flex-col">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'required' | 'recommended')} className="flex-1 min-h-0 flex flex-col">
            <TabsList className="mx-6 mt-4 flex-shrink-0">
              <TabsTrigger value="required" className="flex-1">
                Required ({requiredCourses.length})
              </TabsTrigger>
              <TabsTrigger value="recommended" className="flex-1">
                Recommended ({recommendedCourses.length})
              </TabsTrigger>
            </TabsList>

            {/* Scrollable content area */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="px-6 pb-6">
                <TabsContent value="required" className="mt-4 space-y-3">
                  {incompleteRequired.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">To Complete</h3>
                      {incompleteRequired.map((item) => (
                        <CourseCard
                          key={item.course.id}
                          learningItem={item}
                          isCompleted={false}
                          isRequired={true}
                        />
                      ))}
                    </div>
                  )}

                  {completedRequired.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Completed</h3>
                      {completedRequired.map((item) => (
                        <CourseCard
                          key={item.course.id}
                          learningItem={item}
                          isCompleted={true}
                          isRequired={true}
                        />
                      ))}
                    </div>
                  )}

                  {requiredCourses.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No required courses</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="recommended" className="mt-4 space-y-3">
                  {incompleteRecommended.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Suggested for You</h3>
                      {incompleteRecommended.map((item) => (
                        <CourseCard
                          key={item.course.id}
                          learningItem={item}
                          isCompleted={false}
                          isRequired={false}
                        />
                      ))}
                    </div>
                  )}

                  {completedRecommended.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Completed</h3>
                      {completedRecommended.map((item) => (
                        <CourseCard
                          key={item.course.id}
                          learningItem={item}
                          isCompleted={true}
                          isRequired={false}
                        />
                      ))}
                    </div>
                  )}

                  {recommendedCourses.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No recommended courses</p>
                    </div>
                  )}
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}

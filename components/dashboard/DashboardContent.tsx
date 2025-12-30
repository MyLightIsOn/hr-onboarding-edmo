'use client';

import { useState } from 'react';
import { getEmployeeByRole } from '@/lib/data-access/employeeService';
import { getRoleById } from '@/lib/data-access/roleService';
import { WelcomeHeader } from './WelcomeHeader';
import { QuickStats } from './QuickStats';
import { ChecklistWidget } from './ChecklistWidget';
import { PolicyWidget } from './PolicyWidget';
import { PeopleWidget } from './PeopleWidget';
import { LearningWidget } from './LearningWidget';
import { ChatPanel } from '@/components/panels/ChatPanel';
import { PeoplePanel } from '@/components/panels/PeoplePanel';
import { LearningPanel } from '@/components/panels/LearningPanel';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface DashboardContentProps {
  roleId: string;
}

export function DashboardContent({ roleId }: DashboardContentProps) {
  const employee = getEmployeeByRole(roleId);
  const role = getRoleById(roleId);

  // Demo state - in production would come from backend
  const [completedTaskIds] = useState<string[]>([]);
  const [completedCourseIds] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPeoplePanelOpen, setIsPeoplePanelOpen] = useState(false);
  const [isLearningPanelOpen, setIsLearningPanelOpen] = useState(false);

  if (!employee || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Role not found</h1>
          <p className="text-gray-600">The selected role could not be found.</p>
          <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back to landing page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Header */}
        <WelcomeHeader employee={employee} role={role} />

        {/* Quick Stats */}
        <QuickStats
          roleId={roleId}
          completedTaskIds={completedTaskIds}
          completedCourseIds={completedCourseIds}
        />

        {/* Dashboard Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Checklist Widget */}
          <ChecklistWidget roleId={roleId} completedTaskIds={completedTaskIds} />

          {/* Policy Quick Access Widget */}
          <PolicyWidget roleId={roleId} />

          {/* People Recommendations Widget */}
          <PeopleWidget 
            roleId={roleId} 
            onOpenPeoplePanel={() => setIsPeoplePanelOpen(true)}
          />

          {/* Learning Path Widget */}
          <LearningWidget 
            roleId={roleId} 
            completedCourseIds={completedCourseIds}
            onOpenLearningPanel={() => setIsLearningPanelOpen(true)}
          />
        </div>
      </div>

      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat Panel */}
      <ChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        roleId={roleId}
      />

      {/* People Panel */}
      <PeoplePanel
        isOpen={isPeoplePanelOpen}
        onClose={() => setIsPeoplePanelOpen(false)}
        roleId={roleId}
      />

      {/* Learning Panel */}
      <LearningPanel
        isOpen={isLearningPanelOpen}
        onClose={() => setIsLearningPanelOpen(false)}
        roleId={roleId}
        completedCourseIds={completedCourseIds}
      />
    </div>
  );
}

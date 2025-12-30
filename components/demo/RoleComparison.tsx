'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllRoles } from '@/lib/data-access/roleService';
import { X, GitCompare, ArrowRight } from 'lucide-react';

interface RoleComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoleId: string;
}

export function RoleComparison({ isOpen, onClose, currentRoleId }: RoleComparisonProps) {
  const router = useRouter();
  const allRoles = getAllRoles();

  const handleRoleSwitch = (roleId: string) => {
    router.push(`/dashboard?role=${roleId}`);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`fixed inset-4 md:inset-x-[10%] md:inset-y-[15%] bg-white rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <GitCompare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Role Comparison</h2>
              <p className="text-sm text-gray-500">
                Switch roles to see personalized content
              </p>
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allRoles.map((role) => {
              const isCurrent = role.id === currentRoleId;

              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isCurrent
                      ? 'border-2 border-blue-500 bg-blue-50'
                      : 'hover:border-blue-300'
                  }`}
                  onClick={() => !isCurrent && handleRoleSwitch(role.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={isCurrent ? 'default' : 'outline'}
                        className={
                          role.category === 'engineering'
                            ? 'bg-blue-100 text-blue-800'
                            : role.category === 'product'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                        }
                      >
                        {role.category}
                      </Badge>
                      {isCurrent && (
                        <Badge variant="default" className="bg-blue-600">
                          Current
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {role.description}
                    </p>

                    {/* What's Different */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          Skill Used:
                        </p>
                        <p className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                          {role.skillName}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          Required Training:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {role.requiredTraining.slice(0, 2).map((training) => (
                            <Badge
                              key={training}
                              variant="secondary"
                              className="text-xs"
                            >
                              {training}
                            </Badge>
                          ))}
                          {role.requiredTraining.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{role.requiredTraining.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          Common Teams:
                        </p>
                        <p className="text-xs text-gray-600">
                          {role.commonTeams[0]}
                          {role.commonTeams.length > 1 && ` +${role.commonTeams.length - 1} more`}
                        </p>
                      </div>
                    </div>

                    {!isCurrent && (
                      <Button
                        className="w-full mt-4"
                        size="sm"
                        onClick={() => handleRoleSwitch(role.id)}
                      >
                        Switch to this role
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Comparison Table */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              What Changes Between Roles
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-sm font-semibold text-gray-900">
                      Skills Architecture
                    </span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Different Skill file loaded per role</li>
                    <li>• Role-specific workflows and guidance</li>
                    <li>• Unique onboarding timeline</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    <span className="text-sm font-semibold text-gray-900">
                      Personalized Content
                    </span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Different tasks and checklists</li>
                    <li>• Role-specific learning paths</li>
                    <li>• Tailored people recommendations</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <span className="text-sm font-semibold text-gray-900">
                      Policy Access
                    </span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Relevant policies surfaced first</li>
                    <li>• Role-aware policy Q&A</li>
                    <li>• Context-specific guidance</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full" />
                    <span className="text-sm font-semibold text-gray-900">
                      Team Context
                    </span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Different team structures</li>
                    <li>• Role-appropriate stakeholders</li>
                    <li>• Specialized tools and resources</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

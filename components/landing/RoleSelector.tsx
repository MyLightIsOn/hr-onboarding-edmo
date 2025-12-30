'use client';

import { getAllRoles } from '@/lib/data-access/roleService';
import { RoleCard } from './RoleCard';

export function RoleSelector() {
  const roles = getAllRoles();

  return (
    <div className="space-y-6">
      <div className="text-center animate-in slide-in-from-bottom duration-700 delay-500">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
        <p className="text-gray-600">Select your position to see personalized onboarding content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <RoleCard
            key={role.id}
            role={role}
            delay={600 + (index * 100)} // Stagger: 600ms, 700ms, 800ms
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import { getAllRoles } from '@/lib/data-access/roleService';
import { RoleCard } from './RoleCard';

export function RoleSelector() {
  const roles = getAllRoles();

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Select your role to get started
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}

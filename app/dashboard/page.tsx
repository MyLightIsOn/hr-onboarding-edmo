'use client';

import { useSearchParams } from 'next/navigation';
import { getEmployeeByRole } from '@/lib/data-access/employeeService';
import { getRoleById } from '@/lib/data-access/roleService';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const roleId = searchParams.get('role');

  if (!roleId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No role selected</h1>
          <p className="text-gray-600">Please select a role from the landing page.</p>
          <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back to landing page
          </a>
        </div>
      </div>
    );
  }

  const employee = getEmployeeByRole(roleId);
  const role = getRoleById(roleId);

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {employee.name}!
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {role.title} • {employee.team}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <p className="text-sm text-blue-800">
              🎉 Dashboard is coming soon! Your role-specific onboarding will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

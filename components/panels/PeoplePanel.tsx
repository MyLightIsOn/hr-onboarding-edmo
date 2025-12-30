'use client';

import { useState } from 'react';
import { X, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRecommendedPeople } from '@/lib/data-access/peopleService';
import { PersonCard } from './PersonCard';
import type { Relationship } from '@/lib/types';

interface PeoplePanelProps {
  isOpen: boolean;
  onClose: () => void;
  roleId: string;
}

export function PeoplePanel({ isOpen, onClose, roleId }: PeoplePanelProps) {
  const [filterRelationship, setFilterRelationship] = useState<Relationship | 'all'>('all');
  
  const allPeople = getRecommendedPeople(roleId);

  // Filter by relationship
  const filteredPeople = filterRelationship === 'all'
    ? allPeople
    : allPeople.filter(rec => rec.relationship === filterRelationship);

  // Group by timing for better organization
  const week1People = filteredPeople.filter(p => p.suggestedTiming === 'week-1');
  const week2People = filteredPeople.filter(p => p.suggestedTiming === 'week-2');
  const month1People = filteredPeople.filter(p => p.suggestedTiming === 'month-1');
  const flexiblePeople = filteredPeople.filter(p => p.suggestedTiming === 'flexible');

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
      <div className={`fixed inset-4 md:inset-8 bg-white rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <UsersIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">People Directory</h2>
              <p className="text-sm text-gray-500">
                {filteredPeople.length} recommended connections for your onboarding
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

        {/* Filters */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            <Button
              variant={filterRelationship === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterRelationship('all')}
            >
              All ({allPeople.length})
            </Button>
            <Button
              variant={filterRelationship === 'manager' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterRelationship('manager')}
            >
              Manager
            </Button>
            <Button
              variant={filterRelationship === 'buddy' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterRelationship('buddy')}
            >
              Buddy
            </Button>
            <Button
              variant={filterRelationship === 'peer' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterRelationship('peer')}
            >
              Peers
            </Button>
            <Button
              variant={filterRelationship === 'cross-functional' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterRelationship('cross-functional')}
            >
              Cross-functional
            </Button>
          </div>
        </div>

        {/* Content - Tabbed by timing */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="week-1" className="h-full flex flex-col">
            <TabsList className="mx-6 mt-4">
              <TabsTrigger value="week-1">
                Week 1 ({week1People.length})
              </TabsTrigger>
              <TabsTrigger value="week-2">
                Week 2 ({week2People.length})
              </TabsTrigger>
              <TabsTrigger value="month-1">
                Month 1 ({month1People.length})
              </TabsTrigger>
              <TabsTrigger value="flexible">
                Flexible ({flexiblePeople.length})
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-6">
              <TabsContent value="week-1" className="mt-0">
                <PeopleGrid people={week1People} />
              </TabsContent>

              <TabsContent value="week-2" className="mt-0">
                <PeopleGrid people={week2People} />
              </TabsContent>

              <TabsContent value="month-1" className="mt-0">
                <PeopleGrid people={month1People} />
              </TabsContent>

              <TabsContent value="flexible" className="mt-0">
                <PeopleGrid people={flexiblePeople} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}

// Helper component for people grid
function PeopleGrid({ people }: { people: ReturnType<typeof getRecommendedPeople> }) {
  if (people.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <UsersIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p>No people in this category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {people.map((rec) => (
        <PersonCard key={rec.person.id} recommendation={rec} />
      ))}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Eye, EyeOff, Layers, Zap, Database, GitCompare } from 'lucide-react';
import { SkillsVisualization } from './SkillsVisualization';
import { TokenUsageDisplay } from './TokenUsageDisplay';
import { DataSourceIndicator } from './DataSourceIndicator';

interface BehindTheScenesOverlayProps {
  isVisible: boolean;
  onToggle: () => void;
  roleId: string;
  onCompareRoles: () => void;
}

export function BehindTheScenesOverlay({ isVisible, onToggle, roleId, onCompareRoles }: BehindTheScenesOverlayProps) {
  const [selectedView, setSelectedView] = useState<'skills' | 'tokens' | 'data'>('skills');

  if (!isVisible) {
    return (
      <div className="fixed top-6 right-6 z-30 flex flex-col gap-2">
        <Button
          onClick={onToggle}
          variant="outline"
          size="sm"
        >
          <Eye className="h-4 w-4 mr-2" />
          Behind the Scenes
        </Button>
        <Button
          onClick={onCompareRoles}
          variant="outline"
          size="sm"
        >
          <GitCompare className="h-4 w-4 mr-2" />
          Compare Roles
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Semi-transparent backdrop */}
      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 pointer-events-none" />

      {/* Toggle Buttons */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
        <Button
          onClick={onToggle}
          variant="default"
          size="sm"
        >
          <EyeOff className="h-4 w-4 mr-2" />
          Hide Demo Mode
        </Button>
        <Button
          onClick={onCompareRoles}
          variant="outline"
          size="sm"
          className="bg-white"
        >
          <GitCompare className="h-4 w-4 mr-2" />
          Compare Roles
        </Button>
      </div>

      {/* Floating Info Panel */}
      <Card className="fixed top-32 right-6 w-96 z-50 shadow-2xl border-2 border-blue-500 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-600" />
                Behind the Scenes
              </CardTitle>
              <CardDescription>Agent Skills Architecture</CardDescription>
            </div>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* View Tabs */}
          <div className="flex gap-2 mt-4">
            <Button
              variant={selectedView === 'skills' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedView('skills')}
              className="flex-1"
            >
              <Layers className="h-3.5 w-3.5 mr-1.5" />
              Skills
            </Button>
            <Button
              variant={selectedView === 'tokens' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedView('tokens')}
              className="flex-1"
            >
              <Zap className="h-3.5 w-3.5 mr-1.5" />
              Tokens
            </Button>
            <Button
              variant={selectedView === 'data' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedView('data')}
              className="flex-1"
            >
              <Database className="h-3.5 w-3.5 mr-1.5" />
              Data
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 max-h-[calc(100vh-320px)] overflow-y-auto">
          {selectedView === 'skills' && <SkillsVisualization roleId={roleId} />}
          {selectedView === 'tokens' && <TokenUsageDisplay roleId={roleId} />}
          {selectedView === 'data' && <DataSourceIndicator roleId={roleId} />}
        </CardContent>
      </Card>

      {/* Role Badge */}
      <div className="fixed bottom-6 left-6 z-50">
        <Badge className="text-sm py-2 px-4 bg-blue-600 hover:bg-blue-700">
          Demo Mode Active • Role: {roleId}
        </Badge>
      </div>
    </>
  );
}

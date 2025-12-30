import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Skeleton */}
        <Card className="p-6 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <div className="h-8 bg-gray-200 rounded w-1/3" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="flex gap-4">
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-32" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-6 bg-gray-200 rounded w-20" />
              <div className="h-6 bg-gray-200 rounded w-20" />
            </div>
          </div>
        </Card>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-6 bg-gray-200 rounded w-16" />
                    <div className="h-3 bg-gray-200 rounded w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Widgets Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-16 bg-gray-200 rounded" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PanelSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="border rounded-lg p-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

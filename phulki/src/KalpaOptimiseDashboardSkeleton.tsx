export default function KalpaOptimiseDashboardSkeleton() {
  return (
    <div className="animate-pulse flex min-h-screen w-full bg-muted/30">
      <div className="flex-1 p-6">
        <main className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
          </div>
          <div className="h-80 bg-gray-300 rounded"></div>
          <div className="h-80 bg-gray-300 rounded"></div>
        </main>
      </div>
    </div>
  );
}

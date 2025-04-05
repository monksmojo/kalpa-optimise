export default function KalpaOptimiseDashboardSkeleton() {
  return (
    <div className="animate-pulse flex min-h-screen w-full bg-muted/30">
      {/* <div className="w-64 bg-muted p-4">
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div> */}
      <div className="flex-1 p-6">
        <header className="h-16 bg-gray-300 rounded mb-6"></header>
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

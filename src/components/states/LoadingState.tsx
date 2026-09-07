/** Skeleton grid shown while products are loading - avoids a jarring blank screen or spinner-only wait. */
export function LoadingState() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
        >
          <div className="h-44 w-full bg-slate-200" />
          <div className="flex flex-col gap-2 p-4">
            <div className="h-4 w-16 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-2/3 rounded bg-slate-200" />
            <div className="mt-2 h-8 w-full rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

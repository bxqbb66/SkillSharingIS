export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="skeleton h-32 w-full" style={{ borderRadius: 0 }} />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="skeleton w-11 h-11 rounded-full" />
          <div className="space-y-1.5 flex-1">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-2 w-16" />
          </div>
        </div>
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-3/4" />
        <div className="flex justify-between items-center pt-1">
          <div className="skeleton h-5 w-16" />
          <div className="skeleton h-7 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row md:gap-6 md:p-6 md:max-w-5xl md:mx-auto">
      <div className="flex-1 md:w-2/3">
        <div className="bg-white px-4 py-4 md:rounded-xl md:shadow-sm space-y-4">
          <div className="skeleton h-4 w-16" />
          <div className="flex gap-2">
            <div className="skeleton h-6 w-32" />
            <div className="skeleton h-5 w-12 rounded" />
            <div className="skeleton h-5 w-12 rounded" />
          </div>
          <div className="skeleton h-8 w-24" />
        </div>
        <div className="bg-white mt-2 px-4 py-4 md:rounded-xl md:shadow-sm md:mt-4 space-y-2">
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-2/3" />
        </div>
      </div>
      <div className="hidden md:block md:w-1/3">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="skeleton w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
          <div className="skeleton h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen md:flex md:gap-6 md:p-6 md:max-w-5xl md:mx-auto">
      <div className="md:w-80 md:shrink-0">
        <div className="bg-white md:rounded-xl md:shadow-sm">
          <div className="bg-primary px-4 py-6 md:rounded-t-xl">
            <div className="flex items-center gap-4">
              <div className="skeleton w-16 h-16 rounded-full" />
              <div className="space-y-2">
                <div className="skeleton h-5 w-24 bg-white/30" />
                <div className="skeleton h-3 w-32 bg-white/30" />
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="skeleton h-20 w-full rounded-lg" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
          <div className="skeleton w-3 h-3 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-40" />
            <div className="skeleton h-3 w-64" />
            <div className="skeleton h-2 w-32" />
          </div>
          <div className="text-right space-y-1">
            <div className="skeleton h-5 w-16" />
            <div className="skeleton h-4 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

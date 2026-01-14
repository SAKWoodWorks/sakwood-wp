export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-64 bg-gray-200 animate-pulse" />
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

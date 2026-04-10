import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => (
  <div className="container mx-auto px-4 pt-20 pb-16">
    <Skeleton className="h-4 w-20 mb-8" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <div className="space-y-3">
        <Skeleton className="aspect-square w-full rounded" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-16 h-16 rounded" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-14 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-8 w-48 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

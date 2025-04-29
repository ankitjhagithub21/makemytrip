

const PlaceLoading = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 py-12 flex flex-col gap-3 animate-pulse">
      {/* Title Skeleton */}
      <button className="btn bg-gray-300 w-20"></button>
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>

      {/* Image Skeleton */}
      <div className="rounded-2xl bg-gray-300 w-full lg:h-[400px] h-64"></div>

      {/* Description Skeleton */}
      <div className="h-6 bg-gray-300 rounded w-full my-2"></div>
      <div className="h-6 bg-gray-300 rounded w-5/6 my-2"></div>
      <div className="h-6 bg-gray-300 rounded w-4/6 my-2"></div>

      {/* Price Skeleton */}
      <div className="h-8 bg-green-300 rounded w-1/4"></div>
    </div>
  );
};

export default PlaceLoading;

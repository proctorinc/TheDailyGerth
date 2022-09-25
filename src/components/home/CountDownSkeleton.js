const CountDownSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2 pb-3">
      <div className="h-4 w-1/2 rounded-full bg-base-200 bg-opacity-70 shimmering"></div>
      <div className="h-8 w-2/5 rounded-full bg-base-200 bg-opacity-70 shimmering"></div>
    </div>
  );
};

export default CountDownSkeleton;

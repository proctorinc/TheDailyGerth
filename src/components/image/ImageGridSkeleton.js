const ImageGridSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-1 pt-1">
        <div className="h-36 w-full rounded-md bg-base-200 bg-opacity-50 animate-pulse"></div>
        <div className="h-36 w-full rounded-md bg-base-200 bg-opacity-50 animate-pulse"></div>
        <div className="h-36 w-full rounded-md bg-base-200 bg-opacity-50 animate-pulse"></div>
    </div>
  )
}

export default ImageGridSkeleton
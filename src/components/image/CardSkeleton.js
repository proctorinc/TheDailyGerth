import { Heart, PaperPlaneTilt, Star } from "phosphor-react";
import { ICON_SIZE } from "@consts/consts";

const CardSkeleton = () => {
  return (
    <div className="card p-2">
      <div className="h-96 w-full rounded-lg bg-base-200 bg-opacity-50 animate-pulse"></div>
      <div className="card-actions flow-root mt-1 mb-0">
        <div className="flex float-left px-2">
          <Heart
            size={ICON_SIZE}
            weight="fill"
            className="my-1 text-base-200 animate-pulse"
          />
          <PaperPlaneTilt
            className="m-1 text-base-200 animate-pulse"
            weight="fill"
            size={ICON_SIZE}
          />
        </div>
        <div className="flex float-right px-2">
          <Star
            size={ICON_SIZE}
            weight="fill"
            className="my-1 text-base-200 animate-pulse"
          />
        </div>
      </div>
      <div className="card-content py-3 px-2">
        <div className="h-7 w-1/2 rounded-full bg-base-200 bg-opacity-70 animate-pulse"></div>
        <fieldset className="border-t border-base-200 text-base-200 mt-6 pb-5 animate-pulse"></fieldset>
      </div>
    </div>
  );
};

export default CardSkeleton;

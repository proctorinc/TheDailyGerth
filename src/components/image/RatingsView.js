import CheckLoading from "@components/flow/CheckLoading";
import { Heart, UserCircle } from "phosphor-react";
import Rating from "react-rating";
import useRatingsSnapshot from "@hooks/useRatingsSnapshot";
import { ICON_SIZE } from "@consts/consts";
import { calculateTimeSince, getTodaysDate } from "@utils/utils";
import useUserRatingSnapshot from "@hooks/useUserRatingSnapshot";

const RatingsView = ({ image }) => {
  const { ratings, ratingsLoading } = useRatingsSnapshot({ imageData: image });
  const userRating = useUserRatingSnapshot({
    imageData: image,
  });

  if (!ratings.length) {
    return (
      <fieldset className="border-t border-neutral text-base-200 mt-4 pb-5">
        <legend className="mx-auto px-4 text-xs">no ratings</legend>
      </fieldset>
    );
  }

  if (image.date !== getTodaysDate() || userRating?.value) {
    return (
      <div className="pt-4 pb-6">
        <fieldset className="border-t border-neutral font-bold text-base-200 pb-5">
          <legend className="mx-auto px-4 text-xs">ratings</legend>
        </fieldset>
        <CheckLoading isLoading={ratingsLoading}>
          {ratings.map((userRating) => {
            return (
              <div
                key={userRating.username + userRating.value}
                className="flex justify-center"
              >
                {/* For hiding ratings:
                 opacity-10 blur-sm
                 or
                 make demo skeleton (blurred)
              */}
                <div className="flex justify-center align-center pb-1">
                  <UserCircle
                    className="text-base-300 mx-1"
                    weight="regular"
                    size={ICON_SIZE}
                  />
                  <div>{userRating.username}:</div>
                  <div className="flex pl-3">
                    <Rating
                      initialRating={userRating.value}
                      readonly
                      emptySymbol={
                        <Heart
                          className="text-base-300"
                          weight="regular"
                          size={ICON_SIZE}
                        />
                      }
                      fullSymbol={
                        <Heart
                          className="text-secondary"
                          weight="fill"
                          size={ICON_SIZE}
                        />
                      }
                    />
                  </div>
                  <span className="badge bg-neutral rounded-lg ml-2">
                    {calculateTimeSince(userRating.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}
        </CheckLoading>
      </div>
    );
  }

  return (
    <fieldset className="border-t border-neutral text-base-200 mt-4 pb-5">
      <legend className="mx-auto px-4 text-xs">no ratings</legend>
      <div className="w-full text-center p-5 text-sm text-base-200">
        <div className="badge badge-outline rounded-lg">
          Rate today&apos;s image to see everyone&apos;s ratings
        </div>
      </div>
    </fieldset>
  );
};

export default RatingsView;

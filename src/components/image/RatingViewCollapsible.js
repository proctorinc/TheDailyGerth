import CheckLoading from "@components/flow/CheckLoading";
import {
  ArrowCircleDown,
  CaretDown,
  CaretUp,
  Heart,
  UserCircle,
} from "phosphor-react";
import Rating from "react-rating";
import useRatingsSnapshot from "@hooks/useRatingsSnapshot";
import { ICON_SIZE } from "@consts/consts";

const RatingViewCollapsible = ({ image }) => {
  const { ratings, ratingsLoading } = useRatingsSnapshot({ imageData: image });

  if (!ratings.length) {
    return (
      <fieldset className="border-t border-light text-medium mt-4 pb-5">
        <legend className="mx-auto px-4 text-xs">no ratings</legend>
      </fieldset>
    );
  }

  return (
    <div className="pt-4 pb-6">
      <fieldset className="border-t border-light text-medium pb-5">
        <legend className="mx-auto px-4 text-xs">
          ratings
          {/* <div className="flex justify-between">
            ratings
            <CaretUp
              className="text-medium mx-1"
              weight="regular"
              size={ICON_SIZE}
            />
          </div> */}
        </legend>
      </fieldset>
      <CheckLoading isLoading={ratingsLoading}>
        {ratings.map((userRating) => {
          return (
            <div
              key={userRating.username + userRating.value}
              className="flex justify-center"
            >
              <div className="flex justify-center align-center pb-1">
                <UserCircle
                  className="text-neutral mx-1"
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
                        className="text-neutral"
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
              </div>
            </div>
          );
        })}
      </CheckLoading>
    </div>
  );
};

export default RatingViewCollapsible;

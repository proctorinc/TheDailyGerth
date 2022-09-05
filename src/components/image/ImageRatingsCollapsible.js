import CheckLoading from "@components/flow/CheckLoading";
import { Heart } from "phosphor-react";
import Rating from "react-rating";
import Spinner from "@components/ui/Spinner";
import useRatingsSnapshot from "@hooks/useRatingsSnapshot";
import { COLOR_PINK } from "@consts/consts";

const ImageRatingsCollapsible = ({ image }) => {
  // Warning: ratings are loaded immediately and there is no wait for it to be opened first
  const { ratings, ratingsLoading } = useRatingsSnapshot({ imageData: image });

  return (
    <div className="collapse text-center p-0">
      <input type="checkbox" className="peer" />
      <div className="collapse-title font-light peer-checked:hidden">
        <div className="badge badge-outline">view ratings</div>
      </div>
      <h1 className="collapse-title font-light hidden peer-checked:inline">
        <CheckLoading
          isLoading={ratingsLoading}
          renderOnLoading={<Spinner size={"sm"} />}
        >
          <div className="badge badge-outline">
            {ratings.length == 0 ? "no ratings" : "ratings"}
          </div>
        </CheckLoading>
      </h1>
      <div className="flex flex-col justify-center collapse-content">
        <CheckLoading isLoading={ratingsLoading}>
          {ratings.map((userRating) => {
            return (
              <div key={userRating.username + userRating.value}>
                <div className="flex pb-4">
                  {userRating.username}:
                  <div className="flex pl-3">
                    <Rating
                      initialRating={userRating.value}
                      readonly
                      emptySymbol={
                        <Heart
                          className="text-neutral"
                          weight="regular"
                          size={32}
                        />
                      }
                      fullSymbol={
                        <Heart color={COLOR_PINK} weight="fill" size={32} />
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </CheckLoading>
      </div>
    </div>
  );
};

export default ImageRatingsCollapsible;

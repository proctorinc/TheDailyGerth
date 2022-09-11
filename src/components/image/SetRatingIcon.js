import { useState, useEffect } from "react";
import { Heart } from "phosphor-react";
import Rating from "react-rating";
import { setImageRating, fetchHasRatedImage } from "@api/firestore";
import useUserRatingSnapshot from "@hooks/useUserRatingSnapshot";
import { ICON_SIZE } from "@consts/consts";

const SetRatingIcon = ({ image, readOnly }) => {
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [openRatings, setOpenRatings] = useState(false);
  const { userRating, isRatingLoading } = useUserRatingSnapshot({
    imageData: image,
  });
  const [slideRating, setSlideRating] = useState(false);

  const getHasRated = async () => {
    const hasRatedThisImage = await fetchHasRatedImage(image);
    setHasRated(hasRatedThisImage);
  };

  const toggleOpenRatings = () => {
    setOpenRatings(!openRatings);
  };

  useEffect(() => {
    getHasRated();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {openRatings && (
        <Rating
          initialRating={rating}
          placeholderRating={userRating ? userRating.value : 0} // Add hook to monitor user's current rating?
          className="mt-1 pl-1"
          fractions={2}
          onChange={(value) => {
            setImageRating(image, value);
            setHasRated(true);
            setRating(0);
            setOpenRatings(false);
          }}
          emptySymbol={
            <Heart
              className="text-base-300"
              weight="regular"
              size={ICON_SIZE}
            />
          }
          fullSymbol={
            <Heart className="text-secondary" weight="fill" size={ICON_SIZE} />
          }
          placeholderSymbol={
            <Heart
              className="text-base-300"
              weight="duotone"
              size={ICON_SIZE}
            />
          }
        />
      )}
      {!openRatings && (
        <label className="p-1">
          {readOnly && !hasRated ? (
            <div
              className="tooltip tooltip-secondary tooltip-right"
              data-tip="You can only rate today's image"
            >
              <Heart
                className="text-base-300"
                weight="duotone"
                size={ICON_SIZE}
              />
            </div>
          ) : readOnly && hasRated ? (
            <div
              className="tooltip tooltip-secondary tooltip-right"
              data-tip="You can only rate today's image"
            >
              <Heart
                onClick={() => {
                  if (!readOnly) {
                    toggleOpenRatings();
                  }
                }}
                className="text-secondary"
                weight="fill"
                size={ICON_SIZE}
              />
            </div>
          ) : hasRated ? (
            <Heart
              onClick={() => {
                if (!readOnly) {
                  toggleOpenRatings();
                }
              }}
              className="text-secondary"
              weight="fill"
              size={ICON_SIZE}
            />
          ) : (
            <Heart
              onClick={() => {
                toggleOpenRatings();
              }}
              className="text-base-300"
              weight="regular"
              size={ICON_SIZE}
            />
          )}
        </label>
      )}
    </>
  );
};

export default SetRatingIcon;

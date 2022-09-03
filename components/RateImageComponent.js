import { useState, useEffect } from "react";
import { Heart, CheckCircle, XCircle } from "phosphor-react";
import Rating from "react-rating";
import { COLOR_PINK } from "../consts";
import { setImageRating, fetchHasRatedImage } from "../api/firestore";

const RateImageComponent = ({ image }) => {
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [openRatings, setOpenRatings] = useState(false);

  const getHasRated = async () => {
    const hasRatedThisImage = await fetchHasRatedImage(image);
    setHasRated(hasRatedThisImage);
  };

  const toggleOpenRatings = () => {
    setOpenRatings(!openRatings);
  };

  useEffect(() => {
    getHasRated();
  }, []);

  return (
    <>
      {openRatings && (
        <Rating
          initialRating={rating}
          className="pt-2 pl-3"
          fractions={2}
          onChange={(value) => {
            setRating(value);
          }}
          emptySymbol={
            <Heart className="text-neutral" weight="regular" size={32} />
          }
          fullSymbol={<Heart color={COLOR_PINK} weight="fill" size={32} />}
        />
      )}
      {openRatings && rating > 0 ? (
        <label className="p-2">
          <CheckCircle
            onClick={() => {
              setImageRating(image, rating);
              setHasRated(true);
              setRating(0);
              setOpenRatings(false);
            }}
            className="text-neutral"
            weight="regular"
            size={32}
          />
        </label>
      ) : openRatings && rating == 0 ? (
        <label className="p-2">
          <XCircle
            onClick={() => {
              setOpenRatings(false);
            }}
            className="text-neutral"
            weight="regular"
            size={32}
          />
        </label>
      ) : hasRated ? (
        <label className="p-2">
          <Heart
            onClick={() => {
              toggleOpenRatings();
            }}
            color={COLOR_PINK}
            weight="fill"
            size={32}
          />
        </label>
      ) : (
        <label className="p-2">
          <Heart
            onClick={() => {
              toggleOpenRatings();
            }}
            className="text-neutral"
            weight="regular"
            size={32}
          />
        </label>
      )}
    </>
  );
};

export default RateImageComponent;

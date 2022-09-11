import { useEffect, useState } from "react";
import {
  setImageAsFavorite,
  removeFavoritedImage,
  fetchHasFavoritedImage,
} from "@api/firestore";
import { Star } from "phosphor-react";
import { ICON_SIZE } from "@consts/consts";

const ToggleFavoritedIcon = ({ image }) => {
  const [hasFavorited, setHasFavorited] = useState(false);
  const [effect, setEffect] = useState(false);

  const getHasFavorited = async () => {
    const hasFavoritedThisImage = await fetchHasFavoritedImage(image);
    setHasFavorited(hasFavoritedThisImage);
  };

  useEffect(() => {
    getHasFavorited();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <label className="float-right p-1">
      {hasFavorited ? (
        <Star
          onClick={() => {
            setEffect(true);
            removeFavoritedImage(image);
            setHasFavorited(false);
          }}
          onAnimationEnd={() => setEffect(false)}
          className={`${effect && "animate-flash"} `}
          color="#fac011"
          weight="fill"
          size={ICON_SIZE}
        />
      ) : (
        <Star
          onClick={() => {
            setEffect(true);
            setImageAsFavorite(image);
            setHasFavorited(true);
          }}
          onAnimationEnd={() => setEffect(false)}
          className={`${effect && "animate-wiggle"} text-base-300`}
          weight="regular"
          size={ICON_SIZE}
        />
      )}
    </label>
  );
};

export default ToggleFavoritedIcon;

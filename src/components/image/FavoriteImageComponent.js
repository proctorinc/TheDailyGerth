import { useEffect, useState } from "react";
import {
  setImageAsFavorite,
  removeFavoritedImage,
  fetchHasFavoritedImage,
} from "@api/firestore";
import { Star } from "phosphor-react";

const FavoriteImageComponent = ({ image }) => {
  const [hasFavorited, setHasFavorited] = useState(false);

  const getHasFavorited = async () => {
    const hasFavoritedThisImage = await fetchHasFavoritedImage(image);
    setHasFavorited(hasFavoritedThisImage);
  };

  useEffect(() => {
    getHasFavorited();
  }, []);

  return (
    <label className="float-right p-2">
      {hasFavorited ? (
        <Star
          onClick={() => {
            removeFavoritedImage(image);
            setHasFavorited(false);
          }}
          className=""
          color="#fac011"
          weight="fill"
          size={32}
        />
      ) : (
        <Star
          onClick={() => {
            setImageAsFavorite(image);
            setHasFavorited(true);
          }}
          className="text-neutral"
          weight="regular"
          size={32}
        />
      )}
    </label>
  );
};

export default FavoriteImageComponent;

import { useEffect, useState } from "react";
import { fetchUserRatingSnapshot } from "@api/firestore";

const useUserRatingSnapshot = ({ imageData }) => {
  const [userRating, setUserRating] = useState([]);
  const [ratingIsLoading, setRatingIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = fetchUserRatingSnapshot(imageData, setUserRating);
    setRatingIsLoading(false);

    return () => unsubscribe();
  }, []);

  return {
    userRating,
    ratingIsLoading,
  };
};

export default useUserRatingSnapshot;

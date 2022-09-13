import { useEffect, useState } from "react";
import { fetchUserRatingSnapshot } from "@api/firestore";

const useUserRatingSnapshot = ({ imageData }) => {
  const [userRating, setUserRating] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchUserRatingSnapshot(imageData, setUserRating);

    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userRating;
};

export default useUserRatingSnapshot;

import { useEffect, useState } from "react";
import { fetchLiveRatingsSnapshot } from "../api/firestore";

const useRatingsSnapshot = ({ imageData }) => {
  const [ratings, setRatings] = useState([]);
  const [ratingsLoading, setRatingsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = fetchLiveRatingsSnapshot(imageData, setRatings);
    setRatingsLoading(false);

    return () => unsubscribe();
  }, []);

  return {
    ratings,
    ratingsLoading,
  };
};

export default useRatingsSnapshot;

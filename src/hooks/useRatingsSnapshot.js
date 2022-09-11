import { useEffect, useState } from "react";
import { fetchRatingsSnapshot } from "@api/firestore";

const useRatingsSnapshot = ({ imageData }) => {
  const [ratings, setRatings] = useState([]);
  const [ratingsLoading, setRatingsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = fetchRatingsSnapshot(imageData, setRatings);
    setRatingsLoading(false);

    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ratings,
    ratingsLoading,
  };
};

export default useRatingsSnapshot;

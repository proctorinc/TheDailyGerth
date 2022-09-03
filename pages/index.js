import { useEffect, useState, useRef } from "react";
import {
  fetchImageCount,
  fetchTodaysImage,
  fetchImagesAfter,
  getTodaysDate,
} from "../api/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import useScrollSnap from "react-use-scroll-snap";
import AuthRoute from "../auth/AuthRoute";
import CheckLoading from "../components/CheckLoading";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import ImageCard from "../components/ImageCard";
import CountdownTimer from "../components/CountdownTimer";

export default function Home() {
  const [images, setImages] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [loading, setLoading] = useState(true);
  // const scrollRef = useRef();
  // useScrollSnap({ ref: scrollRef, duration: 100, delay: 50 });

  const getNumberOfImages = async () => {
    const count = await fetchImageCount();
    setNumberOfImages(count);
  };

  const getTodaysImage = async () => {
    const todaysImage = await fetchTodaysImage();
    if (todaysImage != null) {
      setImages([todaysImage]);
    }
  };

  const getNextImages = async () => {
    const lastViewedImage = images[images.length - 1];
    const newImages = await fetchImagesAfter(lastViewedImage);
    setImages((old) => [...old, ...newImages]);
  };

  const onRefresh = () => {
    if (!images.length || images[0].date != getTodaysDate()) {
      setLoading(true);
      getTodaysImage();
      getNumberOfImages();
      setLoading(false);
    }
  };

  const renderEndMessage = (
    <div className="w-full text-center pt-10">
      <div className="badge badge-outline">No more cats to see :(</div>
    </div>
  );

  useEffect(() => {
    getTodaysImage();
    getNumberOfImages();
    setLoading(false);
  }, []);

  return (
    <AuthRoute>
      <Header />
      <CheckLoading isLoading={loading} renderOnLoad={<Spinner size="lg" />}>
        <CountdownTimer />
        <InfiniteScroll
          className="pb-48 flex-grow h-screen"
          // ref={scrollRef}
          dataLength={images.length}
          next={getNextImages}
          hasMore={images.length < numberOfImages}
          loader={<Spinner size={"lg"} />}
          endMessage={renderEndMessage}
          refreshFunction={onRefresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={<Spinner />}
          releaseToRefreshContent={<Spinner />}
        >
          {images &&
            images.map((image, i) => {
              return <ImageCard key={i} image={image} />;
            })}
        </InfiniteScroll>
      </CheckLoading>
    </AuthRoute>
  );
}

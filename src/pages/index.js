import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchImageCount,
  fetchTodaysImage,
  fetchImagesAfter,
} from "@api/firestore";
import { getTodaysDate } from "@utils/utils";
import AuthRoute from "@components/flow/AuthRoute";
import CheckLoading from "@components/flow/CheckLoading";
import Header from "@components/ui/Header";
import Spinner from "@components/ui/Spinner";
import ImageCard from "@components/image/ImageCard";
import CountdownTimer from "@components/home/CountdownTimer";
import Container from "@components/ui/Container";

export default function Home() {
  const [images, setImages] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { date } = router.query;

  const getNumberOfImages = async () => {
    setNumberOfImages(await fetchImageCount());
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
    <div className="w-full text-center pt-10 text-sm text-medium">
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
      <Container>
        {/* {date ? <h1>{date}</h1> : <></>} */}
        <CheckLoading
          isLoading={loading}
          renderOnLoading={<Spinner size="lg" />}
        >
          <CountdownTimer />
          <InfiniteScroll
            className="pb-40"
            dataLength={images.length}
            next={getNextImages}
            hasMore={images.length < numberOfImages}
            loader={<Spinner size={"lg"} />}
            endMessage={renderEndMessage}
            refreshFunction={onRefresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={images.length > 0 ? <Spinner /> : <></>}
            releaseToRefreshContent={images.length > 0 ? <Spinner /> : <></>}
          >
            {images &&
              images.map((image, i) => {
                return <ImageCard key={i} image={image} />;
              })}
          </InfiniteScroll>
        </CheckLoading>
      </Container>
    </AuthRoute>
  );
}

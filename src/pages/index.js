import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchImageCount,
  fetchImagesThroughDate,
  fetchImagesAfter,
} from "@api/firestore";
import AuthRoute from "@components/flow/AuthRoute";
import CheckLoading from "@components/flow/CheckLoading";
import Header from "@components/ui/Header";
import Card from "@components/image/Card";
import CountdownTimer from "@components/home/CountdownTimer";
import Container from "@components/ui/Container";
import CardSkeleton from "@components/image/CardSkeleton";

export default function Home() {
  const router = useRouter();
  const { date } = router.query;
  const [images, setImages] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [loading, setLoading] = useState(true);

  const getNumberOfImages = async () => {
    setNumberOfImages(await fetchImageCount());
  };

  const getInitialImages = async () => {
    const initialImages = await fetchImagesThroughDate(date);
    setImages(initialImages);
  };

  const getNextImages = async () => {
    const lastViewedImage = images[images.length - 1];
    const newImages = await fetchImagesAfter(lastViewedImage);
    setImages((old) => [...old, ...newImages]);
  };

  const renderEndMessage = (
    <div className="w-full text-center pt-10 text-sm text-base-200">
      <div className="badge badge-outline rounded-lg">
        No more cats to see :(
      </div>
    </div>
  );

  // const imageRef = useRef(null);

  // const scrollToBottom = () => {
  //   console.log("Scrolling!");
  //   console.log("offset:", imageRef.offsetTop);
  //   window.scrollTo({
  //     top: imageRef.offsetTop,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // };

  useEffect(() => {
    getInitialImages();
    getNumberOfImages();
    setLoading(false);
    // scrollToBottom();
  }, []);

  return (
    <AuthRoute>
      <Header />
      <Container>
        <CheckLoading isLoading={loading} renderOnLoading={<CardSkeleton />}>
          <CountdownTimer />
          <InfiniteScroll
            className="pb-40"
            dataLength={images.length}
            next={getNextImages}
            hasMore={images.length < numberOfImages}
            loader={<CardSkeleton />}
            endMessage={renderEndMessage}
          >
            {images &&
              images.map((image, i) => {
                return <Card key={i} image={image} />;
              })}
          </InfiniteScroll>
        </CheckLoading>
      </Container>
    </AuthRoute>
  );
}

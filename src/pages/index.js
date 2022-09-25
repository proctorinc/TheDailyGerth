import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchImageCount,
  fetchImagesThroughDate,
  fetchImagesAfter,
} from "@api/firestore";
import AuthRoute from "@components/flow/AuthRoute";
import Header from "@components/ui/Header";
import Card from "@components/image/Card";
import Countdown from "@components/home/Countdown";
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
    setLoading(false);
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

  useEffect(() => {
    getInitialImages();
    getNumberOfImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthRoute>
      <Header />
      <Container>
        {!loading && images.length == 0 ? (
          <div className="text-center">Error loading today&apos;s images</div>
        ) : (
          <>
            <Countdown />
            <InfiniteScroll
              className="pb-40"
              dataLength={images.length}
              next={getNextImages}
              hasMore={images.length < numberOfImages}
              loader={<CardSkeleton />}
              endMessage={renderEndMessage}
            >
              {images.map((image, i) => {
                return <Card key={i} image={image} />;
              })}
            </InfiniteScroll>
          </>
        )}
      </Container>
    </AuthRoute>
  );
}

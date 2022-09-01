import Header from "../components/Header";
import Card from "../components/Card";
import AuthRoute from "../auth/AuthRoute";
import { useEffect, useState } from "react";
import {
  fetchImageCount,
  fetchNextImages,
  fetchInitialImages,
} from "../api/firestore";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import {
  Heart,
  ChatCircle,
  PaperPlaneTilt,
  MapPin,
  Star,
} from "phosphor-react";

export default function Home() {
  const [images, setImages] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState(1);

  const getNumberOfImages = async () => {
    const count = await fetchImageCount();
    setNumberOfImages(count);
  };

  const getInitialImages = async () => {
    const newImages = await fetchInitialImages();
    setImages(newImages);
  };

  const getNextImages = async () => {
    const lastImage = images[images.length - 1];
    const newImages = await fetchNextImages(lastImage);
    setImages((old) => [...old, ...newImages]);
  };

  useEffect(() => {
    getNumberOfImages();
    getInitialImages();
  }, []);

  return (
    <AuthRoute>
      {/* <div className="h-screen"> */}
      <Header />
      <InfiniteScroll
        className="pb-10"
        dataLength={images.length}
        next={getNextImages}
        hasMore={images.length < numberOfImages}
        loader={<Spinner />}
        // endMessage={
        //   <div className="w-full text-center">
        //     <h1>That's it!</h1>
        //   </div>
        // }
        refreshFunction={() => {}}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={<Spinner />}
        releaseToRefreshContent={<Spinner />}
      >
        {images &&
          images.map((image, i) => {
            const date = new Date(image.date);
            var ratio = 1;
            return (
              <div key={i} className="card p-2">
                <Image
                  src={image.url}
                  // layout={"fill"}
                  // objectFit={"contain"}
                  width={200}
                  height={200 / ratio}
                  layout="responsive"
                  className="relative rounded-xl"
                  onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                    (ratio = naturalWidth / naturalHeight)
                  }
                />
                <div className="card-actions flow-root mt-1 mb-0">
                  <div className="flex float-left">
                    <label className="swap p-2">
                      <input type="checkbox" />
                      <Heart
                        className="swap-off text-neutral"
                        weight="regular"
                        size={32}
                      />
                      <Heart
                        className="swap-on"
                        color="#FD8D8D"
                        weight="fill"
                        size={32}
                      />
                    </label>
                    <ChatCircle
                      className="m-2 text-neutral"
                      weight="regular"
                      size={32}
                    />
                    <PaperPlaneTilt
                      className="m-2 text-neutral"
                      weight="regular"
                      size={32}
                    />
                  </div>
                  <label className="swap float-right p-2">
                    <input type="checkbox" />
                    <Star
                      className="swap-off text-neutral"
                      weight="regular"
                      size={32}
                    />
                    <Star
                      className="swap-on"
                      color="#fac011"
                      weight="fill"
                      size={32}
                    />
                  </label>
                </div>
                <h2 className="card-title px-2">
                  {date.toLocaleString("en-US", {
                    month: "long",
                  })}{" "}
                  {date.getDate()}, {date.getFullYear()}
                </h2>
                <div className="card-content px-2">
                  <p>Look at this cat. Can you believe how chunky it is?</p>
                  {/* <div class="badge badge-outline float-right text-gray-500">
                    picture taken: {image.date}
                  </div> */}
                </div>
              </div>
            );
          })}
      </InfiniteScroll>
      {/* <Footer /> */}
      {/* </div> */}
    </AuthRoute>
  );
}

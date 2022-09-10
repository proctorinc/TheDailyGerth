import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "@hooks/useAuth";
import AuthRoute from "@components/flow/AuthRoute";
import Header from "@components/ui/Header";
import Spinner from "@components/ui/Spinner";
import {
  fetchFavoritedImageCount,
  fetchFavoritedImagesAfter,
} from "@api/firestore";
import CheckLoading from "@components/flow/CheckLoading";
import Image from "next/image";
import Container from "@components/ui/Container";

const profile = () => {
  const { currentUser } = useAuth();
  const [images, setImages] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState();
  const [loading, setLoading] = useState(true);

  const getNumberOfFavoritedImages = async () => {
    setNumberOfImages(await fetchFavoritedImageCount());
  };

  const getFavoritedImages = async () => {
    setImages(await fetchFavoritedImagesAfter());
  };

  const getNextImages = async () => {
    const lastViewedImage = images[images.length - 1];
    const newImages = await fetchFavoritedImagesAfter(lastViewedImage);
    setImages((old) => [...old, ...newImages]);
  };

  const renderEndMessage = (
    <div className="w-full text-center pt-10">
      <div className="badge badge-outline">No more cats to see :(</div>
    </div>
  );

  useEffect(() => {
    getFavoritedImages();
    getNumberOfFavoritedImages();
    setLoading(false);
  }, []);

  return (
    <AuthRoute>
      <Header />
      <Container>
        <CheckLoading
          isLoading={loading}
          renderOnLoading={<Spinner size="lg" />}
        >
          <div className="text-center text-xl">
            {currentUser.displayName}'s Favorites
          </div>
          <InfiniteScroll
            className="pb-96 pt-10"
            dataLength={images.length}
            next={getNextImages}
            hasMore={images.length < numberOfImages}
            loader={<Spinner size={"lg"} />}
            endMessage={renderEndMessage}
          >
            <div className="grid grid-cols-3 gap-1 pt-10">
              {images &&
                images.map((favorited, i) => {
                  const image = {
                    date: favorited.image_date,
                    url: favorited.image_url,
                  };
                  return (
                    <Image
                      key={i}
                      src={image.url}
                      height={100}
                      width={100}
                      layout="responsive"
                      className="relative rounded-md"
                    />
                  );
                })}
            </div>
          </InfiniteScroll>
        </CheckLoading>
      </Container>
    </AuthRoute>
  );
};

export default profile;

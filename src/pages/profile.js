import { useEffect, useState } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchFavoritedImageCount,
  fetchFavoritedImagesAfter,
} from "@api/firestore";
import { useAuth } from "@hooks/useAuth";
import AuthRoute from "@components/flow/AuthRoute";
import Header from "@components/ui/Header";
import Spinner from "@components/ui/Spinner";
import CheckLoading from "@components/flow/CheckLoading";
import Container from "@components/ui/Container";
import ImageGridSkeleton from "@components/image/ImageGridSkeleton";
import { Pencil, UserCircle } from "phosphor-react";
import ImageCardModal from "@components/modal/ImageCardModal";

const Profile = () => {
  const { currentUser } = useAuth();
  const [images, setImages] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getNumberOfFavoritedImages = async () => {
    setNumberOfImages(await fetchFavoritedImageCount());
  };

  const getInitialImages = async () => {
    setImages(await fetchFavoritedImagesAfter());
  };

  const getNextImages = async () => {
    const lastViewedImage = images[images.length - 1];
    const newImages = await fetchFavoritedImagesAfter(
      lastViewedImage.image_date
    );
    setImages((old) => [...old, ...newImages]);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getInitialImages();
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
          <div className="flex align-center justify-center w-full">
            <div className="indicator">
              <Pencil
                size={5}
                className="btn btn-xs btn-circle btn-ghost indicator-item indicator-bottom"
              />
              <UserCircle size={96} weight="thin" />
            </div>
          </div>
          <div className="text-center text-xl">
            {currentUser.displayName}&apos;s Favorites
          </div>
          <InfiniteScroll
            className="pb-32"
            dataLength={images.length}
            next={getNextImages}
            hasMore={images.length < numberOfImages}
            loader={<ImageGridSkeleton />}
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
                      src={image.url}
                      alt={"Image: " + image.date}
                      height={100}
                      width={100}
                      layout="responsive"
                      className="relative rounded-md bg-neutral object-cover"
                      placeholder="blur"
                      blurDataURL={image.url}
                      key={i}
                      onClick={() => openModal(image)}
                    />
                  );
                })}
            </div>
          </InfiniteScroll>
          {images.length == 0 && (
            <div className="w-full text-center pt-10 text-sm text-base-200">
              <div className="badge badge-outline rounded-lg">
                Favorite an image to see it here!
              </div>
            </div>
          )}
        </CheckLoading>
        <ImageCardModal
          image={selectedImage}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Container>
    </AuthRoute>
  );
};

export default Profile;

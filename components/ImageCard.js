import Image from "next/image";
import {
  Heart,
  ChatCircle,
  PaperPlaneTilt,
  Star,
  XCircle,
  CheckCircle,
} from "phosphor-react";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Rating from "react-rating";
import Spinner from "./Spinner";
import {
  setImageRating,
  setImageAsFavorite,
  removeFavoritedImage,
  //   removeImageRating,
  fetchHasRatedImage,
  fetchHasFavoritedImage,
} from "../api/firestore";
import CheckLoading from "./CheckLoading";

const prettyDateFormat = (dateString) => {
  const date = new Date(`${dateString}T07:00:00.000Z`);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    time: "numeric",
  });
};

const ImageCard = ({ image }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingsOpen, setRatingsOpen] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [hasFavorited, setHasFavorited] = useState(false);
  const [openRatings, setOpenRatings] = useState(false);
  const [rating, setRating] = useState(0);

  const formattedDate = prettyDateFormat(image.date);
  var ratio = 1;

  const getHasRated = async () => {
    const hasRatedThisImage = await fetchHasRatedImage(image);
    setHasRated(hasRatedThisImage);
  };

  const getHasFavorited = async () => {
    const hasFavoritedThisImage = await fetchHasFavoritedImage(image);
    setHasFavorited(hasFavoritedThisImage);
  };

  const toggleOpenRatings = () => {
    setOpenRatings(!openRatings);
  };

  useEffect(() => {
    getHasRated();
  }, []);

  useEffect(() => {
    getHasFavorited();
  }, []);

  useEffect(() => {
    if (ratingsOpen) {
      const ratingsRef = collection(db, "ratings");
      const q = query(
        ratingsRef,
        where("image_date", "==", image.date),
        orderBy("value", "desc")
      );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const ratingsList = [];
          snapshot.forEach((doc) => {
            ratingsList.push(doc.data());
          });
          setRatings(ratingsList);
          if (loading) {
            setLoading(false);
          }
        },
        (onError) => {
          //   console.log(onError);
        }
      );

      return () => unsubscribe();
    }
  }, [ratingsOpen]);

  return (
    <div className="card p-2">
      <Image
        alt={image.url}
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
          {openRatings && (
            <Rating
              className="pt-2 pl-3"
              fractions={2}
              onChange={(value) => {
                console.log(value);
                setRating(value);
              }}
              emptySymbol={
                <Heart className="text-neutral" weight="regular" size={32} />
              }
              fullSymbol={<Heart color="#FD8D8D" weight="fill" size={32} />}
            />
          )}
          {openRatings && rating > 0 ? (
            <label className="p-2">
              <CheckCircle
                onClick={() => {
                  setImageRating(image, rating);
                  setHasRated(true);
                  setRating(0);
                  setOpenRatings(false);
                }}
                className="text-neutral"
                weight="regular"
                size={32}
              />
            </label>
          ) : openRatings && rating == 0 ? (
            <label className="p-2">
              <XCircle
                onClick={() => {
                  setOpenRatings(false);
                }}
                className="text-neutral"
                weight="regular"
                size={32}
              />
            </label>
          ) : hasRated ? (
            <label className="p-2">
              <Heart
                onClick={() => {
                  toggleOpenRatings();
                }}
                color="#FD8D8D"
                weight="fill"
                size={32}
              />
            </label>
          ) : (
            <label className="p-2">
              <Heart
                onClick={() => {
                  toggleOpenRatings();
                }}
                className="text-neutral"
                weight="regular"
                size={32}
              />
            </label>
          )}
          <ChatCircle
            onClick={() => console.log("Pressed comment button!")}
            className="m-2 text-neutral"
            weight="regular"
            size={32}
          />
          <PaperPlaneTilt
            onClick={() => console.log("Pressed share button!")}
            className="m-2 text-neutral"
            weight="regular"
            size={32}
          />
        </div>
        <label className="float-right p-2">
          {hasFavorited ? (
            <Star
              onClick={() => {
                removeFavoritedImage(image);
                setHasFavorited(false);
              }}
              className=""
              color="#fac011"
              weight="fill"
              size={32}
            />
          ) : (
            <Star
              onClick={() => {
                setImageAsFavorite(image);
                setHasFavorited(true);
              }}
              className="text-neutral"
              weight="regular"
              size={32}
            />
          )}
        </label>
      </div>
      <h2 className="card-title px-2">{formattedDate}</h2>
      <div className="card-content px-2">
        <p>Look at this cat. Can you believe how chunky it is?</p>
        {/* <div className="badge badge-outline float-right text-gray-500">
                    picture taken: {image.date}
                  </div> */}
        <div
          className="collapse text-center p-0"
          onClick={() => setRatingsOpen(true)}
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title font-light peer-checked:hidden">
            <div className="badge badge-outline">view ratings</div>
          </div>
          <h1 className="collapse-title font-light hidden peer-checked:inline">
            <CheckLoading
              isLoading={loading}
              renderOnLoad={<Spinner size={"sm"} />}
            >
              <div className="badge badge-outline">
                {ratings.length == 0 ? "no ratings" : "ratings"}
              </div>
            </CheckLoading>
          </h1>
          <div className="flex flex-col justify-center collapse-content">
            <CheckLoading isLoading={loading}>
              {ratings.map((userRating, i) => {
                return (
                  <div key={i}>
                    <div className="flex pb-4">
                      {userRating.username}:
                      <div className="flex pl-3">
                        <Rating
                          initialRating={userRating.value}
                          readonly
                          emptySymbol={
                            <Heart
                              className="text-neutral"
                              weight="regular"
                              size={32}
                            />
                          }
                          fullSymbol={
                            <Heart color="#FD8D8D" weight="fill" size={32} />
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CheckLoading>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

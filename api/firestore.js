import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";

const IMAGES_PER_PAGE = 2;
const LIMIT_ONE = 1;

export const getTodaysDate = () => {
  return new Date(Date.now())
    .toISOString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .split("T")[0];
};

export const fetchImageCount = async () => {
  const today = getTodaysDate();
  const imagesRef = collection(db, "images");
  const q = query(
    imagesRef,
    where("date", "<=", today),
    orderBy("date", "desc")
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.size;
};

export const fetchTodaysImage = async () => {
  const today = getTodaysDate();
  const imagesRef = collection(db, "images");
  const q = query(imagesRef, where("date", "==", today), limit(LIMIT_ONE));
  const querySnapshot = await getDocs(q);

  var image = null;
  querySnapshot.forEach((doc) => {
    image = doc.data();
  });

  return image;
};

export const fetchImagesAfter = async (imageData) => {
  const today = getTodaysDate();
  const lastDate = imageData.date;
  const imagesRef = collection(db, "images");
  const q = query(
    imagesRef,
    where("date", "<", today),
    orderBy("date", "desc"),
    startAfter(lastDate),
    limit(IMAGES_PER_PAGE)
  );
  const querySnapshot = await getDocs(q);

  const images = [];
  querySnapshot.forEach((doc) => {
    images.push(doc.data());
  });

  return images;
};

export const setImageAsFavorite = (imageData) => {
  const date = imageData.date;
  const username = "MattyP"; //auth.currentUser.username;
  const ratingsRef = doc(db, "favorites", `${date}-${username}`);
  setDoc(ratingsRef, {
    username: username,
    image_date: date,
  });
};

export const setImageRating = (imageData, rating) => {
  const date = imageData.date;
  const username = "MattyP"; //auth.currentUser.username;
  const ratingsRef = doc(db, "ratings", `${date}-${username}`);
  setDoc(ratingsRef, {
    value: rating,
    username: username,
    image_date: date,
  });
};

export const fetchHasRatedImage = async (imageData) => {
  const date = imageData.date;
  const username = "MattyP"; //auth.currentUser.username;
  const ratingsRef = doc(db, "ratings", `${date}-${username}`);
  const querySnapshot = await getDoc(ratingsRef);

  return !!querySnapshot.exists();
};

export const fetchHasFavoritedImage = async (imageData) => {
  const date = imageData.date;
  const username = "MattyP"; //auth.currentUser.username;
  const favoritesRef = doc(db, "favorites", `${date}-${username}`);
  const querySnapshot = await getDoc(favoritesRef);

  return !!querySnapshot.exists();
};

export const removeFavoritedImage = async (imageData) => {
  const date = imageData.date;
  const username = "MattyP"; //auth.currentUser.username;
  const favoritesRef = doc(db, "favorites", `${date}-${username}`);
  await deleteDoc(favoritesRef);
};

export const removeImageRating = async (imageData) => {
  const date = imageData.date;
  const username = "MattyP"; //auth.currentUser.username;
  const ratingsRef = doc(db, "ratings", `${date}-${username}`);
  await deleteDoc(ratingsRef);
};

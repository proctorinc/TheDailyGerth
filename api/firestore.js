import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";

const IMAGES_PER_PAGE = 2;

const getTodaysDate = () => {
  return new Date().toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

export const fetchImageCount = async () => {
  const imagesRef = collection(db, "images");
  const querySnapshot = await getDocs(imagesRef);

  return querySnapshot.size;
};

export const fetchInitialImages = async () => {
  const today = getTodaysDate();
  console.log("TODAY:", today);
  const imagesRef = collection(db, "images");
  const q = query(
    imagesRef,
    where("date", "<=", today),
    orderBy("date", "desc"),
    limit(IMAGES_PER_PAGE)
  );
  const querySnapshot = await getDocs(q);

  const images = [];
  querySnapshot.forEach((doc) => {
    images.push(doc.data());
  });
  return images;
};

export const fetchNextImages = async (imageData) => {
  const today = getTodaysDate();
  const lastDate = imageData.date;
  const imagesRef = collection(db, "images");
  const q = query(
    imagesRef,
    where("date", "<=", today),
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

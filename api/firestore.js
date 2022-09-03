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
import { getTodaysDate, getUserDocumentIdForImage } from "../utils";

const IMAGES_PER_PAGE = 2;
const LIMIT_ONE = 1;

const IMAGES_COLLECTION = "images";
const RATINGS_COLLECTION = "ratings";
const FAVORITES_COLLECTION = "favorites";

const checkIfUserDocumentExists = (collection, imageData) => {
  const date = imageData.date;
  const username = "MattyP"; //auth.currentUser.username;
  const docRef = doc(db, collection, `${date}-${username}`);
  const querySnapshot = await getDoc(docRef);

  return !!querySnapshot.exists();
}

const deleteDocumentFromCollection = (collection, imageData) => {
  const docRef = doc(db, collection, getUserDocumentIdForImage(imageData));
  await deleteDoc(docRef);
}

export const fetchImageCount = async () => {
  const today = getTodaysDate();
  const imagesRef = collection(db, IMAGES_COLLECTION);
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
  const imagesRef = collection(db, IMAGES_COLLECTION);
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
  const imagesRef = collection(db, IMAGES_COLLECTION);
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
  const docRef = doc(db, FAVORITES_COLLECTION, `${date}-${username}`);
  setDoc(docRef, {
    username: username,
    image_date: date,
  });
};

export const setImageRating = (imageData, rating) => {
  const date = imageData.date;
  const username = "MattyP"; //auth.currentUser.username;
  const docRef = doc(db, RATINGS_COLLECTION, `${date}-${username}`);
  setDoc(docRef, {
    value: rating,
    username: username,
    image_date: date,
  });
};

export const fetchHasRatedImage = async (imageData) => {
  return checkIfUserDocumentExists(RATINGS_COLLECTION, imageData);
};

export const fetchHasFavoritedImage = async (imageData) => {
  return checkIfUserDocumentExists(FAVORITES_COLLECTION, imageData);
};

export const removeFavoritedImage = async (imageData) => {
  deleteDocumentFromCollection(FAVORITES_COLLECTION, imageData);
};

export const removeImageRating = async (imageData) => {
  deleteDocumentFromCollection(RATINGS_COLLECTION, imageData)
};

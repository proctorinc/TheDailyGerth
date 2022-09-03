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
  onSnapshot,
} from "firebase/firestore";
import {
  IMAGES_PER_PAGE,
  LIMIT_ONE,
  IMAGES_COLLECTION,
  RATINGS_COLLECTION,
  FAVORITES_COLLECTION,
  DATE_FIELD,
  IMAGE_DATE_FIELD,
  VALUE_FIELD,
  DESC,
} from "../consts";
import { auth } from "../firebase/firebaseConfig";
import { getTodaysDate, getUserDocumentIdForImage } from "../utils";

const checkIfUserDocumentExists = async (collection, imageData) => {
  const date = imageData.date;
  const username = "MattyP"; //auth.currentUser.username;
  const docRef = doc(db, collection, `${date}-${username}`);
  const querySnapshot = await getDoc(docRef);

  return !!querySnapshot.exists();
};

const deleteDocumentFromCollection = async (collection, imageData) => {
  const docRef = doc(db, collection, getUserDocumentIdForImage(imageData));
  await deleteDoc(docRef);
};

export const fetchImageCount = async () => {
  const today = getTodaysDate();
  const imagesRef = collection(db, IMAGES_COLLECTION);
  const q = query(
    imagesRef,
    where(DATE_FIELD, "<=", today),
    orderBy(DATE_FIELD, DESC)
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.size;
};

export const fetchTodaysImage = async () => {
  const today = getTodaysDate();
  const imagesRef = collection(db, IMAGES_COLLECTION);
  const q = query(imagesRef, where(DATE_FIELD, "==", today), limit(LIMIT_ONE));
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
    where(DATE_FIELD, "<", today),
    orderBy(DATE_FIELD, DESC),
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
  return await checkIfUserDocumentExists(RATINGS_COLLECTION, imageData);
};

export const fetchHasFavoritedImage = async (imageData) => {
  return await checkIfUserDocumentExists(FAVORITES_COLLECTION, imageData);
};

// Function not being used currently
export const removeFavoritedImage = async (imageData) => {
  deleteDocumentFromCollection(FAVORITES_COLLECTION, imageData);
};

export const removeImageRating = async (imageData) => {
  deleteDocumentFromCollection(RATINGS_COLLECTION, imageData);
};

const getQueryForImageRatings = (imageData) => {
  const ratingsRef = collection(db, RATINGS_COLLECTION);
  const ratings_query = query(
    ratingsRef,
    where(IMAGE_DATE_FIELD, "==", imageData.date),
    orderBy(VALUE_FIELD, DESC)
  );
  return ratings_query;
};

export const fetchLiveRatingsSnapshot = (imageData, setResults) => {
  const query = getQueryForImageRatings(imageData);
  const subscription = onSnapshot(
    query,
    (snapshot) => {
      const ratingsList = [];
      snapshot.forEach((doc) => {
        ratingsList.push(doc.data());
      });
      setResults(ratingsList);
    },
    (onError) => {
      console.log(onError);
    }
  );

  return subscription;
};

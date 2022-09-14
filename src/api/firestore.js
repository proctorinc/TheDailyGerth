import { db } from "@firebase/config";
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
  Timestamp,
} from "firebase/firestore";
import {
  IMAGES_PER_PAGE,
  IMAGES_COLLECTION,
  RATINGS_COLLECTION,
  FAVORITES_COLLECTION,
  IMAGE_DATE_FIELD,
  USERNAME_FIELD,
  VALUE_FIELD,
  DATE_FIELD,
  DESC,
} from "@consts/consts";
import { getTodaysDate, getUserDocumentIdForImage } from "@utils/utils";
import { auth } from "@firebase/config";

const checkIfUserDocumentExists = async (collection, imageData) => {
  const docRef = doc(db, collection, getUserDocumentIdForImage(imageData));
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

export const fetchImagesThroughDate = async (date) => {
  const images = [];
  const today = getTodaysDate();
  const imagesRef = collection(db, IMAGES_COLLECTION);
  const q = query(
    imagesRef,
    where(DATE_FIELD, ">=", date ? date : today),
    orderBy(DATE_FIELD, DESC)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    images.push(doc.data());
  });

  return images;
};

export const fetchImagesAfter = async (imageData) => {
  if (!imageData) {
    return [];
  }
  const images = [];
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

  querySnapshot.forEach((doc) => {
    images.push(doc.data());
  });

  return images;
};

export const setImageAsFavorite = (imageData) => {
  const username = auth.currentUser.displayName;
  const docRef = doc(
    db,
    FAVORITES_COLLECTION,
    getUserDocumentIdForImage(imageData)
  );
  setDoc(docRef, {
    username: username,
    image_date: imageData.date,
    image_url: imageData.url,
  });
};

export const setImageRating = (imageData, rating) => {
  const date = imageData.date;
  const username = auth.currentUser.displayName;
  const docRef = doc(
    db,
    RATINGS_COLLECTION,
    getUserDocumentIdForImage(imageData)
  );
  setDoc(docRef, {
    value: rating,
    username: username,
    image_date: date,
    timestamp: Timestamp.now(),
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

export const fetchRatingsSnapshot = (imageData, handleResult) => {
  const query = getQueryForImageRatings(imageData);
  const subscription = onSnapshot(
    query,
    (snapshot) => {
      const ratingsList = [];
      snapshot.forEach((doc) => {
        ratingsList.push(doc.data());
      });
      handleResult(ratingsList);
    },
    (onError) => {
      console.log(onError);
    }
  );

  return subscription;
};

export const fetchUserRatingSnapshot = (imageData, handleResult) => {
  const subscription = onSnapshot(
    doc(db, RATINGS_COLLECTION, getUserDocumentIdForImage(imageData)),
    (doc) => {
      handleResult(doc.data());
    }
  );

  return subscription;
};

export const fetchUserDisplayNameFromFirestore = async () => {
  const userEmail = auth.currentUser.email;
  const imagesRef = collection(db, "users");
  const q = query(imagesRef, where("email", "==", userEmail));
  const querySnapshot = await getDocs(q);

  var username = null;
  querySnapshot.forEach((doc) => {
    username = doc.data().username;
  });

  return username;
};

export const fetchFavoritedImageCount = async () => {
  const username = auth.currentUser.displayName;
  const imagesRef = collection(db, FAVORITES_COLLECTION);
  console.log(`${USERNAME_FIELD} == ${username}`);

  const q = query(imagesRef, where(USERNAME_FIELD, "==", username));

  const querySnapshot = await getDocs(q);

  return querySnapshot.size;
};

// TODO: make it so favorited doc contains the url of the image
export const fetchFavoritedImagesAfter = async (date) => {
  const username = auth.currentUser.displayName;
  const imagesRef = collection(db, FAVORITES_COLLECTION);
  let q;
  if (date) {
    q = query(
      imagesRef,
      orderBy(IMAGE_DATE_FIELD, DESC),
      startAfter(date),
      limit(IMAGES_PER_PAGE),
      where(USERNAME_FIELD, "==", username)
    );
  } else {
    q = query(
      imagesRef,
      orderBy(IMAGE_DATE_FIELD, DESC),
      where(USERNAME_FIELD, "==", username),
      limit(9)
    );
  }

  const querySnapshot = await getDocs(q);

  const images = [];
  querySnapshot.forEach((doc) => {
    images.push(doc.data());
  });

  return images;
};

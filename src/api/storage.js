import { getBlob, ref, getMetadata } from "firebase/storage";
import { storage } from "@firebase/config";

/* Unused */
export const fetchImageFromStorage = (imageData) => {
  const imagesRef = ref(
    storage,
    "new-images/CC7191E7-155E-4596-BEB4-64C12D33CDEC.jpeg"
  );
  const blob = getBlob(imagesRef).catch((err) => {
    console.log(err);
  });

  const image = new File([blob], `${imageData.date}.jpeg`, {
    type: blob.type,
  });
  return image;
};

/* Unused */
export const fetchImageMetadata = async (imageData) => {
  const imagesRef = ref(
    storage,
    "new-images/CC7191E7-155E-4596-BEB4-64C12D33CDEC.jpeg"
  );
  const metadata = await getMetadata(imagesRef).catch((err) => {
    console.log(err);
  });
  return metadata;
};

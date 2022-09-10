import { auth } from "@firebase/config";

export const prettyDateFormat = (dateString) => {
  return new Date(dateString).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

export const getTodaysDate = () => {
  var timezoneOffset = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - timezoneOffset)
    .toISOString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .split("T")[0]
    .replace(/\//g, "-");
};

export const getUserDocumentIdForImage = (imageData) => {
  const date = imageData.date;
  const userId = auth.currentUser.uid;

  return `${date}-${userId}`;
};

export const setToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
};

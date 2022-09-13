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

export const getTodaysDateSimple = () => {
  var timezoneOffset =
    new Date(Date.now() - timezoneOffset).getTimezoneOffset() * 60000;
  return new Date().toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
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

export const formatTimestamp = (timestamp) => {
  const ratingDate = timestamp.toDate();
  return ratingDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};

export const calculateTimeSince = (timestamp) => {
  const timeDiff = new Date(Date.now()) - timestamp.toDate();
  const days = Math.floor(timeDiff / 86400000); // days
  const hours = Math.floor((timeDiff % 86400000) / 3600000); // hours
  const minutes = Math.round(((timeDiff % 86400000) % 3600000) / 60000); // minutes

  if (days > 0) {
    return `${days}d`;
  }
  if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return "now";
  }
};

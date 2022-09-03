export const prettyDateFormat = (dateString) => {
  const date = new Date(`${dateString}T07:00:00.000Z`);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    time: "numeric",
  });
};

export const getTodaysDate = () => {
  return new Date(Date.now())
    .toISOString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .split("T")[0];
};

export const getUserDocumentIdForImage = (imageData) => {
  const date = imageData.date;
  const username = "MattyP"; //auth.currentUser.username;

  return `${date}-${username}`;
};

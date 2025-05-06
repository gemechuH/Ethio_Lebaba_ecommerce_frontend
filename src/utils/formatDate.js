export const formatDate = (dateString) => {
  if (!dateString) return "No date";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

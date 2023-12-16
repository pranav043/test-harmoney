export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString("en-US", { hour12: true });
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return `${time} ${formattedDate}`;
};

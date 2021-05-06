export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return dateTimeFormat.format(date);
};

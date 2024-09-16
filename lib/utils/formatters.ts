import { format } from "date-fns";

export const formatDate = (date: Date) => {
  if (!date) return "";
  return format(date, "MMMM dd, yyyy");
};
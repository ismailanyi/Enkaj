export default function toKenyanTime(date: Date | string): Date {
  // Create a new Date object to avoid mutating the original
  const newDate = new Date(date);

  if (process.env.NODE_ENV !== "production") return newDate;

  // Subtract the hours
  newDate.setHours(newDate.getHours() - 3);

  return newDate;
}

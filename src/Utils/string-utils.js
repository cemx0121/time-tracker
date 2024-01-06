export function formatDateToLongString(input) {
  // Check if the input is a string, and if so, convert it to a Date object
  if (typeof input === "string") {
    input = new Date(input);
  }

  // Check if the input is a valid Date object
  if (!(input instanceof Date) || isNaN(input)) {
    return "Invalid Date";
  }

  // Define the desired date formatting options
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Format the date using the Intl.DateTimeFormat API
  const formattedDate = new Intl.DateTimeFormat("da-DK", options).format(input);

  return formattedDate;
}

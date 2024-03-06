// import Date from "./Date";

// Format the time for friendly and clear reading
export function formatTime (startDate, formatDateData) {
  // console.log("formatDateData", startDate);
  if (!startDate) return;
  let hours =
    startDate?.getHours() > 12
      ? Math.floor(startDate?.getHours() - 12)
      : startDate?.getHours();
  let appTime;
  let formattedTime;
  let error;

  // if hour is 0 (12:00am), change it to 12
  if (hours === 0) {
    hours = 12;
  }
  // set `am` or `pm`
  const periodOfDay = startDate?.getHours() >= 12 ? "pm" : "am";

  // formating time which misses a "0" in the minutes field when :00
  const minutes = startDate?.getMinutes();
  minutes === 0
    ? (formattedTime = `${hours}:${minutes}0 ${periodOfDay}`)
    : (formattedTime = `${hours}:${minutes} ${periodOfDay}`);

  // console.log(`hours..., ${hours}, ${minutes}, ${periodOfDay}`);

  if ("09" < startDate?.getHours() < "19") {
    appTime = formattedTime;
  } else {
    error = "Office is closed at this time...";
    return;
  }
  // console.log("formattedTime", startDate);

  return { appTime, error };
};


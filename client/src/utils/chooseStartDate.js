import { parseISO } from "date-fns";

export function chooseStartDate (startDate, appTime) {
  // console.log(date);
  // console.log("startDate", startDate);
  if (!startDate) return;
  // Updating [allAppointments] with new appointment
  const isBooked = JSON.stringify(startDate);
  const dateArr = isBooked.replaceAll('"', "").split(":");
  const finalDate = dateArr[0].slice(0, 10);
  const finalDateISO = parseISO(finalDate);
  //   allAppointments.push(finalDateISO);

  // fomating a short date called digitalAppointment which will be used later to compare past or future appointments
  const digitMonth = isBooked.slice(6, 8);
  const digitYear = isBooked.slice(1, 5);
  const digitDate = isBooked.slice(9, 11);
  const digitalAppointment = `${digitMonth}/${digitDate}/${digitYear}`;
  //   setDigitalAppointment(shortAppointment);

  // formating user's appointment date for display in cards
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const appDay = day[startDate.getDay()];
  // setAppointmentDay(appDay);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const appMonth = month[startDate.getMonth()];
  // setAppointmentMonth(appMonth);

  const year = startDate.getFullYear();
  // setAppYear(year.toString());

  // adding a suffixe to day's date ex: 1st, 2nd, 3rd or 4th... dateStr will exported to next component and dateSuffixed used for booking appointment data
  let dateStr = startDate.getDate().toString();
  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === "1" && dateStr !== "11") {
    dateStr = `${dateStr}st`;
    // setDateSuffixed(`${dateStr}st`);
  } else if (lastChar === "2" && dateStr !== "12") {
    dateStr = `${dateStr}nd`;
    // setDateSuffixed(`${dateStr}nd`);
  } else if (lastChar === "3" && dateStr !== "13") {
    dateStr = `${dateStr}rd`;
    // setDateSuffixed(`${dateStr}rd`);
  } else {
    dateStr = `${dateStr}th`;
    // setDateSuffixed(`${dateStr}th`);
  }

  // 'appString' for display appointment info in cards and confirmations
  const appString = `${appDay}, ${appMonth} ${dateStr}, ${year} at ${appTime}`;
  //   setAppointmentString(appString);

  return { finalDateISO, digitalAppointment, appString };
};

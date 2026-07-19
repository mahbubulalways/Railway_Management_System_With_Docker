import { WeekDay } from "../../../generated/prisma/enums";

export const WEEK_DAYS: WeekDay[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

// TIME MANAGEMENT
export const trainTimeManagement = (
  startTime: string,
  routeStations: {
    travelTimeFromPrevious: number;
    stopTime: number;
  }[],
) => {
  const [time, period] = startTime.split(" ");

  let [hour, minute] = time.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  let currentMinutes = hour * 60 + minute;

  const formatTime = (minutes: number) => {
    minutes %= 24 * 60;

    let h = Math.floor(minutes / 60);
    const m = minutes % 60;

    const ampm = h >= 12 ? "PM" : "AM";

    h %= 12;
    if (h === 0) h = 12;

    return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  return routeStations.map((station, index) => {
    let arrivalTime: string;

    if (index === 0) {
      arrivalTime = formatTime(currentMinutes);
    } else {
      currentMinutes += station.travelTimeFromPrevious;
      arrivalTime = formatTime(currentMinutes);
    }

    currentMinutes += station.stopTime;

    return {
      arrivalTime,
      departureTime: formatTime(currentMinutes),
    };
  });
};

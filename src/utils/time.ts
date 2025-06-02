import type { AmPm } from "~/types/Time";

export const getAMPM = (hour: string): AmPm => (+hour < 12 ? "AM" : "PM");

interface Convert24To12Result {
  hour: string;
  ampm: AmPm;
}
export const convert24hoursTo12 = (hour: string): Convert24To12Result => {
  let hour12 = parseInt(hour, 10);
  const ampm = hour12 < 12 ? "AM" : "PM";
  if (hour12 === 0) {
    hour12 = 12; // Midnight case
  }
  if (hour12 > 12) {
    hour12 -= 12; // Convert to 12-hour format
  }
  return {
    hour: hour12.toString().padStart(2, "0"),
    ampm,
  };
};

export const convert12HourTo24 = (props: Convert24To12Result): string => {
  const { hour, ampm } = props;

  let hour24 = parseInt(hour, 10);
  if (ampm === "PM" && hour24 < 12) {
    hour24 += 12;
  } else if (ampm === "AM" && hour24 === 12) {
    hour24 = 0;
  }
  return hour24.toString().padStart(2, "0");
};

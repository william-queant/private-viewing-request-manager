import type { User } from "./User";

export type AmPm = "AM" | "PM";

export const AmPmValues = {
  AM: "AM" as AmPm,
  PM: "PM" as AmPm,
};

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const DaysValues = {
  Monday: "Monday" as Day,
  Tuesday: "Tuesday" as Day,
  Wednesday: "Wednesday" as Day,
  Thursday: "Thursday" as Day,
  Friday: "Friday" as Day,
  Saturday: "Saturday" as Day,
  Sunday: "Sunday" as Day,
};

export const weekDays: Day[] = [
  DaysValues.Monday,
  DaysValues.Tuesday,
  DaysValues.Wednesday,
  DaysValues.Thursday,
  DaysValues.Friday,
  DaysValues.Saturday,
  DaysValues.Sunday,
] as const;

export type TimeSlotStatus = "Available" | "Booked" | "Pending";

export const TimeSlotStatusValues = {
  Available: "Available" as TimeSlotStatus,
  Booked: "Booked" as TimeSlotStatus,
  Pending: "Pending" as TimeSlotStatus,
};

export type TimeSlot = {
  day: string; // ISO date string, e.g., "2023-10-01"
  time: string; // 24-hour format, e.g., "14:00"
  user: User;
  status: TimeSlotStatus;
};

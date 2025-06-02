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

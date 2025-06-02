import { Box, Button, Flex, Text } from "@radix-ui/themes";
import type { User } from "~/types/User";
import { usePrivateViewSettingsStore } from "~/stores/privateViewSettingsStore";
import type { TimeSlot } from "~/types/Time";
import { formatTime24 } from "~/utils/time";
import { DateTime } from "luxon";

interface AvailableTimeSlotProps {
  day: string; // ISO date string
  user: User;
  selectedSlots: TimeSlot[];
  setSelectedSlots: (
    slots: TimeSlot[] | ((prev: TimeSlot[]) => TimeSlot[])
  ) => void;
}

// Function to calculate the next time slot based on duration and current time in "HH:MM" format
const nextTime = (time: string, duration: number) => {
  const [hours, minutes] = time.split(":").map(Number);

  let nextMinutes = minutes + duration;
  let nextHours = hours;

  if (nextMinutes >= 60) {
    nextHours += 1;
    nextMinutes = 0;
  }

  return formatTime24(nextHours, nextMinutes);
};

// Generate time slots from globalFromHour to globalToHour in duration intervals
const generateTimeSlots = (
  from: string,
  to: string,
  day: string,
  user: User,
  duration: number
): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  let currentTime = from; // Start with "from" formatted as time string

  while (currentTime <= to) {
    // Create a time slot object
    const newSlot: TimeSlot = {
      day,
      time: currentTime,
      user,
      status: "Available", // Default status
    };
    slots.push(newSlot);

    // Move to next time slot based on duration
    currentTime = nextTime(currentTime, duration);

    // Safety check to prevent infinite loop
    if (currentTime >= "24:00") break;
  }

  return slots;
};

export function AvailableTimeSlot(props: AvailableTimeSlotProps) {
  const { day, user, selectedSlots, setSelectedSlots } = props;

  const globalFromHour = usePrivateViewSettingsStore(
    (state) => state.globalFromHour
  );
  const globalToHour = usePrivateViewSettingsStore(
    (state) => state.globalToHour
  );
  const duration = usePrivateViewSettingsStore((state) => state.duration);
  const handleSlotToggle = (timeSlot: TimeSlot) => {
    console.log(timeSlot, selectedSlots);

    setSelectedSlots((prev) => {
      // Check if slot is already selected by comparing day and time
      const isAlreadySelected = prev.some(
        (slot: TimeSlot) =>
          slot.day === timeSlot.day && slot.time === timeSlot.time
      );

      if (isAlreadySelected) {
        // Remove slot if already selected
        return prev.filter(
          (slot: TimeSlot) =>
            !(slot.day === timeSlot.day && slot.time === timeSlot.time)
        );
      } else {
        // Add slot if less than 3 are selected
        if (prev.length < 3) {
          return [...prev, { ...timeSlot, status: "Pending" }];
        }
        return prev;
      }
    });
  };

  const isSlotSelected = (timeSlot: TimeSlot) =>
    selectedSlots.some(
      (slot) => slot.day === timeSlot.day && slot.time === timeSlot.time
    );
  const canSelectMore = selectedSlots.length < 3;

  const summary = selectedSlots
    .sort(
      (a, b) =>
        DateTime.fromISO(`${a.day}T${a.time}:00`).toMillis() -
        DateTime.fromISO(`${b.day}T${b.time}:00`).toMillis()
    )
    .map(
      (slot) =>
        `${DateTime.fromISO(slot.day).toLocaleString(DateTime.DATE_MED)} ${
          slot.time
        }`
    );

  const timeSlots = generateTimeSlots(
    globalFromHour,
    globalToHour,
    day,
    user,
    duration
  );

  const selectedSlotTitle =
    selectedSlots.length === 0
      ? "No Selected time slots"
      : "Selected time slots:";

  return (
    <Box>
      <Flex direction="column" gap="2">
        <Text size="2" color="gray" mb="2">
          Select up to 3 preferred time slots:
        </Text>

        <Flex wrap="wrap" gap="2">
          {timeSlots.map((timeSlot) => {
            const isSelected = isSlotSelected(timeSlot);
            const isDisabled = !canSelectMore && !isSelected;
            const key = `timeslot-${timeSlot.day}-${timeSlot.time}`;

            return (
              <Button
                key={key}
                size="2"
                variant={isSelected ? "solid" : "outline"}
                color={isSelected ? "blue" : "gray"}
                onClick={() => handleSlotToggle(timeSlot)}
                disabled={isDisabled}
                style={{
                  minWidth: "80px",
                  opacity: isDisabled ? 0.5 : 1,
                }}
              >
                {timeSlot.time}
              </Button>
            );
          })}
        </Flex>

        <Box
          mt="3"
          p="2"
          style={{ backgroundColor: "var(--gray-a2)", borderRadius: "4px" }}
        >
          <Text size="2" color="gray" mb="1">
            {selectedSlotTitle}
          </Text>
          <Flex gap="6" justify="center" wrap="wrap" style={{ height: "30px" }}>
            {summary.map((slot, index) => (
              <Text
                size="2"
                weight="bold"
                color="blue"
                key={`selected-slot-${index}`}
              >
                {slot}
              </Text>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

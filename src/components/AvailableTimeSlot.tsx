import { Box, Button, Flex, Text } from "@radix-ui/themes";
import type { User } from "~/types/User";
import { usePrivateViewSettingsStore } from "~/stores/privateViewSettingsStore";
import { useSelectedSlotsStore } from "~/stores/selectedSlotsStore";
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
    // Create a time slot object with unique ID
    const newSlot: TimeSlot = {
      id: `${user.id}-${day}-${currentTime}`, // Unique identifier
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
  const getSlotsByUser = useSelectedSlotsStore((state) => state.getSlotsByUser);
  const getBookedSlotsForDateTime = useSelectedSlotsStore(
    (state) => state.getBookedSlotsForDateTime
  );
  const handleSlotToggle = (timeSlot: TimeSlot) => {
    setSelectedSlots((prev) => {
      // Check if slot is already selected by comparing unique ID
      const isAlreadySelected = prev.some(
        (slot: TimeSlot) => slot.id === timeSlot.id
      );

      if (isAlreadySelected) {
        // Remove slot if already selected
        return prev.filter((slot: TimeSlot) => slot.id !== timeSlot.id);
      } else {
        // Check how many slots this specific user has already selected
        const userSelectedSlots = prev.filter(
          (slot) => slot.user.id === user.id
        );

        // Add slot if this user has less than 3 selected
        if (userSelectedSlots.length < 3) {
          return [...prev, { ...timeSlot, status: "Pending" }];
        }
        return prev;
      }
    });
  };
  const userSlots = getSlotsByUser(user);

  const isSlotSelected = (timeSlot: TimeSlot) =>
    selectedSlots.some((slot) => slot.id === timeSlot.id);
  const stateUserSelectedSlots = selectedSlots.filter(
    (slot) => slot.user.id === user.id
  );

  const canSelectMore = stateUserSelectedSlots.length < 3;

  const summary = stateUserSelectedSlots
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
    userSlots.length === 0 ? "No Selected time slots" : "Selected time slots:";

  return (
    <Box>
      <Flex direction="column" gap="2">
        <Text size="2" color="gray" mb="2">
          Select up to 3 preferred time slots:
        </Text>
        <Flex wrap="wrap" gap="2">
          {timeSlots.map((timeSlot) => {
            const isSelected = isSlotSelected(timeSlot);
            const isBooked =
              getBookedSlotsForDateTime(timeSlot.day, timeSlot.time).length > 0;
            const isDisabledDueToLimit = !canSelectMore && !isSelected;
            const isDisabled = isDisabledDueToLimit || isBooked;

            return (
              <Button
                key={timeSlot.id}
                size="2"
                variant={
                  isSelected ? "solid" : isBooked ? "outline" : "outline"
                }
                color={isSelected ? "blue" : isBooked ? "gray" : "gray"}
                onClick={() => handleSlotToggle(timeSlot)}
                disabled={isDisabled}
                style={{
                  minWidth: "80px",
                  opacity: isBooked ? 0.5 : isDisabledDueToLimit ? 0.7 : 1,
                  textDecoration: isBooked ? "line-through" : "none",
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

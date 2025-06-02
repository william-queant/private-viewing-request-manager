import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import type { User } from "~/types/User";
import { usePrivateViewSettingsStore } from "~/stores/privateViewSettingsStore";

interface AvailableTimeSlotProps {
  day: string; // ISO date string
  user: User;
}

export function AvailableTimeSlot(props: AvailableTimeSlotProps) {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const globalFromHour = usePrivateViewSettingsStore(
    (state) => state.globalFromHour
  );
  const globalToHour = usePrivateViewSettingsStore(
    (state) => state.globalToHour
  );
  const duration = usePrivateViewSettingsStore((state) => state.duration);

  // Generate time slots from globalFromHour to 17:00 (5 PM) in 1-hour intervals
  const generateTimeSlots = () => {
    const slots: string[] = [];

    const endHour = 17; // 5 PM

    for (let hour = globalFromHour; +hour < +endHour; +hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`;
      slots.push(timeString);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSlotToggle = (timeSlot: string) => {
    setSelectedSlots((prev) => {
      if (prev.includes(timeSlot)) {
        // Remove slot if already selected
        return prev.filter((slot) => slot !== timeSlot);
      } else {
        // Add slot if less than 3 are selected
        if (prev.length < 3) {
          return [...prev, timeSlot];
        }
        return prev;
      }
    });
  };

  const isSlotSelected = (timeSlot: string) => selectedSlots.includes(timeSlot);
  const canSelectMore = selectedSlots.length < 3;

  return (
    <Box>
      <Flex direction="column" gap="2">
        <Text size="2" color="gray" mb="2">
          Select up to 3 preferred time slots:
        </Text>

        <Text size="1" color="blue" mb="3">
          Selected: {selectedSlots.length}/3
        </Text>

        <Flex wrap="wrap" gap="2">
          {timeSlots.map((timeSlot) => {
            const isSelected = isSlotSelected(timeSlot);
            const isDisabled = !canSelectMore && !isSelected;

            return (
              <Button
                key={timeSlot}
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
                {timeSlot}
              </Button>
            );
          })}
        </Flex>

        {selectedSlots.length > 0 && (
          <Box
            mt="3"
            p="2"
            style={{ backgroundColor: "var(--gray-a2)", borderRadius: "4px" }}
          >
            <Text size="2" weight="bold" mb="1">
              Selected time slots:
            </Text>
            <Text size="2" color="gray">
              {selectedSlots.sort().join(", ")}
            </Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
}

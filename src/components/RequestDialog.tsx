import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import { DateTime } from "luxon";
import type { User } from "~/types/User";
import { UserAvatar } from "./UserAvatar";
import { AvailableTimeSlot } from "./AvailableTimeSlot";
import { usePrivateViewSettingsStore } from "~/stores/privateViewSettingsStore";
import { availableDateISO } from "~/utils/time";

interface RequestDialogProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
}

const today = DateTime.local().toISODate();

export function RequestDialog({ isOpen, user, onClose }: RequestDialogProps) {
  const openDays = usePrivateViewSettingsStore((state) => state.openDays);

  const [preferredDate, setPreferredDate] = useState(
    availableDateISO(today, 1, openDays)
  );
  const [preferredTime, setPreferredTime] = useState([]);

  //#region Dialog functions
  const formReset = () => {
    setPreferredDate(availableDateISO(today, 1, openDays));
    setPreferredTime([]);
  };

  const handleSubmit = () => {
    // Save the results

    formReset();
    onClose();
  };

  const handleClose = () => {
    formReset();
    onClose();
  };
  //#endregion

  //#region Buttons for the Day
  const handleNextAvailable = () => {
    const newDate = availableDateISO(today, 1, openDays);
    if (newDate) {
      setPreferredDate(newDate);
    }
  };

  const handlePrevious = () => {
    const daysToAdd = -1;
    const prevDay = DateTime.fromISO(preferredDate || today)
      .plus({ days: daysToAdd })
      .toISODate();

    const newDate = availableDateISO(prevDay, daysToAdd, openDays);

    if (newDate) {
      setPreferredDate(newDate);
    }
  };

  const handleNext = () => {
    const daysToAdd = 1;
    const nextDay = DateTime.fromISO(preferredDate || today)
      .plus({ days: daysToAdd })
      .toISODate();

    const newDate = availableDateISO(nextDay, daysToAdd, openDays);

    if (newDate) {
      setPreferredDate(newDate);
    }
  };
  //#endregion

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>
          <Flex align="center" gap="3">
            <UserAvatar user={user} isSmall isCircle />
            <Heading size="4">Request a Private Viewing</Heading>
            <Dialog.Close>
              <IconButton
                size="1"
                variant="ghost"
                style={{ position: "absolute", top: 10, right: 10 }}
              >
                <Cross2Icon />
              </IconButton>
            </Dialog.Close>
          </Flex>
        </Dialog.Title>

        <Text size="2" color="gray">
          Pencil up to three available time slots for your viewing request.
        </Text>

        <Flex align="center" gap="3" justify="center" style={{ marginTop: 30 }}>
          <Button
            variant="outline"
            color="gray"
            size={"2"}
            onClick={handleNextAvailable}
          >
            Next Available Day
          </Button>
        </Flex>

        <Flex
          align="center"
          gap="3"
          justify="between"
          style={{ marginBlock: 10 }}
        >
          <IconButton
            variant="soft"
            color="gray"
            onClick={handlePrevious}
            disabled={
              DateTime.fromISO(preferredDate || today) <=
              DateTime.fromISO(today)
            }
          >
            <ChevronLeftIcon />
          </IconButton>
          <Heading size="4">
            {DateTime.fromISO(preferredDate || today).toLocaleString(
              DateTime.DATE_HUGE
            )}
          </Heading>
          <IconButton variant="soft" color="gray" onClick={handleNext}>
            <ChevronRightIcon />
          </IconButton>
        </Flex>

        <AvailableTimeSlot day={preferredDate || today} user={user} />

        <Flex direction="column" gap="4" style={{ marginTop: 20 }}>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="outline" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              onClick={handleSubmit}
              disabled={!preferredDate || !preferredTime}
            >
              Submit Request
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

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
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import type { User } from "~/types/User";
import { UserAvatar } from "./UserAvatar";
import { AvailableTimeSlot } from "./AvailableTimeSlot";
import { usePrivateViewSettingsStore } from "~/stores/privateViewSettingsStore";
import { useSelectedSlotsStore } from "~/stores/selectedSlotsStore";
import { availableDateISO } from "~/utils/time";
import type { TimeSlot } from "~/types/Time";

interface RequestDialogProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
}

const today = DateTime.local().toISODate();

export function RequestDialog({ isOpen, user, onClose }: RequestDialogProps) {
  const openDays = usePrivateViewSettingsStore((state) => state.openDays);
  const clearSlots = useSelectedSlotsStore((state) => state.clearSlots);
  const addSlot = useSelectedSlotsStore((state) => state.addSlot);
  const selectedSlotsInStore = useSelectedSlotsStore(
    (state) => state.selectedSlots
  );

  const [preferredDate, setPreferredDate] = useState(
    availableDateISO(today, 1, openDays)
  );
  const [preferredTime, setPreferredTime] = useState([]);

  // Selected time slots
  const [selectedSlots, setSelectedSlots] =
    useState<TimeSlot[]>(selectedSlotsInStore);

  useEffect(() => {
    // Reset the form when the dialog opens
    if (
      JSON.stringify(selectedSlotsInStore) !== JSON.stringify(selectedSlots)
    ) {
      setSelectedSlots(selectedSlotsInStore);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedSlotsInStore]);

  //#region Dialog functions
  const formReset = () => {
    setPreferredDate(availableDateISO(today, 1, openDays));
    setPreferredTime([]);
  };

  const handleSubmit = () => {
    // Save the results
    clearSlots(user);
    selectedSlots.forEach((slot) => {
      addSlot(slot);
    });

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
      <Dialog.Content style={{ maxWidth: 600 }}>
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
              DateTime.fromISO(availableDateISO(today, 1, openDays) || today)
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

        <AvailableTimeSlot
          day={preferredDate || today}
          user={user}
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}
        />

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

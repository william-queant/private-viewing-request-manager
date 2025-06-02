import { Cross2Icon } from "@radix-ui/react-icons";
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

interface RequestDialogProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
}

const today = DateTime.local().toISODate();

export function RequestDialog({ isOpen, user, onClose }: RequestDialogProps) {
  const [preferredDate, setPreferredDate] = useState(today);
  const [preferredTime, setPreferredTime] = useState([]);

  const formReset = () => {
    setPreferredDate("");
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

  const handleToday = () => {
    setPreferredDate(today);
  };

  const handlePrevious = () => {
    const newDate = DateTime.fromISO(preferredDate)
      .plus({ days: -1 })
      .toISODate();
    if (newDate) {
      setPreferredDate(newDate);
    }
  };

  const handleNext = () => {
    const newDate = DateTime.fromISO(preferredDate)
      .plus({ days: 1 })
      .toISODate();
    if (newDate) {
      setPreferredDate(newDate);
    }
  };

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

        <Button
          variant="ghost"
          color="gray"
          onClick={handleToday}
          style={{ marginTop: 10 }}
        >
          Today
        </Button>

        <Button
          variant="soft"
          color="gray"
          onClick={handlePrevious}
          style={{ marginTop: 10 }}
        >
          Previous
        </Button>

        <Heading size="4">
          {DateTime.fromISO(preferredDate).toLocaleString(DateTime.DATE_HUGE)}
        </Heading>
        <Heading size="4">
          {DateTime.fromISO(preferredDate).toISODate()}
        </Heading>

        <Button
          variant="soft"
          color="gray"
          onClick={handleNext}
          style={{ marginTop: 10 }}
        >
          Next
        </Button>

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

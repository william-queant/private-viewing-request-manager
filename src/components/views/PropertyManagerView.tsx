import {
  Box,
  Button,
  Card,
  CheckboxGroup,
  Flex,
  Grid,
  Heading,
  Switch,
  Text,
} from "@radix-ui/themes";
import { Form } from "radix-ui";

import { usePrivateViewSettingsStore } from "~/stores/privateViewSettingsStore";
import { useSelectedSlotsStore } from "~/stores/selectedSlotsStore";
import type { User } from "~/types/User";
import { SelectTime } from "../SelectTime";
import { UserAvatar } from "../UserAvatar";
import { weekDays, type Day, type TimeSlot } from "~/types/Time";
import { DateTime } from "luxon";

interface PropertyManagerViewProps {
  user: User;
}

export function PropertyManagerView({ user }: PropertyManagerViewProps) {
  const { name } = user;

  //#region Private Viewing Settings
  // isPrivateViewingRequestAllowed
  const isPrivateViewingRequestAllowed = usePrivateViewSettingsStore(
    (state) => state.isRequestAllowed
  );
  const togglePrivateViewingRequestAllowed = usePrivateViewSettingsStore(
    (state) => state.toggleRequestAllowed
  );

  const handlePrivateViewingRequestAllowedChange = () => {
    togglePrivateViewingRequestAllowed();
  };

  // Open Days
  const openDays = usePrivateViewSettingsStore((state) => state.openDays);
  const toggleOpenDay = usePrivateViewSettingsStore(
    (state) => state.toggleOpenDay
  );
  const handleOpenDayToggle = (day: Day) => {
    toggleOpenDay(day);
  };

  // From Time Selection
  const getGlobalFromHour = usePrivateViewSettingsStore(
    (state) => state.globalFromHour
  );
  const setGlobalFromHour = usePrivateViewSettingsStore(
    (state) => state.setGlobalFromHour
  );
  const handleFromHourSelection = (hour: string) => {
    setGlobalFromHour(hour);
  };

  // To Time Selection
  const getGlobalToHour = usePrivateViewSettingsStore(
    (state) => state.globalToHour
  );
  const setGlobalToHour = usePrivateViewSettingsStore(
    (state) => state.setGlobalToHour
  );
  const handleToHourSelection = (hour: string) => {
    setGlobalToHour(hour);
  };
  //#endregion

  const DayCard = ({ day }: { day: Day }) => {
    const handleToggle = () => {
      handleOpenDayToggle(day);
    };
    return (
      <CheckboxGroup.Item
        value={day}
        style={{ padding: "5px" }}
        onClick={handleToggle}
      >
        <Text size="2">{day}</Text>
      </CheckboxGroup.Item>
    );
  };

  const SettingsPan = () => {
    return (
      <Box style={{ padding: "20px" }}>
        <Heading size="5" mb="4">
          Settings
        </Heading>
        <Form.Root>
          <Text size="3">Available days</Text>
          <Flex gap="2" direction={"row"} wrap="wrap">
            <CheckboxGroup.Root value={openDays} style={{ marginTop: "10px" }}>
              {weekDays.map((day) => (
                <DayCard key={day} day={day} />
              ))}
            </CheckboxGroup.Root>
          </Flex>
          <SelectTime
            name="fromTime"
            label="From"
            selectedTime={getGlobalFromHour}
            onSelectedTime={handleFromHourSelection}
          />
          <SelectTime
            name="toTime"
            label="To"
            selectedTime={getGlobalToHour}
            onSelectedTime={handleToHourSelection}
          />
        </Form.Root>
      </Box>
    );
  };
  const ViewingRequestPan = () => {
    const selectedSlots = useSelectedSlotsStore((state) => state.selectedSlots);
    const approveSlotAndRemoveOthers = useSelectedSlotsStore(
      (state) => state.approveSlotAndRemoveOthers
    );
    const refuseSlot = useSelectedSlotsStore((state) => state.refuseSlot);

    const handleApprove = (slot: TimeSlot) => {
      approveSlotAndRemoveOthers(slot);
    };

    const handleRefuse = (slot: TimeSlot) => {
      refuseSlot(slot);
    };

    // Group slots by status and then by user
    const groupSlotsByStatusAndUser = (status: "Pending" | "Booked") => {
      const filteredSlots = selectedSlots.filter(
        (slot) => slot.status === status
      );
      return filteredSlots.reduce((acc, slot) => {
        const userId = slot.user.id;
        if (!acc[userId]) {
          acc[userId] = {
            user: slot.user,
            slots: [],
          };
        }
        acc[userId].slots.push(slot);
        return acc;
      }, {} as Record<string, { user: User; slots: typeof filteredSlots }>);
    };

    const pendingSlotsByUser = groupSlotsByStatusAndUser("Pending");
    const bookedSlotsByUser = groupSlotsByStatusAndUser("Booked");

    const pendingEntries = Object.values(pendingSlotsByUser);
    const bookedEntries = Object.values(bookedSlotsByUser);

    const renderUserSlots = (
      userSlots: { user: User; slots: TimeSlot[] }[]
    ) => (
      <>
        {userSlots.map(({ user, slots }) => (
          <Card
            key={`${user.id}-${slots[0]?.status}`}
            style={{ padding: "16px" }}
          >
            {" "}
            <Flex align="center" gap="3" mb="3">
              <UserAvatar user={user} isSmall isCircle />
              <Box>
                <Text size="3" weight="bold">
                  {user.name}
                </Text>
                {slots[0]?.status === "Booked" && (
                  <>
                    <Text size="2" color="gray" style={{ display: "block" }}>
                      📞 {user.phone}
                    </Text>
                    <Text size="2" color="gray" style={{ display: "block" }}>
                      📧 {user.email}
                    </Text>
                  </>
                )}
              </Box>
            </Flex>
            <Flex direction="column" gap="2">
              {slots
                .sort(
                  (a, b) =>
                    DateTime.fromISO(`${a.day}T${a.time}:00`).toMillis() -
                    DateTime.fromISO(`${b.day}T${b.time}:00`).toMillis()
                )
                .map((slot) => (
                  <Flex key={slot.id} justify="between" align="center">
                    <Text
                      size={slot.status === "Booked" ? "3" : "2"}
                      weight={slot.status === "Booked" ? "bold" : "regular"}
                      color={slot.status === "Booked" ? "green" : "gray"}
                    >
                      {DateTime.fromISO(slot.day).toLocaleString(
                        DateTime.DATE_HUGE
                      )}{" "}
                      at {slot.time}
                    </Text>
                    <Flex align="center" gap="2">
                      {slot.status === "Booked" && (
                        <Button
                          size="1"
                          color="red"
                          variant="outline"
                          onClick={() => handleRefuse(slot)}
                        >
                          Cancel
                        </Button>
                      )}
                      {slot.status === "Pending" && (
                        <>
                          {" "}
                          <Button
                            size="1"
                            color="red"
                            variant="soft"
                            onClick={() => handleRefuse(slot)}
                          >
                            Refuse
                          </Button>
                          <Button
                            size="1"
                            color="green"
                            onClick={() => handleApprove(slot)}
                          >
                            Approve
                          </Button>
                        </>
                      )}
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          </Card>
        ))}
      </>
    );

    const hasRequests = selectedSlots.length > 0;

    return (
      <Box style={{ padding: "20px" }}>
        <Heading size="5" mb="4">
          Requests
        </Heading>

        {!hasRequests ? (
          <Heading size="3" mb="4" color="gray">
            No Viewing Requests
          </Heading>
        ) : (
          <Flex direction="column" gap="6">
            {" "}
            {/* Pending Requests Section */}
            {pendingEntries.length > 0 && (
              <Box>
                <Heading size="4" mb="3" color="orange">
                  Pending
                </Heading>
                <Flex direction="column" gap="4">
                  {renderUserSlots(pendingEntries)}
                </Flex>
              </Box>
            )}
            {/* Booked Requests Section */}
            {bookedEntries.length > 0 && (
              <Box>
                <Heading size="4" mb="3" color="green">
                  Booked
                </Heading>
                <Flex direction="column" gap="4">
                  {renderUserSlots(bookedEntries)}
                </Flex>
              </Box>
            )}
          </Flex>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <Flex align="stretch" style={{ height: "100%" }}>
        <UserAvatar user={user} isSmall isCircle />
        <Heading size="6" mb="4" style={{ marginBlock: 5, marginInline: 10 }}>
          {name}'s Viewing Request Manager
        </Heading>
      </Flex>
      {/* Viewing Requests Section */}
      <Box style={{ paddingTop: "20px" }}>
        <Card>
          <Text as="label" size="2">
            <Flex gap="2">
              <Switch
                checked={isPrivateViewingRequestAllowed}
                onCheckedChange={handlePrivateViewingRequestAllowedChange}
              />
              Allow Private Viewing Request
            </Flex>
          </Text>{" "}
          <Grid
            columns={{
              initial: "1",
              sm: isPrivateViewingRequestAllowed ? "1fr 2fr" : "1fr",
            }}
            gap="4"
            style={{ padding: "20px" }}
          >
            {isPrivateViewingRequestAllowed && <SettingsPan />}
            <ViewingRequestPan />
          </Grid>
        </Card>
      </Box>
    </Box>
  );
}

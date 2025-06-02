import {
  Box,
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
import type { User } from "~/types/User";
import { SelectTime } from "../SelectTime";
import { UserAvatar } from "../UserAvatar";
import { weekDays, type Day } from "~/types/Time";

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
    return (
      <Box style={{ padding: "20px" }}>
        <Heading size="5" mb="4">
          Requests
        </Heading>

        <Heading size="3" mb="4" color="gray">
          No Viewing Requests
        </Heading>
      </Box>
    );
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Card
        size="2"
        style={{
          minWidth: "150px",
          flex: "1 1 auto",
          padding: 0,
          overflow: "hidden",
        }}
      >
        <Flex align="stretch" style={{ height: "100%", minHeight: "70px" }}>
          <UserAvatar user={user} />
          <Box
            style={{
              flex: 1,
              paddingInline: "16px",
              paddingBlock: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Heading size="6" mb="4" style={{ marginBlock: 0 }}>
              {name}'s Viewing Manager
            </Heading>
          </Box>
        </Flex>
      </Card>
      {/* Viewing Requests Section */}
      <Box style={{ paddingBlock: "20px" }}>
        <Card>
          <Text as="label" size="2">
            <Flex gap="2">
              <Switch
                checked={isPrivateViewingRequestAllowed}
                onCheckedChange={handlePrivateViewingRequestAllowedChange}
              />
              Allow Private Viewing Request
            </Flex>
          </Text>

          <Grid
            columns={{ initial: "1", sm: "2" }}
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

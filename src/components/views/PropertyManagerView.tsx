import { Box, Switch, Flex, Heading, Text } from "@radix-ui/themes";
import { usePrivateViewSettingsStore } from "~/stores/privateViewSettingsStore";
import type { User } from "~/types/User";

interface PropertyManagerViewProps {
  user: User;
}

export function PropertyManagerView({ user }: PropertyManagerViewProps) {
  const { name } = user;

  const isPrivateViewingRequestAllowed = usePrivateViewSettingsStore(
    (state) => state.isRequestAllowed
  );
  const togglePrivateViewingRequestAllowed = usePrivateViewSettingsStore(
    (state) => state.toggleRequestAllowed
  );

  const handlePrivateViewingRequestAllowedChange = () => {
    togglePrivateViewingRequestAllowed();
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Heading size="6" mb="4">
        Property Manager Dashboard for {name}
      </Heading>

      <Text size="3" mb="6" color="gray">
        Welcome, {name}! Manage your property viewing settings below.
      </Text>

      {/* Viewing Requests Section */}
      <Box mb="6">
        {" "}
        <Text as="label" size="2">
          <Flex gap="2">
            <Switch
              checked={isPrivateViewingRequestAllowed}
              onCheckedChange={handlePrivateViewingRequestAllowedChange}
            />
            Allow Private Viewing Request
          </Flex>
        </Text>
      </Box>
    </Box>
  );
}

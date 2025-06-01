import { Box, Button, Heading, Text } from "@radix-ui/themes";
import { usePrivateViewSettingsStore } from "~/stores/privateViewSettingsStore";
import type { User } from "~/types/User";

interface PotentialTenantViewProps {
  user: User;
}

export function PotentialTenantView({ user }: PotentialTenantViewProps) {
  const { name } = user;

  const isPrivateViewingRequestAllowed = usePrivateViewSettingsStore(
    (state) => state.isRequestAllowed
  );

  const requestLabel = isPrivateViewingRequestAllowed
    ? "Request a Private Viewing"
    : "Private Viewing are not possible at the moment";

  return (
    <Box style={{ padding: "20px" }}>
      <Heading size="6" mb="4">
        Tenant Dashboard
      </Heading>

      <Text size="3" mb="6" color="gray">
        Welcome, {name}! Manage your viewing requests and applications below.
      </Text>

      {/* Viewing Requests Section */}
      <Box mb="6">
        <Heading size="4" mb="3">
          My Viewing Requests
        </Heading>

        <Button
          size="4"
          variant="solid"
          mb="3"
          disabled={!isPrivateViewingRequestAllowed}
        >
          {requestLabel}
        </Button>
      </Box>
    </Box>
  );
}

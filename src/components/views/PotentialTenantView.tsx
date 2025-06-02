import { Box, Flex, Heading, Card, Text, Badge, Grid } from "@radix-ui/themes";
import type { User } from "~/types/User";
import { UserAvatar } from "../UserAvatar";
import { PropertyDetails } from "./PropertyDetail";
import { RequestDialog } from "../RequestDialog";
import { useSelectedSlotsStore } from "~/stores/selectedSlotsStore";
import { useUserStore } from "~/stores/userStore";
import { useState } from "react";
import { DateTime } from "luxon";

interface PotentialTenantViewProps {
  user: User;
}

export function PotentialTenantView({ user }: PotentialTenantViewProps) {
  const { name } = user;

  const [isDialogOpened, setIsDialogOpened] = useState(false);
  // Get user's approved booking
  const selectedSlots = useSelectedSlotsStore((state) => state.selectedSlots);
  const userApprovedSlot = selectedSlots.find(
    (slot) => slot.user.id === user.id && slot.status === "Booked"
  );

  // Get property manager details
  const users = useUserStore((state) => state.users);
  const propertyManager = users.find((u) => u.role === "Property Manager");

  const handleRequestButtonClick = () => {
    setIsDialogOpened(true);
  };

  const handleRequestDialogClose = () => {
    setIsDialogOpened(false);
  };
  // Approved booking card component
  const ApprovedBookingCard = () => (
    <Card
      style={{
        backgroundColor: "var(--green-a3)",
        border: "2px solid var(--green-a6)",
        boxShadow: "0 4px 12px var(--green-a4)",
      }}
    >
      <Flex direction="column" gap="4" p="5">
        <Flex align="center" gap="3">
          <Badge color="green" variant="solid" size="2">
            ✓ Approved
          </Badge>
          <Text size="4" weight="bold" color="green">
            Your Private Viewing is Confirmed!
          </Text>
        </Flex>

        <Grid
          columns={{ initial: "1", sm: "2" }}
          gap="16px"
          width="auto"
          align={"stretch"}
        >
          <Box
            style={{
              backgroundColor: "var(--green-a2)",
              padding: "12px",
              borderRadius: "var(--radius-3)",
              border: "1px solid var(--green-a5)",
            }}
          >
            <Text size="2" color="gray" mb="2">
              📅 Scheduled Date & Time:
            </Text>
            <Text
              size="4"
              weight="bold"
              color="green"
              style={{ display: "block" }}
            >
              {DateTime.fromISO(userApprovedSlot!.day).toLocaleString(
                DateTime.DATE_HUGE
              )}
            </Text>
            <Text size="3" weight="medium" color="green">
              🕐 {userApprovedSlot!.time}
            </Text>{" "}
          </Box>

          <Box
            style={{
              backgroundColor: "var(--gray-a2)",
              padding: "12px",
              borderRadius: "var(--radius-3)",
              border: "1px solid var(--gray-a4)",
            }}
          >
            {propertyManager && (
              <Flex align="center" gap="3" mb="3" style={{ margin: 0 }}>
                <UserAvatar user={propertyManager} isCircle />
                <Flex direction="column">
                  <Text
                    size="3"
                    weight="bold"
                    color="gray"
                    style={{ display: "block" }}
                  >
                    {propertyManager?.name} (Property Manager)
                  </Text>
                  <Text size="2" color="gray">
                    📞 {propertyManager?.phone}
                  </Text>
                  <Text size="2" color="gray">
                    📧 {propertyManager?.email}
                  </Text>
                </Flex>
              </Flex>
            )}
          </Box>
        </Grid>

        <Box
          style={{
            backgroundColor: "var(--blue-a2)",
            padding: "12px",
            borderRadius: "var(--radius-3)",
            border: "1px solid var(--blue-a4)",
          }}
        >
          <Text size="2" color="blue" weight="medium">
            💡 Please arrive on time for your private viewing. We look forward
            to seeing you!
          </Text>
        </Box>
      </Flex>
    </Card>
  );
  return (
    <Box>
      <RequestDialog
        isOpen={isDialogOpened}
        user={user}
        onClose={handleRequestDialogClose}
      />
      <Flex align="stretch" style={{ height: "100%" }}>
        <UserAvatar user={user} isSmall isCircle />
        <Heading size="6" mb="4" style={{ marginBlock: 5, marginInline: 10 }}>
          {name}'s Property Detail
        </Heading>
      </Flex>{" "}
      <Box style={{ paddingTop: "20px" }}>
        {userApprovedSlot ? (
          <Flex direction="column" gap="4">
            <ApprovedBookingCard />
            <PropertyDetails />
          </Flex>
        ) : (
          <PropertyDetails onClick={handleRequestButtonClick} />
        )}
      </Box>
    </Box>
  );
}

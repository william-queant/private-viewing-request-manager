import { Badge, Box, Button, Card, Heading, Text } from "@radix-ui/themes";
import { usePrivateViewSettingsStore } from "~/stores/privateViewSettingsStore";
import type { User } from "~/types/User";
import PropertyPhoto from "~/assets/property-photo.jpg";
import PropertyDescription from "~/assets/property-description.png";

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
    : "Private Viewings are not possible at the moment";

  return (
    <Box style={{ padding: "20px" }}>
      <Heading size="6" mb="4">
        Property listing for {name}
      </Heading>

      <Card style={{ backgroundColor: "var(--color-background)" }}>
        <img
          src={PropertyPhoto}
          alt="A house in a forest"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "300px",
            borderRadius: "var(--radius-2)",
          }}
        />
        <Badge
          variant="solid"
          radius="full"
          size={"2"}
          style={{ marginBlock: 10 }}
        >
          House
        </Badge>
        <Heading size="6" mb="4">
          Bright 2-Bedroom Apartment with Dedicated Car Park
        </Heading>
        <Heading size="4" mb="4" color="gray">
          31 Allen Street
        </Heading>
        <Text size="3" mb="6">
          This spacious 2-bedroom apartment features a dedicated car park,
          perfect for those who value convenience and comfort. Enjoy the bright
          and airy living spaces with modern amenities.
        </Text>
        <img
          src={PropertyDescription}
          alt="A house in a forest"
          style={{
            objectFit: "contain",
            padding: 20,
          }}
        />
        <Button
          style={{
            width: "100%",
          }}
          size="4"
          variant="solid"
          mb="3"
          disabled={!isPrivateViewingRequestAllowed}
        >
          {requestLabel}
        </Button>
      </Card>
    </Box>
  );
}

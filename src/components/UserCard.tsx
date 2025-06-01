import { Box, Card, Text, Flex } from "@radix-ui/themes";
import type { User } from "~/types/User";
import { UserAvatar } from "./UserAvatar";

interface PropertyManagerCardProps {
  user: User;
}

export function PropertyManagerCard({ user }: PropertyManagerCardProps) {
  const { name, role } = user;

  return (
    <Card
      size="2"
      style={{
        minWidth: "150px",
        flex: "1 1 auto",
        maxWidth: "330px",
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
          <Text as="div" size="4" weight="bold" style={{ marginBottom: "4px" }}>
            {name}
          </Text>
          <Text as="div" size="2" color="gray" style={{ marginBottom: "2px" }}>
            {role}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}

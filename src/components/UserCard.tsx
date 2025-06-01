import { Box, Card, Text, Avatar, Flex } from "@radix-ui/themes";
import type { User } from "~/types/User";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card
      size="2"
      style={{
        minWidth: "250px",
        flex: "1 1 auto",
        maxWidth: "350px",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Flex align="stretch" style={{ height: "100%", minHeight: "120px" }}>
        <Avatar
          size="6"
          src={user.image}
          fallback={user.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
          radius="none"
          style={{
            flexShrink: 0,
            width: "120px",
            height: "100%",
            borderRadius: "0",
            objectFit: "cover",
          }}
        />
        <Box
          style={{
            flex: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text as="div" size="4" weight="bold" style={{ marginBottom: "4px" }}>
            {user.name}
          </Text>
          <Text as="div" size="2" color="blue" style={{ marginBottom: "2px" }}>
            {user.role}
          </Text>
          <Text as="div" size="1" color="gray" style={{ marginBottom: "1px" }}>
            {user.phone}
          </Text>
          <Text as="div" size="1" color="gray">
            {user.email}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}

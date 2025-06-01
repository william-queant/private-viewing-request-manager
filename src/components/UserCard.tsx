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
        minWidth: "200px",
        flex: "1 1 auto",
        maxWidth: "300px",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Flex align="stretch" style={{ height: "100%", minHeight: "70px" }}>
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
            width: "70px",
            height: "100%",
            borderRadius: "0",
            objectFit: "cover",
          }}
        />
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
            {user.name}
          </Text>
          <Text as="div" size="2" color="gray" style={{ marginBottom: "2px" }}>
            {user.role}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}

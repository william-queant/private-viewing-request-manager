import { Box, Card, Text, Flex } from "@radix-ui/themes";
import type { UserCard } from "~/types/User";
import { UserAvatar } from "./UserAvatar";
import { scrollToUser } from "~/utils/users";

export function UserCard({ user, onClick }: UserCard) {
  const { id, name, role } = user;

  const handleClick = () => {
    scrollToUser(id, onClick);
  };

  return (
    <Card
      size="2"
      style={{
        minWidth: "150px",
        flex: "1 1 auto",
        padding: 0,
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={handleClick}
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

import { Box, Container } from "@radix-ui/themes";
import type { User } from "~/types/User";

interface UserPageWrapperProps {
  children: React.ReactNode;
  user: User;
}

export function UserPageWrapper({ children, user }: UserPageWrapperProps) {
  const { id } = user;

  return (
    <Box
      id={`page-${id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: "100vw",
        backgroundColor: "var(--gray-a2)",
        borderRadius: "none",
        padding: "16px",
      }}
    >
      <Container size="3">{children}</Container>
    </Box>
  );
}

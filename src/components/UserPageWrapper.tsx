import { Box, Container, Heading } from "@radix-ui/themes";
import type { User } from "~/types/User";

interface UserPageWrapperProps {
  children: React.ReactNode;
  user: User;
}

export function UserPageWrapper({ children, user }: UserPageWrapperProps) {
  const { id, name } = user;

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
      <Container size="3">
        <Heading mb="2" size="3">
          This is the {name}'s screen...
        </Heading>
        {children}
      </Container>
    </Box>
  );
}

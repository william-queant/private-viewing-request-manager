import { Box, Text, Container, Section, Card, Spinner } from "@radix-ui/themes";
import { useEffect } from "react";
import { withStickyBanner } from "~/components/StickyBanner";
import { UserBanner } from "~/components/UserBanner";
import { useUserStore } from "~/stores/userStore";

// Create the sticky banner component using the HOC
const StickyUserBanner = withStickyBanner(UserBanner);

function App() {
  const users = useUserStore((state) => state.users);
  const isLoading = useUserStore((state) => state.isLoading);
  const loadUsersAsync = useUserStore((state) => state.loadUsersAsync);

  // Load users with avatars on component mount
  useEffect(() => {
    loadUsersAsync();
  }, [loadUsersAsync]);
  return (
    <Box>
      {/* Sticky Banner */}
      <StickyUserBanner users={users} />

      {/* Global Loading Indicator */}
      {isLoading && (
        <Box
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            backgroundColor: "var(--color-background)",
            border: "1px solid var(--gray-6)",
            borderRadius: "var(--radius-3)",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 1000,
            boxShadow: "var(--shadow-4)",
          }}
        >
          <Spinner size="1" />
          <Text size="2" color="gray">
            Loading avatars...
          </Text>
        </Box>
      )}

      {/* Main Content */}
      <Container size="4" px="4">
        <Section py="9">
          <Box>
            <Text
              size="8"
              weight="bold"
              mb="4"
              style={{ fontSize: "var(--font-size-8)", display: "block" }}
            >
              Welcome to Our Platform
            </Text>
            <Text size="4" color="gray" mb="6">
              This is a responsive page built with Radix UI following best
              practices. The banner above is sticky and contains user cards that
              adapt to different screen sizes.
            </Text>

            {/* Demo content to show scrolling */}
            {Array.from({ length: 20 }, (_, i) => (
              <Card key={i} style={{ marginBottom: "1rem", padding: "1rem" }}>
                <Text
                  size="5"
                  weight="medium"
                  style={{ marginBottom: "0.5rem", display: "block" }}
                >
                  Content Section {i + 1}
                </Text>
                <Text size="3" color="gray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </Card>
            ))}
          </Box>
        </Section>
      </Container>
    </Box>
  );
}

export default App;

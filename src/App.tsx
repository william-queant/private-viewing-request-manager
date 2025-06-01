import { Box, Text } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import { withStickyBanner } from "~/components/StickyBanner";
import { UserBanner } from "~/components/UserBanner";
import { useUserStore } from "~/stores/userStore";
import { UserPageWrapper } from "~/components/UserPageWrapper";

// Create the sticky banner component using the HOC
const StickyUserBanner = withStickyBanner(UserBanner);

function App() {
  const users = useUserStore((state) => state.users);
  const loadUsersAsync = useUserStore((state) => state.loadUsersAsync);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to scroll to Ava's screen (Property Manager)
  // This is the first user in the list, assumed to be the Property Manager
  const scrollToAva = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  // Load users with avatars on component mount
  useEffect(() => {
    loadUsersAsync();
  }, [loadUsersAsync]);

  // Scroll to Ava's screen (Property Manager) on resize
  useEffect(() => {
    window.addEventListener("resize", scrollToAva);
    return () => window.removeEventListener("resize", scrollToAva);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Sticky Banner */}
      <StickyUserBanner users={users} />{" "}
      {/* Main Content - Horizontal Scrolling Container */}
      <Box
        ref={scrollContainerRef}
        style={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {Array.from(users, (user) => (
          <UserPageWrapper key={`page-${user.id}`} user={user}>
            <Text size="6" weight="bold" mb="4">
              test
            </Text>
          </UserPageWrapper>
        ))}
      </Box>
    </Box>
  );
}

export default App;

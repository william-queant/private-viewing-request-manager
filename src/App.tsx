import { Box, Text, Container, Section, Card } from "@radix-ui/themes";
import AvaWrightImage from "~/assets/AvaWright.jpg";
import RyanFoxImage from "~/assets/RyanFox.jpg";
import SallyMasonImage from "~/assets/SallyMason.jpg";
import type { User } from "~/types/User";
import { withStickyBanner } from "~/components/StickyBanner";
import { UserBanner } from "~/components/UserBanner";

const users: User[] = [
  {
    name: "Ava Wright",
    image: AvaWrightImage,
    role: "Property Manager",
    phone: "+64 21 456 7890",
    email: "ava.wright@gmail.com",
  },
  {
    name: "Ryan Fox",
    image: RyanFoxImage,
    role: "Potential Tenant 1",
    phone: "+64 27 123 4567",
    email: "ryan.fox@gmail.com",
  },
  {
    name: "Sally Mason",
    image: SallyMasonImage,
    role: "Potential Tenant 2",
    phone: "+64 22 987 6543",
    email: "sally.mason@gmail.com",
  },
];

// Create the sticky banner component using the HOC
const StickyUserBanner = withStickyBanner(UserBanner);

function App() {
  return (
    <Box>
      {/* Sticky Banner */}
      <StickyUserBanner users={users} />

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

import { Box, Text, Flex, Container, Section, Card } from "@radix-ui/themes";
import AvaWrightImage from "~/assets/AvaWright.jpg";
import RyanFoxImage from "~/assets/RyanFox.jpg";
import SallyMasonImage from "~/assets/SallyMason.jpg";
import type { User } from "~/types/User";
import { UserCard } from "~/components/UserCard";

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

function App() {
  return (
    <Box>
      {/* Sticky Banner */}
      <Box
        position="sticky"
        top="0"
        style={{
          backgroundColor: "var(--color-background)",
          borderBottom: "1px solid var(--gray-6)",
          zIndex: 100,
          backdropFilter: "blur(8px)",
        }}
      >
        <Container size="4" px="4" py="3">
          <Flex gap="4" justify="center" wrap="wrap">
            {users.map((user) => (
              <UserCard key={user.name} user={user} />
            ))}
          </Flex>
        </Container>
      </Box>

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

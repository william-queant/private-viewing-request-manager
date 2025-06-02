import { Box, Flex, Heading } from "@radix-ui/themes";
import type { User } from "~/types/User";
import { UserAvatar } from "../UserAvatar";
import { PropertyDetails } from "./propertyDetail";
import { RequestDialog } from "../RequestDialog";
import { useState } from "react";

interface PotentialTenantViewProps {
  user: User;
}

export function PotentialTenantView({ user }: PotentialTenantViewProps) {
  const { name } = user;

  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const handleRequestButtonClick = () => {
    console.log(`Request button clicked for ${name}`);
    setIsDialogOpened(true);
  };

  const handleRequestDialogClose = () => {
    console.log(`Request dialog closed for ${name}`);
    setIsDialogOpened(false);
  };

  return (
    <Box>
      <RequestDialog
        isOpen={isDialogOpened}
        user={user}
        onClose={handleRequestDialogClose}
      />

      <Flex align="stretch" style={{ height: "100%" }}>
        <UserAvatar user={user} isSmall isCircle />
        <Heading size="6" mb="4" style={{ marginBlock: 5, marginInline: 10 }}>
          {name}'s Property Detail
        </Heading>
      </Flex>

      <Box style={{ paddingTop: "20px" }}>
        <PropertyDetails onClick={handleRequestButtonClick} />
      </Box>
    </Box>
  );
}

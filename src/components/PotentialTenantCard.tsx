import type { User } from "~/types/User";
import { UserAvatar } from "./UserAvatar";
import { Card } from "@radix-ui/themes/src/index.js";

interface PotentialTenantCardProps {
  user: User;
}

export function PotentialTenantCard({ user }: PotentialTenantCardProps) {
  return (
    <Card
      size="2"
      style={{
        maxWidth: "70px",
        height: "70px",
        flex: "1 1 auto",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <UserAvatar user={user} />
    </Card>
  );
}

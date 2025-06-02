import type { UserCard } from "~/types/User";
import { UserAvatar } from "./UserAvatar";
import { Card } from "@radix-ui/themes/src/index.js";
import { scrollToUser } from "~/utils/users";

export function UserAvatarCard({ user, onClick }: UserCard) {
  const { id } = user;

  const handleClick = () => {
    scrollToUser(id, onClick);
  };

  return (
    <Card
      size="2"
      style={{
        maxWidth: "70px",
        height: "70px",
        flex: "1 1 auto",
        padding: 0,
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <UserAvatar user={user} />
    </Card>
  );
}

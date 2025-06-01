import { Flex } from "@radix-ui/themes";
import type { User } from "~/types/User";
import { UserCard } from "./UserCard";

interface UserBannerProps {
  users: User[];
}

export function UserBanner({ users }: UserBannerProps) {
  return (
    <Flex gap="4" justify="center" wrap="wrap">
      {users.map((user) => (
        <UserCard key={user.name} user={user} />
      ))}
    </Flex>
  );
}

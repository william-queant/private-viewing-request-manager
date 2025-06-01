import type { User } from "~/types/User";
import { Avatar, Box, Spinner } from "@radix-ui/themes";
import { getInitials } from "~/utils/users";
import type { ReactElement } from "react";

interface UserAvatarProps {
  user: User;
}

const AvatarBox = ({ children }: { children: ReactElement }) => (
  <Box
    style={{
      flexShrink: 0,
      width: "70px",
      height: "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--gray-2)",
      overflow: "hidden",
    }}
  >
    {children}
  </Box>
);

export function UserAvatar({ user }: UserAvatarProps) {
  const { image, name } = user;

  // Check if the image is a loaded URL (contains path separators or protocols) vs just a filename
  const isImageLoaded =
    image.includes("/") ||
    image.startsWith("http") ||
    image.startsWith("blob:") ||
    image.startsWith("data:");

  if (!isImageLoaded) {
    return (
      <AvatarBox>
        <Spinner size="2" />
      </AvatarBox>
    );
  }

  return (
    <AvatarBox>
      <Avatar
        style={{
          flexShrink: 0,
          width: "70px",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--gray-2)",
        }}
        src={image}
        radius="none"
        fallback={getInitials(name)}
      />
    </AvatarBox>
  );
}

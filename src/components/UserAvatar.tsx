import type { User } from "~/types/User";
import { Avatar, Box, Spinner } from "@radix-ui/themes";
import { getInitials } from "~/utils/users";
import type { ReactElement } from "react";

interface UserAvatarProps {
  user: User;
  isCircle?: boolean;
  isSmall?: boolean;
}

const AvatarBox = ({
  isSmall,
  children,
}: {
  isSmall?: boolean;
  children: ReactElement;
}) => (
  <Box
    style={{
      flexShrink: 0,
      width: isSmall ? "40px" : "70px",
      height: "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    {children}
  </Box>
);

export function UserAvatar({
  user,
  isSmall = false,
  isCircle = false,
}: UserAvatarProps) {
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
    <AvatarBox isSmall={isSmall}>
      <Avatar
        style={{
          flexShrink: 0,
          width: isSmall ? "40px" : "70px",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        src={image}
        radius={isCircle ? "full" : "none"}
        fallback={getInitials(name)}
      />
    </AvatarBox>
  );
}

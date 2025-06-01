import { Box, Card, Text, Avatar, Flex, Spinner } from "@radix-ui/themes";
import React, { useState } from "react";
import type { User } from "~/types/User";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  // Check if the image is a loaded URL (contains path separators or protocols) vs just a filename
  const isImageLoaded =
    user.image.includes("/") ||
    user.image.startsWith("http") ||
    user.image.startsWith("blob:") ||
    user.image.startsWith("data:");

  // Reset loading state when user.image changes
  React.useEffect(() => {
    if (isImageLoaded) {
      setImageLoading(true);
    }
  }, [user.image, isImageLoaded]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };

  return (
    <Card
      size="2"
      style={{
        minWidth: "200px",
        flex: "1 1 auto",
        maxWidth: "300px",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Flex align="stretch" style={{ height: "100%", minHeight: "70px" }}>
        {" "}
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
          }}
        >
          {imageLoading && isImageLoaded && <Spinner size="2" />}
          {isImageLoaded && (
            <Avatar
              size="6"
              src={user.image}
              fallback={user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
              radius="none"
              style={{
                width: "70px",
                height: "100%",
                borderRadius: "0",
                objectFit: "cover",
                opacity: imageLoading ? 0 : 1,
                transition: "opacity 0.3s ease",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          {!isImageLoaded && <Spinner size="2" />}
        </Box>
        <Box
          style={{
            flex: 1,
            paddingInline: "16px",
            paddingBlock: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text as="div" size="4" weight="bold" style={{ marginBottom: "4px" }}>
            {user.name}
          </Text>
          <Text as="div" size="2" color="gray" style={{ marginBottom: "2px" }}>
            {user.role}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}

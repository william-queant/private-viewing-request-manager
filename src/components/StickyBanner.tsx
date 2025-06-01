import { Box, Container } from "@radix-ui/themes";
import type { ComponentType } from "react";

export function withStickyBanner<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function StickyBannerHOC(props: P) {
    return (
      <Box
        position="sticky"
        top="0"
        style={{
          borderBottom: "1px solid var(--gray-6)",
          backgroundColor: "var(--color-background)",
          zIndex: 100,
        }}
      >
        <Container size="3" px="4" py="3">
          <WrappedComponent {...props} />
        </Container>
      </Box>
    );
  };
}

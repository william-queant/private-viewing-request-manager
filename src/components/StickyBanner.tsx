import { Box, Container } from "@radix-ui/themes";
import type { ComponentType } from "react";

interface StickyBannerOptions {
  backgroundColor?: string;
  borderColor?: string;
  zIndex?: number;
  blur?: string;
}

export function withStickyBanner<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: StickyBannerOptions = {}
) {
  const {
    backgroundColor = "var(--color-background)",
    borderColor = "var(--gray-6)",
    zIndex = 100,
    blur = "blur(8px)",
  } = options;

  return function StickyBannerHOC(props: P) {
    return (
      <Box
        position="sticky"
        top="0"
        style={{
          backgroundColor,
          borderBottom: `1px solid ${borderColor}`,
          zIndex,
          backdropFilter: blur,
        }}
      >
        <Container size="4" px="4" py="3">
          <WrappedComponent {...props} />
        </Container>
      </Box>
    );
  };
}

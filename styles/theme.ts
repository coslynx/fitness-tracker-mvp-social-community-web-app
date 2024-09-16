import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.900",
        fontFamily: "body",
        fontWeight: "normal",
      },
      a: {
        color: "blue.500",
        textDecoration: "none",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default theme;
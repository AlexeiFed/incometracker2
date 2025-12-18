export const designTokens = {
  colors: {
    primary: "#4CAF50",
    primaryDark: "#45a049",
    secondary: "#2196F3",
    background: "#f0f4f8",
    surface: "#ffffff",
    text: {
      primary: "#212121",
      secondary: "#757575",
      light: "#ffffff",
    },
    border: "#e0e0e0",
    error: "#f44336",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 2px 4px rgba(0, 0, 0, 0.1)",
    lg: "0 4px 8px rgba(0, 0, 0, 0.15)",
  },
  breakpoints: {
    mobile: "375px",
    tablet: "768px",
    desktop: "1024px",
  },
} as const;


import { ThemeDefinition } from "./types";
import { ThemeOptions } from "@mui/material/styles";

/* -------------------------------------------------------------------------- */
/* 🧱 Default Presets                                                         */
/* -------------------------------------------------------------------------- */
export const defaultPresets: ThemeDefinition[] = [
  {
    id: "light",
    name: "Light",
    description: "Default light theme",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "light",
        primary: { main: "#1976d2" },
        secondary: { main: "#f50057" },
        background: { default: "#fafafa", paper: "#ffffff" },
        text: { primary: "#111", secondary: "#333" },
      },
      typography: {
        fontFamily: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ].join(","),
        h5: { fontWeight: 600 },
        subtitle2: { letterSpacing: 0.2 },
      },
      shape: { borderRadius: 10 },
      spacing: 8,
      components: {
        MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
        MuiButton: { defaultProps: { variant: "contained" } },
      },
    },
  },
  {
    id: "dark",
    name: "Dark",
    description: "Default dark theme",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "dark",
        primary: { main: "#90caf9" },
        secondary: { main: "#f48fb1" },
        background: { default: "#121212", paper: "#1e1e1e" },
      },
      typography: {
        fontFamily: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ].join(","),
        h5: { fontWeight: 600 },
      },
      shape: { borderRadius: 12 },
      shadows: ["none", ...Array(24).fill("none")] as ThemeOptions["shadows"],
      components: {
        MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      },
    },
  },
];

/* -------------------------------------------------------------------------- */
/* 💼 Professional Presets                                                    */
/* -------------------------------------------------------------------------- */
export const professionalPresets: ThemeDefinition[] = [
  {
    id: "slate",
    name: "Slate",
    description: "Professional dark theme with teal accents",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "dark",
        primary: { main: "#26a69a" },
        secondary: { main: "#ffca28" },
        background: { default: "#1b1e24", paper: "#23272f" },
        text: { primary: "#e0e0e0", secondary: "#9e9e9e" },
        divider: "#2c313a",
      },
      typography: {
        fontFamily: [
          "Inter",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ].join(","),
        button: { textTransform: "none", fontWeight: 600 },
        subtitle2: { fontWeight: 600 },
      },
      shape: { borderRadius: 12 },
      spacing: 8,
      components: {
        MuiPaper: {
          styleOverrides: {
            root: { backgroundImage: "none", border: "1px solid #2c313a" },
          },
        },
        MuiButton: {
          styleOverrides: { root: { borderRadius: 12 } },
        },
        MuiSlider: {
          styleOverrides: { thumb: { boxShadow: "none" } },
        },
      },
    },
  },
  {
    id: "solarized",
    name: "Solarized",
    description: "Classic developer palette with calm contrast",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "light",
        primary: { main: "#268bd2" },
        secondary: { main: "#2aa198" },
        background: { default: "#fdf6e3", paper: "#eee8d5" },
        text: { primary: "#657b83", secondary: "#586e75" },
      },
      typography: {
        fontFamily: "'JetBrains Mono', monospace",
        h5: { fontWeight: 500 },
      },
      components: {
        MuiPaper: { styleOverrides: { root: { borderRadius: 4 } } },
      },
    },
  },
];

/* -------------------------------------------------------------------------- */
/* 🌇 Vibrant Presets                                                         */
/* -------------------------------------------------------------------------- */
export const vibrantPresets: ThemeDefinition[] = [
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm oranges and purple tones with gradient buttons",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "dark",
        primary: { main: "#ff7043" },
        secondary: { main: "#ba68c8" },
        background: { default: "#2b1d29", paper: "#3a2738" },
        text: { primary: "#fff3e0", secondary: "#ffe0b2" },
      },
      typography: {
        fontFamily: "Georgia, serif",
        h5: { fontWeight: 700 },
        button: { textTransform: "uppercase", fontWeight: 700 },
      },
      shape: { borderRadius: 6 },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 6,
              letterSpacing: 1,
              textTransform: "none",
            },
            contained: {
              backgroundImage: "linear-gradient(45deg,#ff7043,#ffca28)",
              color: "#000",
              "&:hover": {
                backgroundImage: "linear-gradient(45deg,#ff8a65,#ffd54f)",
                color: "#000",
              },
            },
            outlined: {
              borderColor: "#ffb74d",
              color: "#ffb74d",
              "&:hover": {
                borderColor: "#ffd54f",
                color: "#ffd54f",
                background: "rgba(255, 183, 77, 0.08)",
              },
            },
          },
        },
      },
    },
  },
  {
    id: "sunrise",
    name: "Sunrise",
    description: "Light warm tones with orange and purple accent",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "light",
        primary: { main: "#ff7043" },
        secondary: { main: "#8e24aa" },
        background: { default: "#fff8f5", paper: "#ffffff" },
        text: { primary: "#3e2723", secondary: "#6d4c41" },
      },
    },
  },
  {
    id: "cyber",
    name: "Cyber",
    description: "Neon green futuristic cyberpunk style",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "dark",
        primary: { main: "#00e676" },
        secondary: { main: "#00e676" },
        background: { default: "#0a0a0f", paper: "#111116" },
        text: { primary: "#e0e0e0", secondary: "#8e8e8e" },
      },
    },
  },
];

/* -------------------------------------------------------------------------- */
/* 🌿 Natural Presets                                                         */
/* -------------------------------------------------------------------------- */
export const naturalPresets: ThemeDefinition[] = [
  {
    id: "emerald",
    name: "Emerald",
    description: "Nature-inspired greens with calm light tones",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "light",
        primary: { main: "#2e7d32" },
        secondary: { main: "#81c784" },
        background: { default: "#f1f8e9", paper: "#ffffff" },
        text: { primary: "#1b5e20", secondary: "#33691e" },
      },
      typography: { fontFamily: "'Nunito', sans-serif", h5: { fontWeight: 600 } },
      shape: { borderRadius: 16 },
      components: {
        MuiPaper: { styleOverrides: { root: { border: "1px solid #c5e1a5" } } },
      },
    },
  },
  {
    id: "arctic",
    name: "Arctic",
    description: "Cool blues with glassy paper and frosted look",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "light",
        primary: { main: "#0288d1" },
        secondary: { main: "#26c6da" },
        background: { default: "#e1f5fe", paper: "#ffffffd9" },
        text: { primary: "#01579b", secondary: "#0277bd" },
      },
      shape: { borderRadius: 20 },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backdropFilter: "blur(8px)",
              backgroundImage: "linear-gradient(145deg, #e1f5fecc, #ffffffcc)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: { borderRadius: 20, textTransform: "none", fontWeight: 600 },
          },
        },
      },
    },
  },
  {
    id: "sakura",
    name: "Sakura",
    description: "Pastel pink & white with elegant serif typography",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "light",
        primary: { main: "#ec407a" },
        secondary: { main: "#f48fb1" },
        background: { default: "#fff0f5", paper: "#ffffff" },
        text: { primary: "#4a148c", secondary: "#6a1b9a" },
      },
      typography: {
        fontFamily: "'Playfair Display', serif",
        h5: { fontWeight: 700, fontStyle: "italic" },
      },
      shape: { borderRadius: 14 },
      components: {
        MuiPaper: {
          styleOverrides: { root: { border: "1px solid #f8bbd0" } },
        },
      },
    },
  },
];

/* -------------------------------------------------------------------------- */
/* 🧪 Experimental Presets                                                    */
/* -------------------------------------------------------------------------- */
export const experimentalPresets: ThemeDefinition[] = [
  {
    id: "terminal",
    name: "Terminal",
    description: "Hacker green-on-black retro terminal look",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "dark",
        primary: { main: "#00ff00" },
        secondary: { main: "#00bfa5" },
        background: { default: "#000000", paper: "#0a0a0a" },
        text: { primary: "#00ff00", secondary: "#00cc99" },
      },
      typography: {
        fontFamily: "'Source Code Pro', monospace",
        h5: { fontWeight: 600 },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 0,
              fontFamily: "'Source Code Pro', monospace",
              border: "1px solid #00ff00",
            },
          },
        },
      },
    },
  },
];

/* -------------------------------------------------------------------------- */
/* 🌐 All Presets Combined                                                    */
/* -------------------------------------------------------------------------- */
export const allPresets: ThemeDefinition[] = [
  ...defaultPresets,
  ...professionalPresets,
  ...vibrantPresets,
  ...naturalPresets,
  ...experimentalPresets,
];

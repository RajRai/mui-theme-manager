import { ThemeDefinition } from "./types";

export const defaultPresets: ThemeDefinition[] = [
  {
    id: "light",
    name: "Light",
    description: "Default light theme",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "light",
        primary: {
          main: "#1976d2"
        },
        secondary: {
          main: "#9c27b0"
        }
      }
    }
  },
  {
    id: "dark",
    name: "Dark",
    description: "Default dark theme",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "dark",
        primary: {
          main: "#90caf9"
        },
        secondary: {
          main: "#f48fb1"
        },
        background: {
          default: "#121212",
          paper: "#1e1e1e"
        }
      }
    }
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Blue and teal accent theme",
    isPreset: true,
    themeOptions: {
      palette: {
        mode: "light",
        primary: {
          main: "#006064"
        },
        secondary: {
          main: "#00838f"
        }
      }
    }
  }
];

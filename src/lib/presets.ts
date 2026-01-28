import {ThemeDefinition} from "./types";
import {ThemeOptions} from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

/* -------------------------------------------------------------------------- */
/* 🧱 Default Presets                                                         */
/* -------------------------------------------------------------------------- */
export const dark: ThemeDefinition = {
    id: "dark",
    name: "Dark",
    description: "Default dark theme",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "dark",
            primary: {main: "#90caf9"},
            secondary: {main: "#f48fb1"},
            background: {default: "#121212", paper: "#1e1e1e"},
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
            h5: {fontWeight: 600},
        },
        shape: {borderRadius: 12},
        shadows: ["none", ...Array(24).fill("none")] as ThemeOptions["shadows"],
        components: {
            MuiPaper: {styleOverrides: {root: {backgroundImage: "none"}}},
        },
    },
};

export const light: ThemeDefinition = {
    id: "light",
    name: "Light",
    description: "Default light theme",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "light",
            primary: {main: "#1976d2"},
            secondary: {main: "#f50057"},
            background: {default: "#fafafa", paper: "#ffffff"},
            text: {primary: "#111", secondary: "#333"},
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
            h5: {fontWeight: 600},
            subtitle2: {letterSpacing: 0.2},
        },
        shape: {borderRadius: 10},
        spacing: 8,
        components: {
            MuiPaper: {styleOverrides: {root: {borderRadius: 12}}},
            MuiButton: {defaultProps: {variant: "contained"}},
        },
    },
};

export const defaultPresets: ThemeDefinition[] = [dark, light];

/* -------------------------------------------------------------------------- */
/* 💼 Professional Presets                                                    */
/* -------------------------------------------------------------------------- */
export const slate: ThemeDefinition = {
    id: "slate",
    name: "Slate",
    description: "Professional dark theme with teal accents",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "dark",
            primary: {main: "#26a69a"},
            secondary: {main: "#ffca28"},
            background: {default: "#1b1e24", paper: "#23272f"},
            text: {primary: "#e0e0e0", secondary: "#9e9e9e"},
            divider: "#2c313a",
        },
        typography: {
            fontFamily: ["Inter", "SF Pro Text", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
            button: {textTransform: "none", fontWeight: 600},
            subtitle2: {fontWeight: 600},
        },
        shape: {borderRadius: 12},
        spacing: 8,
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {backgroundImage: "none", border: "1px solid #2c313a"},
                },
            },
            MuiButton: {styleOverrides: {root: {borderRadius: 12}}},
            MuiSlider: {styleOverrides: {thumb: {boxShadow: "none"}}},
        },
    },
};

export const solarized: ThemeDefinition = {
    id: "solarized",
    name: "Solarized",
    description: "Classic developer palette with calm contrast",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "light",
            primary: {main: "#268bd2"},
            secondary: {main: "#2aa198"},
            background: {default: "#fdf6e3", paper: "#eee8d5"},
            text: {primary: "#657b83", secondary: "#586e75"},
        },
        typography: {
            fontFamily: "'JetBrains Mono', monospace",
            h5: {fontWeight: 500},
        },
        components: {
            MuiPaper: {styleOverrides: {root: {borderRadius: 4}}},
        },
    },
};

export const professionalPresets: ThemeDefinition[] = [slate, solarized];

/* -------------------------------------------------------------------------- */
/* 🌇 Vibrant Presets                                                         */
/* -------------------------------------------------------------------------- */
export const sunset: ThemeDefinition = {
    id: "sunset",
    name: "Sunset",
    description: "Warm oranges and purple tones with gradient buttons",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "dark",
            primary: {main: "#ff7043"},
            secondary: {main: "#ba68c8"},
            background: {default: "#2b1d29", paper: "#3a2738"},
            text: {primary: "#fff3e0", secondary: "#ffe0b2"},
        },
        typography: {
            fontFamily: "Georgia, serif",
            h5: {fontWeight: 700},
            button: {textTransform: "uppercase", fontWeight: 700},
        },
        shape: {borderRadius: 6},
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
};

export const sunrise: ThemeDefinition = {
    id: "sunrise",
    name: "Sunrise",
    description: "Light warm tones with orange and purple accent",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "light",
            primary: {main: "#ff7043"},
            secondary: {main: "#8e24aa"},
            background: {default: "#fff8f5", paper: "#ffffff"},
            text: {primary: "#3e2723", secondary: "#6d4c41"},
        },
    },
};

export const cyber: ThemeDefinition = {
    id: "cyber",
    name: "Cyber",
    description: "Neon green futuristic cyberpunk style",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "dark",
            primary: {main: "#00e676"},
            secondary: {main: "#00e676"},
            background: {default: "#0a0a0f", paper: "#111116"},
            text: {primary: "#e0e0e0", secondary: "#8e8e8e"},
        },
    },
};

export const vibrantPresets: ThemeDefinition[] = [sunset, sunrise, cyber];

/* -------------------------------------------------------------------------- */
/* 🌿 Natural Presets                                                         */
/* -------------------------------------------------------------------------- */
export const emerald: ThemeDefinition = {
    id: "emerald",
    name: "Emerald",
    description: "Nature-inspired greens with calm light tones",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "light",
            primary: {main: "#2e7d32"},
            secondary: {main: "#81c784"},
            background: {default: "#f1f8e9", paper: "#ffffff"},
            text: {primary: "#1b5e20", secondary: "#33691e"},
        },
        typography: {fontFamily: "'Nunito', sans-serif", h5: {fontWeight: 600}},
        shape: {borderRadius: 16},
        components: {
            MuiPaper: {styleOverrides: {root: {border: "1px solid #c5e1a5"}}},
        },
    },
};

export const arctic: ThemeDefinition = {
    id: "arctic",
    name: "Arctic",
    description: "Cool blues with glassy paper and frosted look",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "light",
            primary: {main: "#0288d1"},
            secondary: {main: "#26c6da"},
            background: {default: "#e1f5fe", paper: "#ffffffd9"},
            text: {primary: "#01579b", secondary: "#0277bd"},
        },
        shape: {borderRadius: 20},
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
                    root: {borderRadius: 20, textTransform: "none", fontWeight: 600},
                },
            },
        },
    },
};

export const sakura: ThemeDefinition = {
    id: "sakura",
    name: "Sakura",
    description: "Pastel pink & white with elegant serif typography",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "light",
            primary: {main: "#ec407a"},
            secondary: {main: "#f48fb1"},
            background: {default: "#fff0f5", paper: "#ffffff"},
            text: {primary: "#4a148c", secondary: "#6a1b9a"},
        },
        typography: {
            fontFamily: "'Playfair Display', serif",
            h5: {fontWeight: 700, fontStyle: "italic"},
        },
        shape: {borderRadius: 14},
        components: {
            MuiPaper: {styleOverrides: {root: {border: "1px solid #f8bbd0"}}},
        },
    },
};

export const naturalPresets: ThemeDefinition[] = [emerald, arctic, sakura];

/* -------------------------------------------------------------------------- */
/* 🧊 Glass Presets                                                           */
/* -------------------------------------------------------------------------- */

const bluePrimary = "#1F5FFF";
const bluePrimaryDark = "#0D3CCB";
const bluePrimaryLight = "#5A8CFF";

const greenSecondary = "#52E000";
const greenSecondaryDark = "#2EA800";
const greenSecondaryLight = "#86FF3B";

export const glassDark: ThemeDefinition = {
    id: "glass-dark",
    name: "Glass (Dark)",
    description: "Dark glass theme (blurred surfaces + subtle borders).",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "dark",
            primary: {
                main: bluePrimary,
                dark: bluePrimaryDark,
                light: bluePrimaryLight,
                contrastText: "#FFFFFF",
            },
            secondary: {
                main: greenSecondary,
                dark: greenSecondaryDark,
                light: greenSecondaryLight,
                contrastText: "#0A0A0A",
            },
            background: {
                default: "#070A12",
                paper: "rgba(255,255,255,0.06)",
            },
            divider: "rgba(255,255,255,0.10)",
            text: {
                primary: "rgba(255,255,255,0.92)",
                secondary: "rgba(255,255,255,0.72)",
            },
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
            h5: {fontWeight: 650},
        },
        shape: {borderRadius: 18},
        shadows: ["none", ...Array(24).fill("none")] as ThemeOptions["shadows"],
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: "#04060A", // near-black, slightly cool

                        backgroundImage: [
                            // very subtle blue accent (brand DNA, not dominant)
                            "radial-gradient(circle at 30% 35%, rgba(72, 112, 255, 0.12), rgba(72, 112, 255, 0) 65%)",

                            // secondary faint cyan lift to avoid flatness
                            "radial-gradient(circle at 70% 60%, rgba(32, 214, 255, 0.06), rgba(32, 214, 255, 0) 65%)",

                            // neutral lift so glass borders read
                            "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.04), rgba(255,255,255,0) 55%)",

                            // strong vignette for depth
                            "radial-gradient(1200px 600px at 50% 0%, rgba(255,255,255,0.05), rgba(0,0,0,0.0) 55%), radial-gradient(900px 600px at 50% 100%, rgba(0,0,0,0.55), rgba(0,0,0,0.95) 70%)",
                        ].join(","),

                        backgroundSize: "auto, auto, auto, auto",
                        backgroundPosition: "left top, right bottom, center top, center",
                        backgroundRepeat: "no-repeat, no-repeat, no-repeat, no-repeat",
                        backgroundAttachment: "fixed",
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {root: {borderColor: "rgba(255,255,255,0.10)"}},
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: "rgba(255,255,255,0.80)",
                        "&.Mui-focused": {color: "rgba(255,255,255,0.92)"},
                        "&.Mui-disabled": {color: "rgba(255,255,255,0.45)"},
                    },
                },
            },

            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: "rgba(255,255,255,0.80)",
                        "&.Mui-focused": {color: "rgba(255,255,255,0.92)"},
                        "&.MuiInputLabel-shrink": {color: "rgba(255,255,255,0.82)"},
                    },
                },
            },

            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 14,

                        // make the field itself darker/steadier so text reads
                        backgroundColor: "rgba(0,0,0,0.26)",

                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255,255,255,0.26)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255,255,255,0.34)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(90, 140, 255, 0.70)", // your bluePrimaryLight, but as a border
                        },

                        // selected value / input text
                        "& .MuiOutlinedInput-input": {
                            color: "rgba(255,255,255,0.92)",
                            fontWeight: 600,
                        },
                    },
                },
            },

            MuiSelect: {
                styleOverrides: {
                    icon: {color: "rgba(255,255,255,0.80)"},
                    select: {color: "rgba(255,255,255,0.92)"},
                },
            },

            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        fontWeight: 650,
                        borderRadius: 14,
                    },

                    // text buttons default to brand blue; make them readable on blue glass
                    textPrimary: {
                        color: "rgba(255,255,255,0.88)",
                        paddingLeft: 10,
                        paddingRight: 10,
                    },

                    // also cover "text" with no explicit color
                    text: {
                        color: "rgba(255,255,255,0.88)",
                    },

                    outlined: {
                        borderColor: "rgba(255,255,255,0.22)",
                        color: "rgba(255,255,255,0.90)",
                        backgroundColor: "rgba(0,0,0,0.18)",
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: "rgba(255,255,255,0.86)",
                        borderRadius: 14,
                        "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.06)",
                        },
                        "&:active": {
                            backgroundColor: "rgba(255,255,255,0.10)",
                        },
                        "&.Mui-disabled": {
                            color: "rgba(255,255,255,0.35)",
                        },
                    },
                },
            },
            MuiAppBar: {
                defaultProps: {elevation: 0, color: "transparent"},
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        borderBottom: "1px solid rgba(255,255,255,0.12)", // slightly stronger
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                    },
                },
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {color: "rgba(255,255,255,0.92)"},
                },
            },
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        "--DataGrid-containerBackground": "rgba(255,255,255,0.06)",
                        "--DataGrid-pinnedBackground": "rgba(255,255,255,0.06)",
                        "--DataGrid-rowBorderColor": "rgba(255,255,255,0.10)",
                        "--DataGrid-borderColor": "rgba(255,255,255,0.10)",

                        "& .MuiDataGrid-columnHeaderTitle": {
                            color: "rgba(255,255,255,0.92)",
                            fontWeight: 700,
                        },
                        "& .MuiDataGrid-iconButtonContainer, & .MuiDataGrid-menuIcon": {
                            color: "rgba(255,255,255,0.82)",
                        },

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "rgba(255,255,255,0.06) !important",
                            borderBottom: "1px solid rgba(255,255,255,0.10)",
                        },
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    root: {
                        backgroundColor: "rgba(10, 14, 24, 0.6)", // darker, steadier
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                    },
                    indicator: {
                        height: 3,
                        borderRadius: 3,
                        backgroundColor: "rgba(90,140,255,0.6)",
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: 700,
                        textTransform: "none",
                        minHeight: 36,
                    },
                },
            },
        },
    },
}

export const glassLight: ThemeDefinition = {
    id: "glass-light",
    name: "Glass",
    description: "Glass theme (blurred surfaces + subtle borders).",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "light",
            primary: {
                main: bluePrimary,
                dark: bluePrimaryDark,
                light: bluePrimaryLight,
                contrastText: "#FFFFFF",
            },
            secondary: {
                main: greenSecondaryDark,
                dark: "#1F7A00",
                light: greenSecondaryLight,
                contrastText: "#FFFFFF",
            },
            background: {
                default: "#F6F8FC",
                paper: "rgba(255,255,255,0.72)",
            },
            divider: "rgba(15,23,42,0.12)",
            text: {
                primary: "rgba(15,23,42,0.92)",
                secondary: "rgba(15,23,42,0.70)",
            },
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
            h5: {fontWeight: 650},
        },
        shape: {borderRadius: 16},
        shadows: ["none", ...Array(24).fill("none")] as ThemeOptions["shadows"],
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: "#F6F8FC",
                        backgroundImage: [
                            "radial-gradient(circle at 30% 25%, rgba(72, 112, 255, 0.25), rgba(72, 112, 255, 0) 60%)",
                            "radial-gradient(circle at 65% 70%, rgba(32, 214, 255, 0.18), rgba(32, 214, 255, 0) 60%)",
                            // REMOVED the grid:
                            // "linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
                        ].join(","),
                        backgroundSize: "auto, auto",
                        backgroundPosition: "left top, right bottom",
                        backgroundRepeat: "no-repeat, no-repeat",
                        backgroundAttachment: "fixed",
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        backgroundColor: "rgba(255,255,255,0.72)",
                        border: "1px solid rgba(15,23,42,0.10)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        backgroundColor: "rgba(255,255,255,0.72)",
                        border: "1px solid rgba(15,23,42,0.10)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        boxShadow: "0 10px 30px rgba(2, 6, 23, 0.10)",
                    },
                },
            },
            MuiAppBar: {
                defaultProps: {elevation: 0, color: "transparent"},
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        backgroundColor: "rgba(255,255,255,0.60)",
                        borderBottom: "1px solid rgba(15,23,42,0.10)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        color: "rgba(15,23,42,0.92)",
                    },
                },
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {color: "rgba(15,23,42,0.92)"},
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        fontWeight: 650,
                        borderRadius: 14,
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 14,
                        backgroundColor: "rgba(255,255,255,0.55)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(15,23,42,0.16)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(15,23,42,0.24)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(31,95,255,0.55)",
                        },
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {root: {borderColor: "rgba(15,23,42,0.12)"}},
            },
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        // Header row background + borders via grid CSS vars
                        "--DataGrid-containerBackground": "rgba(255,255,255,0.72)",
                        "--DataGrid-pinnedBackground": "rgba(255,255,255,0.72)",
                        "--DataGrid-rowBorderColor": "rgba(15,23,42,0.10)",
                        "--DataGrid-borderColor": "rgba(15,23,42,0.10)",

                        // Text/icons in header
                        "& .MuiDataGrid-columnHeaderTitle": {
                            color: "rgba(15,23,42,0.92)",
                            fontWeight: 700,
                        },
                        "& .MuiDataGrid-iconButtonContainer, & .MuiDataGrid-menuIcon": {
                            color: "rgba(15,23,42,0.70)",
                        },

                        // Force header surface even if something else overrides it
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "rgba(255,255,255,0.72) !important",
                            borderBottom: "1px solid rgba(15,23,42,0.10)",
                        },
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    root: {
                        backgroundColor: "rgba(255,255,255,0.4)", // more opaque
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                    },
                    indicator: {
                        borderRadius: 0,
                        backgroundColor: "rgba(31,95,255,0.4)",
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        color: "rgba(15,23,42,0.4)",
                        fontWeight: 700,
                        textTransform: "none",
                        minHeight: 36,
                    },
                },
            },
        },
    },
}

export const glassPresets = [glassDark, glassLight];

/* -------------------------------------------------------------------------- */
/* 🧪 Experimental Presets                                                    */
/* -------------------------------------------------------------------------- */
export const terminal: ThemeDefinition = {
    id: "terminal",
    name: "Terminal",
    description: "Hacker green-on-black retro terminal look",
    isPreset: true,
    themeOptions: {
        palette: {
            mode: "dark",
            primary: {main: "#00ff00"},
            secondary: {main: "#00bfa5"},
            background: {default: "#000000", paper: "#0a0a0a"},
            text: {primary: "#00ff00", secondary: "#00cc99"},
        },
        typography: {
            fontFamily: "'Source Code Pro', monospace",
            h5: {fontWeight: 600},
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
};

export const experimentalPresets: ThemeDefinition[] = [terminal];

/* -------------------------------------------------------------------------- */
/* 🌐 All Presets Combined                                                    */
/* -------------------------------------------------------------------------- */
export const allPresets: ThemeDefinition[] = [
    ...glassPresets,
    ...defaultPresets,
    ...professionalPresets,
    ...vibrantPresets,
    ...naturalPresets,
    ...experimentalPresets,
];

/* -------------------------------------------------------------------------- */
/* ✅ Optional: handy map for lookup by id                                     */
/* -------------------------------------------------------------------------- */
// export const presetsById: Record<string, ThemeDefinition> = Object.fromEntries(
//   allPresets.map((p) => [p.id, p])
// );

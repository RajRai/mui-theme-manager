import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid,
    Box,
    Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeDefinition } from "../types";
import {
    ColorSwatch,
    getColorFromDraft,
    setColorOnDraft,
} from "./ColorPickerGrid";

export interface AdvancedColorSectionProps {
    draft: ThemeDefinition;
    onChange: (draft: ThemeDefinition) => void;
    disabled?: boolean;
}

const ADVANCED_COLOR_FIELDS = [
    { group: "Contrast", label: "Primary contrast", path: "palette.primary.contrastText", fallback: "#ffffff" },
    { group: "Contrast", label: "Secondary contrast", path: "palette.secondary.contrastText", fallback: "#ffffff" },

    { group: "Background", label: "Background default", path: "palette.background.default", fallback: "#121212" },
    { group: "Background", label: "Background paper", path: "palette.background.paper", fallback: "#1e1e1e" },

    { group: "Text", label: "Text primary", path: "palette.text.primary", fallback: "#ffffff" },
    { group: "Text secondary", path: "palette.text.secondary", fallback: "#bdbdbd" },

    { group: "Status", label: "Error", path: "palette.error.main", fallback: "#d32f2f" },
    { group: "Status", label: "Warning", path: "palette.warning.main", fallback: "#ed6c02" },
    { group: "Status", label: "Info", path: "palette.info.main", fallback: "#0288d1" },
    { group: "Status", label: "Success", path: "palette.success.main", fallback: "#2e7d32" },
];

export const AdvancedColorSection: React.FC<AdvancedColorSectionProps> = ({
                                                                              draft,
                                                                              onChange,
                                                                              disabled = false,
                                                                          }) => {
    const groups = ADVANCED_COLOR_FIELDS.reduce((acc, f) => {
        acc[f.group] ||= [];
        acc[f.group].push(f);
        return acc;
    }, {} as Record<string, typeof ADVANCED_COLOR_FIELDS>);

    return (
        <Accordion
            sx={{ mt: 2, opacity: disabled ? 0.5 : 1 }}
            disabled={disabled}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ pointerEvents: disabled ? "none" : "auto" }}
            >
                <Typography variant="subtitle2">Advanced Colors</Typography>
            </AccordionSummary>

            <AccordionDetails>
                {Object.entries(groups).map(([group, fields]) => (
                    <Box key={group} sx={{ mb: 3 }}>
                        <Typography
                            variant="caption"
                            sx={{ textTransform: "uppercase", opacity: 0.6, mb: 1 }}
                        >
                            {group}
                        </Typography>

                        <Grid container spacing={2}>
                            {fields.map((f) => (
                                <Grid key={f.path} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                                    <Stack spacing={0.5}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {f.label}
                                        </Typography>

                                        <ColorSwatch
                                            disabled={disabled}
                                            value={getColorFromDraft(
                                                draft,
                                                f.path,
                                                f.fallback
                                            )}
                                            onChange={(v) =>
                                                !disabled &&
                                                onChange(setColorOnDraft(draft, f.path, v))
                                            }
                                        />
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

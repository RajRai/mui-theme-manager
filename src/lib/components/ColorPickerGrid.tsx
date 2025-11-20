import React from "react";
import {
    Typography,
    Box,
    Stack,
} from "@mui/material";
import { ThemeDefinition } from "../types";

export interface ColorPickerGridProps {
    draft: ThemeDefinition;
    onChange: (draft: ThemeDefinition) => void;
}

export function getColorFromDraft(
    draft: ThemeDefinition,
    path: string,
    fallback: string
): string {
    const segments = path.split(".");
    let current: any = draft.themeOptions;
    for (const segment of segments) {
        if (current && typeof current === "object" && segment in current) {
            current = current[segment];
        } else {
            return fallback;
        }
    }
    return typeof current === "string" ? current : fallback;
}

export function setColorOnDraft(
    draft: ThemeDefinition,
    path: string,
    value: string
): ThemeDefinition {
    const segments = path.split(".");
    const nextDraft: ThemeDefinition = {
        ...draft,
        themeOptions: { ...draft.themeOptions },
    };
    let current: any = nextDraft.themeOptions;
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        if (i === segments.length - 1) {
            current[segment] = value;
        } else {
            current[segment] = current[segment] ? { ...current[segment] } : {};
            current = current[segment];
        }
    }
    return nextDraft;
}

const COLOR_FIELDS: { label: string; path: string; fallback: string }[] = [
    { label: "Primary Color", path: "palette.primary.main", fallback: "#1976d2" },
    { label: "Secondary Color", path: "palette.secondary.main", fallback: "#9c27b0" },
];

export const ColorSwatch: React.FC<{
    value: string;
    onChange: (v: string) => void;
}> = ({ value, onChange }) => (
    <Box
        sx={{
            width: 48,
            height: 32,
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            cursor: "pointer",
        }}
    >
        <Box
            component="input"
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            sx={{
                width: "150%",
                height: "150%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: "transparent",
            }}
        />
    </Box>
);

export const ColorPickerGrid: React.FC<ColorPickerGridProps> = ({
                                                                    draft,
                                                                    onChange,
                                                                }) => {
    const mode =
        (draft.themeOptions as any)?.palette?.mode === "dark" ? "dark" : "light";

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = event.target.value;
        const nextDraft = setColorOnDraft(draft, "palette.mode", newMode);
        onChange(nextDraft);
    };

    return (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Basic Colors
            </Typography>

            <Stack
                direction="row"
                spacing={4}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
            >
                {COLOR_FIELDS.map((field) => (
                    <Box key={field.path}>
                        <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
                            {field.label}
                        </Typography>
                        <ColorSwatch
                            value={getColorFromDraft(draft, field.path, field.fallback)}
                            onChange={(v) => onChange(setColorOnDraft(draft, field.path, v))}
                        />
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

import React, { useState } from "react";
import {
    Stack,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    Typography,
    Tooltip,
    InputLabel, SelectProps, FormControlProps,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useThemeManager } from "../ThemeManagerContext";

export const ThemeSelector: React.FC<{
    id?: string,
    selectProps?: SelectProps,
    formControlProps?: FormControlProps
}> = ({ id = '', selectProps, formControlProps }) => {
    const {
        presets,
        customThemes,
        activeThemeId,
        activeTheme,
        setActiveTheme,
        deleteCustomTheme,
        onEditTheme,
        setPreviewTheme
    } = useThemeManager();

    const allThemes = [...presets, ...customThemes];
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 200 }} {...formControlProps}>
                {/* Empty label so spacing stays consistent */}
                <InputLabel shrink={false}> </InputLabel>

                <Select
                    value={activeThemeId}
                    onChange={(e) => {
                        setActiveTheme(e.target.value as string)
                        setPreviewTheme(undefined)
                    }}
                    onOpen={() => setMenuOpen(true)}
                    onClose={() => setMenuOpen(false)}
                    renderValue={(value) => {
                        const theme = allThemes.find((t) => t.id === value);
                        return <Typography>{theme?.name ?? "Unknown theme"}</Typography>;
                    }}
                    {...selectProps}
                >
                    {allThemes.map((theme) => (
                        <MenuItem key={theme.id} value={theme.id}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                width="100%"
                            >
                                <Typography>{theme.name}</Typography>

                                {/* Only show edit/delete when dropdown is open */}
                                {menuOpen && !theme.isPreset && (
                                    <Stack direction="row" spacing={0.5}>
                                        <Tooltip title="Edit theme">
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    onEditTheme(theme, id);
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Delete theme">
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    deleteCustomTheme(theme.id);
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                )}
                            </Stack>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
};

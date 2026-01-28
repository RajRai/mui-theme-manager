import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
    Stack,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    Typography,
    Tooltip,
    InputLabel, FormControlProps, SelectProps,
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
        setActiveTheme,
        deleteCustomTheme,
        onEditTheme,
        setPreviewTheme,
    } = useThemeManager();

    const allThemes = useMemo(() => [...presets, ...customThemes], [presets, customThemes]);
    const activeName = useMemo(
        () => allThemes.find((t) => t.id === activeThemeId)?.name ?? "Unknown theme",
        [allThemes, activeThemeId]
    );

    const [menuOpen, setMenuOpen] = useState(false);

    // measure label
    const measureRef = useRef<HTMLSpanElement | null>(null);
    const [minPx, setMinPx] = useState(120); // just initial render fallback

    useLayoutEffect(() => {
        const el = measureRef.current;
        if (!el) return;

        const ro = new ResizeObserver(() => {
            // + 64ish = select padding + caret + a little breathing room
            const w = Math.ceil(el.getBoundingClientRect().width) + 64;
            setMinPx(Math.min(w, 200)); // don't let min exceed max
        });

        ro.observe(el);
        return () => ro.disconnect();
    }, [activeName]);

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            {/* hidden measurer */}
            <Typography
                ref={measureRef}
                variant="body2"
                sx={{
                    position: "absolute",
                    visibility: "hidden",
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                    fontWeight: 400,
                }}
            >
                {activeName}
            </Typography>

            <FormControl
                size="small"
                sx={{
                    width: `clamp(${minPx}px, 20vw, 200px)`,
                }}
                {...formControlProps}
            >
                <InputLabel shrink={false}> </InputLabel>

                <Select
                    fullWidth
                    value={activeThemeId}
                    onChange={(e) => {
                        setActiveTheme(e.target.value as string);
                        setPreviewTheme(undefined);
                    }}
                    onOpen={() => setMenuOpen(true)}
                    onClose={() => setMenuOpen(false)}
                    renderValue={() => <Typography noWrap>{activeName}</Typography>}
                    {...selectProps}
                >
                    {allThemes.map((theme) => (
                        <MenuItem key={theme.id} value={theme.id}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                                <Typography noWrap>{theme.name}</Typography>

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

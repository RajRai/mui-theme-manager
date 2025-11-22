// ThemeEditor.tsx
import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    TextField,
    Stack,
    Divider,
    Button,
    FormControlLabel,
    Switch,
    Typography,
    RadioGroup,
    Radio,
} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {ThemeDefinition} from "../types";
import {ColorPickerGrid, setColorOnDraft} from "./ColorPickerGrid";
import {AdvancedColorSection} from "./AdvancedColorSection";
import {AdvancedJsonEditor} from "./AdvancedJsonEditor";
import {useThemeManager} from "../ThemeManagerContext";

/** cheap deep clone without refs */
function deepClone<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
}

export type ThemeEditorProps = {
    /** Controlled draft value */
    value: ThemeDefinition;
    /** Controlled change callback */
    onChange?: (next: ThemeDefinition) => void;

    /** Optional: show internal Save/Cancel row */
    showActions?: boolean;
    onSave?: (draft: ThemeDefinition) => void;
    onCancel?: () => void;

    /** Optional JSON error string to show under JSON editor */
    jsonError?: string;

    /** Called with raw JSON text whenever it changes */
    onJsonChangeRaw?: (json: string) => void;

    /** Live preview callback (when toggle is ON and changes happen) */
    onLivePreview?: (draft: ThemeDefinition) => void;

    /** Initial toggle state for "Live Editing" */
    defaultLiveEditing?: boolean;
};

export const ThemeEditor: React.FC<ThemeEditorProps> = ({
                                                            value,
                                                            onChange,
                                                            showActions = true,
                                                            onSave,
                                                            onCancel,
                                                            jsonError,
                                                            onJsonChangeRaw,
                                                            onLivePreview: onLivePreviewProp,
                                                            defaultLiveEditing = false
                                                        }) => {
    const { setPreviewTheme, updateCustomTheme, createCustomTheme, customThemes } = useThemeManager();

    const isReadOnly = value.isPreset === true;

    const [liveEditing, setLiveEditing] = useState(defaultLiveEditing);
    const [localDraft, setLocalDraft] = useState<ThemeDefinition>(deepClone(value));

    const onLivePreview = (draft: ThemeDefinition) => {
        onLivePreviewProp?.(draft)
        if (draft) {
            setPreviewTheme(draft);
        }
    };

    useEffect(() => {
        if (liveEditing){
            onLivePreview(localDraft);
        } else {
            setPreviewTheme(undefined);
        }
    }, [liveEditing]);

    useEffect(() => {
        setLocalDraft(value);
    }, [value.id]);

    const handleDraftChange = (updated: ThemeDefinition, byUser = true) => {
        if (isReadOnly) return;
        setLocalDraft(updated);
        onChange?.(updated);
        if (byUser && liveEditing) {
            onLivePreview(updated);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleDraftChange({ ...localDraft, name: event.target.value });
    };

    const mode =
        (localDraft.themeOptions as any)?.palette?.mode === "dark"
            ? "dark"
            : "light";

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isReadOnly) return;
        const newMode = event.target.value;
        delete localDraft.themeOptions.palette?.background;
        handleDraftChange(setColorOnDraft(localDraft, "palette.mode", newMode));
    };

    const lastValidThemeOptions = useRef(localDraft.themeOptions);

    const handleJsonChange = (json: string) => {
        if (isReadOnly) return;
        onJsonChangeRaw?.(json);
        try {
            const parsed = JSON.parse(json);
            createTheme(parsed); // validate
            lastValidThemeOptions.current = parsed;
            handleDraftChange({ ...localDraft, themeOptions: parsed }, true);
        } catch { /* ignore */ }
    };

    return (
        <Box sx={{ mt: 1, p: 2 }}>
            <Stack spacing={1.8}>
                <TextField
                    label="Name"
                    fullWidth
                    disabled={isReadOnly}
                    value={localDraft.name}
                    onChange={handleNameChange}
                />

                {/* Theme Mode */}
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Theme Mode
                    </Typography>
                    <RadioGroup
                        row
                        value={mode}
                        onChange={handleModeChange}
                        sx={{ ml: 1 }}
                    >
                        <FormControlLabel
                            value="light"
                            control={<Radio disabled={isReadOnly} />}
                            label="Light"
                        />
                        <FormControlLabel
                            value="dark"
                            control={<Radio disabled={isReadOnly} />}
                            label="Dark"
                        />
                    </RadioGroup>
                </Box>

                {/* Colors / Advanced Colors */}
                <ColorPickerGrid
                    draft={localDraft}
                    onChange={handleDraftChange}
                    disabled={isReadOnly}
                />

                <AdvancedColorSection
                    draft={localDraft}
                    onChange={handleDraftChange}
                    disabled={isReadOnly}
                />

                {/* JSON Editor */}
                <AdvancedJsonEditor
                    draft={localDraft}
                    jsonError={jsonError}
                    onJsonChange={handleJsonChange}
                    disabled={isReadOnly}
                />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack
                direction="row"
                justifyContent={showActions ? "space-between" : "flex-start"}
                alignItems="center"
                sx={{ pt: 1 }}
            >
                <FormControlLabel
                    control={
                        <Switch
                            checked={liveEditing}
                            disabled={isReadOnly}
                            onChange={(e) => setLiveEditing(e.target.checked)}
                        />
                    }
                    label="Live Editing"
                />

                {showActions && (
                    <Stack direction="row" spacing={2}>
                        {onCancel && (
                            <Button variant="outlined" onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                        {(
                            <Button
                                variant="contained"
                                onClick={() => {
                                    onSave?.(localDraft)
                                    if (customThemes.find(theme => theme.id === localDraft.id)){
                                        updateCustomTheme(localDraft.id, localDraft);
                                    } else {
                                        createCustomTheme(localDraft)
                                    }
                                }}
                                disabled={isReadOnly}
                            >
                                Save Theme
                            </Button>
                        )}
                    </Stack>
                )}
            </Stack>
        </Box>
    );
};

// ThemeEditorContents.tsx
import React, { useState, useRef, useEffect } from "react";
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
import { ThemeDefinition } from "../types";
import { ColorPickerGrid, setColorOnDraft } from "./ColorPickerGrid";
import { AdvancedColorSection } from "./AdvancedColorSection";
import { AdvancedJsonEditor } from "./AdvancedJsonEditor";
import { createTheme } from "@mui/material/styles";

export const ThemeEditorContents: React.FC<{
    draft: ThemeDefinition;
    jsonError?: string;
    onDraftChange: (draft: ThemeDefinition) => void;
    onJsonChange: (json: string) => void;
    onSave?: () => void;
    onCancel?: () => void;
    onLiveUpdate?: (draft: ThemeDefinition) => void;
}> = ({
          draft,
          jsonError,
          onDraftChange,
          onJsonChange,
          onSave,
          onCancel,
          onLiveUpdate,
      }) => {
    const [liveEditing, setLiveEditing] = useState(false);
    const [localDraft, setLocalDraft] = useState(draft);
    const userEditing = useRef(false);

    // Keep localDraft in sync when the outer draft changes (e.g. reverting)
    useEffect(() => {
        setLocalDraft(draft);
    }, [draft]);

    // --- Single unified handler for any draft mutation ---
    const handleDraftChange = (updated: ThemeDefinition, triggeredByUser = true) => {
        setLocalDraft(updated);
        onDraftChange(updated);

        // If live editing is on, push to provider
        if (liveEditing && onLiveUpdate && triggeredByUser) {
            onLiveUpdate(updated);
        }
    };

    // --- When live editing is turned ON, immediately apply current draft ---
    useEffect(() => {
        if (liveEditing && onLiveUpdate) {
            onLiveUpdate(localDraft);
        }
    }, [liveEditing]); // run once when toggled

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleDraftChange({ ...localDraft, name: event.target.value });
    };

    const mode =
        (localDraft.themeOptions as any)?.palette?.mode === "dark" ? "dark" : "light";

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = event.target.value;
        handleDraftChange(setColorOnDraft(localDraft, "palette.mode", newMode));
    };

    const lastValidThemeOptions = useRef(localDraft.themeOptions);
    // --- Handle JSON editor changes safely ---
    const handleJsonChange = (json: string) => {
        onJsonChange(json); // always pass raw text up for display

        try {
            // Try to parse JSON first
            const parsed = JSON.parse(json);

            // Try to create a theme — but safely catch any runtime issue
            let valid = false;
            try {
                createTheme(parsed);
                valid = true;
            } catch {
                valid = false;
            }

            if (valid) {
                lastValidThemeOptions.current = parsed;
                handleDraftChange({ ...localDraft, themeOptions: parsed }, true);
            } else {
                // just log and ignore invalid themes
                console.warn("Theme JSON parsed but not valid for MUI");
            }
        } catch {
            // JSON was syntactically invalid — ignore
        }
    };



    return (
        <Box sx={{ mt: 1, p: 2 }}>
            <Stack spacing={1.8}>
                <TextField
                    label="Name"
                    fullWidth
                    value={localDraft.name}
                    onChange={handleNameChange}
                />

                {/* --- Mode selector --- */}
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
                        <FormControlLabel value="light" control={<Radio />} label="Light" />
                        <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                    </RadioGroup>
                </Box>

                {/* --- Basic and Advanced color sections --- */}
                <ColorPickerGrid draft={localDraft} onChange={handleDraftChange} />
                <AdvancedColorSection draft={localDraft} onChange={handleDraftChange} />

                {/* --- Raw JSON Editor --- */}
                <AdvancedJsonEditor
                    draft={localDraft}
                    jsonError={jsonError}
                    onJsonChange={handleJsonChange}
                />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ pt: 1 }}
            >
                <FormControlLabel
                    control={
                        <Switch
                            checked={liveEditing}
                            onChange={(e) => setLiveEditing(e.target.checked)}
                        />
                    }
                    label="Live Editing"
                />

                <Stack direction="row" spacing={2}>
                    {onCancel && (
                        <Button variant="outlined" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                    {onSave && (
                        <Button variant="contained" onClick={onSave}>
                            Save Theme
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};

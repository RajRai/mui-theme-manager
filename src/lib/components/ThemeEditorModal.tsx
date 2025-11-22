// ThemeEditorModal.tsx
import React, {useEffect, useMemo, useRef, useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {ThemeEditor} from "./ThemeEditorContents";
import {ThemeDefinition} from "../types";
import {useThemeManager} from "../ThemeManagerContext";

/** cheap deep clone without refs */
function deepClone<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
}

export type ThemeEditorModalProps = {
    /** Base theme to seed a "create" flow */
    baseThemeForCreate?: ThemeDefinition;

    /** Called with the final draft on save */
    onSave?: (draft: ThemeDefinition) => void;

    /** Close handler (both Cancel and after Save should likely call this) */
    onClose?: () => void;

    /** Optional: show the editor's built-in Save/Cancel buttons (defaults true in a modal) */
    showActions?: boolean;

    /** Optional: initial live-editing toggle default */
    defaultLiveEditing?: boolean;

    /** Optional: bubble raw JSON text upward (e.g., show errors externally) */
    onJsonChangeRaw?: (json: string) => void;

    /** Optional: provide json error string for the JSON editor */
    jsonError?: string;

    /** Optional: live preview callback */
    onLivePreview?: (draft: ThemeDefinition) => void;
};

export const ThemeEditorModal: React.FC<ThemeEditorModalProps> = ({
                                                                      baseThemeForCreate,
                                                                      onSave,
                                                                      onClose,
                                                                      showActions = true,
                                                                      defaultLiveEditing,
                                                                      onJsonChangeRaw,
                                                                      jsonError,
                                                                      onLivePreview,
                                                                  }) => {

    const { activeTheme, customThemes, onEditTheme, editingTheme, updateCustomTheme, setPreviewTheme } = useThemeManager();
    const open = !!editingTheme.theme;
    const newTheme = !customThemes.find(theme => theme?.id === editingTheme.theme?.id)

    const createSeed: ThemeDefinition = useMemo(() => {
        if (baseThemeForCreate) {
            const newIdBase = baseThemeForCreate.name.toLowerCase().replace(/\s+/g, "-");
            return {
                ...deepClone(baseThemeForCreate),
                id: `${newIdBase}-${Date.now()}`,
                name: "",
                isPreset: false,
            };
        }
        // bare minimum fallback if no base theme provided
        return {
            id: `custom-${Date.now()}`,
            name: "",
            isPreset: false,
            themeOptions: activeTheme.themeOptions,
        };
    }, [baseThemeForCreate]);

    const [draft, setDraft] = useState<ThemeDefinition | null>(null);
    const originalRef = useRef<ThemeDefinition | null>(null);

    useEffect(() => {
        if (!open) return;
        const start = editingTheme.theme ? deepClone(editingTheme.theme) : deepClone(createSeed);
        setDraft(start);
        originalRef.current = start;
    }, [open, editingTheme, createSeed]);

    if (!open || !draft) return null;

    const handleClose = () => {
        onEditTheme(undefined, undefined)
        setPreviewTheme(undefined)
        onClose?.()
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{!newTheme ? "Edit theme" : "Create new theme"}</DialogTitle>
            <DialogContent dividers sx={{p: 0}}>
                <ThemeEditor
                    value={draft}
                    showActions={showActions}
                    onSave={(draft) => { onSave?.(draft); handleClose(); }}
                    onCancel={handleClose}
                    defaultLiveEditing={defaultLiveEditing}
                    onJsonChangeRaw={onJsonChangeRaw}
                    jsonError={jsonError}
                    onLivePreview={onLivePreview}
                />
            </DialogContent>
        </Dialog>
    );
};

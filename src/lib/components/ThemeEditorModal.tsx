import React, { useRef, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useThemeManager } from "../ThemeManagerContext";
import { ThemeEditorContents } from "./ThemeEditorContents";
import { ThemeDefinition } from "../types";

export const ThemeEditorModal: React.FC = () => {
  const {
    editorState,
    closeEditor,
    createCustomTheme,
    updateCustomTheme,
  } = useThemeManager();

  const { open, draft: globalDraft, editingThemeId, jsonError } = editorState;

  // local isolated draft
  const [localDraft, setLocalDraft] = useState<ThemeDefinition | null>(null);
  const originalDraftRef = useRef<ThemeDefinition | null>(null);

  // initialize local copy on open
  useEffect(() => {
    if (open && globalDraft) {
      const deepClone = JSON.parse(JSON.stringify(globalDraft));
      setLocalDraft(deepClone);
      originalDraftRef.current = deepClone;
    }
  }, [open, globalDraft]);

  if (!open || !localDraft) return null;

  const handleSave = () => {
    if (editingThemeId) {
      updateCustomTheme(editingThemeId, localDraft);
    } else {
      createCustomTheme({ ...localDraft, isPreset: false });
    }
    closeEditor();
  };

  const handleCancel = () => {
    if (editingThemeId && originalDraftRef.current) {
      updateCustomTheme(editingThemeId, originalDraftRef.current);
    }
    // clear local draft so editor visually reverts instantly
    setLocalDraft(originalDraftRef.current
        ? JSON.parse(JSON.stringify(originalDraftRef.current))
        : null);
    closeEditor();
  };

  const handleLiveUpdate = (liveDraft: ThemeDefinition) => {
    if (editingThemeId) {
      updateCustomTheme(editingThemeId, liveDraft);
    }
  };

  return (
      <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingThemeId ? "Edit theme" : "Create new theme"}
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          <ThemeEditorContents
              draft={localDraft}
              jsonError={jsonError}
              onDraftChange={setLocalDraft}  // no longer touches global editorState
              onJsonChange={(json) => {
                try {
                  const parsed = JSON.parse(json);
                  setLocalDraft({ ...localDraft, themeOptions: parsed });
                } catch {
                  // invalid JSON handled inside AdvancedJsonEditor
                }
              }}
              onSave={handleSave}
              onCancel={handleCancel}
              onLiveUpdate={handleLiveUpdate}
          />
        </DialogContent>
      </Dialog>
  );
};

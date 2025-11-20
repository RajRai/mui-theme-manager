import React from "react";
import { ThemeDefinition } from "./types";

export interface EditorState {
  open: boolean;
  editingThemeId?: string;
  draft?: ThemeDefinition;
  jsonError?: string;
}

export interface ThemeManagerContextValue {
  activeThemeId: string;
  activeTheme: ThemeDefinition;
  presets: ThemeDefinition[];
  customThemes: ThemeDefinition[];

  setActiveTheme: (id: string) => void;
  createCustomTheme: (theme: ThemeDefinition) => void;
  updateCustomTheme: (id: string, updates: Partial<ThemeDefinition>) => void;
  deleteCustomTheme: (id: string) => void;

  editorState: EditorState;
  openEditor: (theme?: ThemeDefinition) => void;
  closeEditor: () => void;
  updateDraft: (updates: Partial<ThemeDefinition>) => void;
  setDraftFromThemeOptionsJson: (json: string) => void;
}

export const ThemeManagerContext = React.createContext<ThemeManagerContextValue | undefined>(
  undefined
);

export function useThemeManager(): ThemeManagerContextValue {
  const ctx = React.useContext(ThemeManagerContext);
  if (!ctx) {
    throw new Error("useThemeManager must be used within a ThemeManagerProvider");
  }
  return ctx;
}

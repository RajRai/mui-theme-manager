// ThemeManagerContext.ts
import React from "react";
import { ThemeDefinition } from "./types";

export interface ThemeManagerContextValue {
  activeThemeId: string;
  activeTheme: ThemeDefinition;
  presets: ThemeDefinition[];
  customThemes: ThemeDefinition[];

  setActiveTheme: (id: string) => void;
  createCustomTheme: (theme: ThemeDefinition) => void;
  updateCustomTheme: (id: string, updates: Partial<ThemeDefinition>) => void;
  deleteCustomTheme: (id: string) => void;

  onEditTheme: (theme?: ThemeDefinition, selectorId?: string) => void;
  editingTheme: { theme?: ThemeDefinition, selectorId?: string };

  setPreviewTheme: (theme?: ThemeDefinition) => void;
}

export const ThemeManagerContext = React.createContext<ThemeManagerContextValue | undefined>(
    undefined
);

export function useThemeManager(): ThemeManagerContextValue {
  const ctx = React.useContext(ThemeManagerContext);
  if (!ctx) throw new Error("useThemeManager must be used within a ThemeManagerProvider");
  return ctx;
}

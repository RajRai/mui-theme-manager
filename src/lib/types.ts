import { ThemeOptions } from "@mui/material/styles";

export interface ThemeDefinition {
  id: string;
  name: string;
  description?: string;
  themeOptions: ThemeOptions;
  isPreset?: boolean;
}

export interface PersistenceAdapter {
  loadPersistedThemes?: () => ThemeDefinition[];
  persistTheme?: (theme: ThemeDefinition) => void;
  deletePersistedTheme?: (id: string) => void;
  loadActiveThemeId?: () => string | undefined;
  persistActiveThemeId?: (id: string) => void;
}

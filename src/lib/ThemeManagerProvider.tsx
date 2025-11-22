// ThemeManagerProvider.tsx
import React from "react";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeManagerContext } from "./ThemeManagerContext";
import { PersistenceAdapter, ThemeDefinition } from "./types";
import { allPresets } from "./presets";

// ---------------------------------------------------------------------------
//  🧠 Safe theme creation — validates palette before passing to MUI
// ---------------------------------------------------------------------------
function sanitizeThemeOptions(options: any): any {
    const clean = { ...(options || {}) };
    clean.palette = { ...(clean.palette || {}) };

    const validModes = ["light", "dark"];
    const mode = clean.palette.mode;
    if (!validModes.includes(mode)) {
        clean.palette.mode = "light"; // fallback mode
    }

    return clean;
}

function safeCreateTheme(options: any): Theme {
    const sanitized = sanitizeThemeOptions(options);
    return createTheme(sanitized);
}

// ---------------------------------------------------------------------------
//  Default Persistence Adapter
// ---------------------------------------------------------------------------
const LOCAL_STORAGE_THEMES_KEY = "mui-theme-manager-custom-themes";
const LOCAL_STORAGE_ACTIVE_KEY = "mui-theme-manager-active-theme-id";

function createDefaultPersistenceAdapter(): PersistenceAdapter {
    return {
        loadPersistedThemes: () => {
            if (typeof window === "undefined") return [];
            try {
                const raw = window.localStorage.getItem(LOCAL_STORAGE_THEMES_KEY);
                if (!raw) return [];
                return JSON.parse(raw) as ThemeDefinition[];
            } catch {
                return [];
            }
        },
        persistTheme: (theme: ThemeDefinition) => {
            if (typeof window === "undefined") return;
            try {
                const raw = window.localStorage.getItem(LOCAL_STORAGE_THEMES_KEY);
                const existing = raw ? (JSON.parse(raw) as ThemeDefinition[]) : [];
                const index = existing.findIndex((t) => t.id === theme.id);
                if (index >= 0) existing[index] = theme;
                else existing.push(theme);
                window.localStorage.setItem(LOCAL_STORAGE_THEMES_KEY, JSON.stringify(existing));
            } catch {
                // ignore
            }
        },
        deletePersistedTheme: (id: string) => {
            if (typeof window === "undefined") return;
            try {
                const raw = window.localStorage.getItem(LOCAL_STORAGE_THEMES_KEY);
                const existing = raw ? (JSON.parse(raw) as ThemeDefinition[]) : [];
                const filtered = existing.filter((t) => t.id !== id);
                window.localStorage.setItem(LOCAL_STORAGE_THEMES_KEY, JSON.stringify(filtered));
            } catch {
                // ignore
            }
        },
        loadActiveThemeId: () => {
            if (typeof window === "undefined") return undefined;
            try {
                return window.localStorage.getItem(LOCAL_STORAGE_ACTIVE_KEY) || undefined;
            } catch {
                return undefined;
            }
        },
        persistActiveThemeId: (id: string) => {
            if (typeof window === "undefined") return;
            try {
                window.localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, id);
            } catch {
                // ignore
            }
        },
    };
}

// ---------------------------------------------------------------------------
//  Provider Component
// ---------------------------------------------------------------------------
export interface ThemeManagerProviderProps extends PersistenceAdapter {
    presets?: ThemeDefinition[];
    initialActiveThemeId?: string;
    onThemeChange?: (id: string, theme: ThemeDefinition) => void;
    children: React.ReactNode;
    onEditTheme?: (theme?: ThemeDefinition, selectorId?: string) => void;
}

export const ThemeManagerProvider: React.FC<ThemeManagerProviderProps> = ({
                                                                              presets: presetsProp,
                                                                              loadPersistedThemes,
                                                                              persistTheme,
                                                                              deletePersistedTheme,
                                                                              loadActiveThemeId,
                                                                              persistActiveThemeId,
                                                                              initialActiveThemeId,
                                                                              onThemeChange,
                                                                              onEditTheme: onEditThemeProp,
                                                                              children,
                                                                          }) => {
    const defaultAdapter = React.useMemo(() => createDefaultPersistenceAdapter(), []);
    const adapter: PersistenceAdapter = {
        loadPersistedThemes: loadPersistedThemes ?? defaultAdapter.loadPersistedThemes,
        persistTheme: persistTheme ?? defaultAdapter.persistTheme,
        deletePersistedTheme: deletePersistedTheme ?? defaultAdapter.deletePersistedTheme,
        loadActiveThemeId: loadActiveThemeId ?? defaultAdapter.loadActiveThemeId,
        persistActiveThemeId: persistActiveThemeId ?? defaultAdapter.persistActiveThemeId,
    };

    const presets = React.useMemo<ThemeDefinition[]>(
        () => (presetsProp && presetsProp.length > 0 ? presetsProp : allPresets),
        [presetsProp]
    );

    const [customThemes, setCustomThemes] = React.useState<ThemeDefinition[]>(() => {
        return adapter.loadPersistedThemes ? adapter.loadPersistedThemes() ?? [] : [];
    });

    const allThemes = React.useMemo(
        () => [...presets, ...customThemes],
        [presets, customThemes]
    );

    const [activeThemeId, setActiveThemeIdState] = React.useState<string>(() => {
        const persisted = adapter.loadActiveThemeId ? adapter.loadActiveThemeId() : undefined;
        if (initialActiveThemeId) return initialActiveThemeId;
        if (persisted && allThemes.some((t) => t.id === persisted)) return persisted;
        return presets[0]?.id ?? "default";
    });

    const [previewTheme, setPreviewTheme] = React.useState<ThemeDefinition>()
    const activeThemeDef: ThemeDefinition =
        previewTheme ||
        allThemes.find((t) => t.id === activeThemeId) ||
        presets[0] ||
        { id: "default", name: "Default", themeOptions: {} };

    // Create validated MUI theme
    const [muiTheme, setMuiTheme] = React.useState<Theme>(() =>
        safeCreateTheme(activeThemeDef.themeOptions)
    );

    React.useEffect(() => {
        setMuiTheme(safeCreateTheme(activeThemeDef.themeOptions));
    }, [activeThemeDef]);

    const setActiveTheme = React.useCallback(
        (id: string) => {
            const found = allThemes.find((t) => t.id === id);
            if (!found) return;
            setActiveThemeIdState(id);
            adapter.persistActiveThemeId?.(id);
            onThemeChange?.(id, found);
        },
        [allThemes, adapter, onThemeChange]
    );

    const createCustomTheme = React.useCallback(
        (theme: ThemeDefinition) => {
            setCustomThemes((prev) => {
                const exists = prev.some((t) => t.id === theme.id);
                const next = exists ? prev.map((t) => (t.id === theme.id ? theme : t)) : [...prev, theme];
                adapter.persistTheme?.(theme);
                return next;
            });
        },
        [adapter]
    );

    const updateCustomTheme = React.useCallback(
        (id: string, updates: Partial<ThemeDefinition>) => {
            setCustomThemes((prev) => {
                const next = prev.map((t) => (t.id === id ? { ...t, ...updates } : t));
                const updated = next.find((t) => t.id === id);
                if (updated) adapter.persistTheme?.(updated);
                return next;
            });
        },
        [adapter]
    );

    const deleteCustomTheme = React.useCallback(
        (id: string) => {
            setCustomThemes((prev) => {
                const next = prev.filter((t) => t.id !== id);
                adapter.deletePersistedTheme?.(id);
                if (activeThemeId === id && presets[0]) setActiveTheme(presets[0].id);
                return next;
            });
        },
        [adapter, activeThemeId, presets, setActiveTheme]
    );

    const [editingTheme, setEditingTheme] = React.useState<{ theme?: ThemeDefinition, selectorId?: string }>({theme: undefined, selectorId: undefined})
    const onEditTheme = onEditThemeProp ? onEditThemeProp : (theme?: ThemeDefinition, selectorId?: string) => {
        setEditingTheme({ theme, selectorId });
    }

    const ctxValue = React.useMemo(
        () => ({
            activeThemeId,
            activeTheme: activeThemeDef,
            presets,
            customThemes,
            setActiveTheme,
            createCustomTheme,
            updateCustomTheme,
            deleteCustomTheme,
            onEditTheme,
            editingTheme,
            setPreviewTheme
        }),
        [
            activeThemeId,
            activeThemeDef,
            presets,
            customThemes,
            setActiveTheme,
            createCustomTheme,
            updateCustomTheme,
            deleteCustomTheme,
            onEditTheme,
            editingTheme,
            setPreviewTheme
        ]
    );

    return (
        <ThemeManagerContext.Provider value={ctxValue}>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeManagerContext.Provider>
    );
};

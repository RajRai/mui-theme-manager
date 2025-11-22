# MUI Theme Manager

A lightweight React component library for creating, editing, and managing MUI v6+ theme presets in real time.

It gives you:

- A provider that owns the active theme and wraps your app in `ThemeProvider`
- A small set of ready-to-use controls (selector + editor modal)
- A bunch of presets, plus tools to build and persist your own themes
- A full inline editor (`ThemeEditor`) if you want to embed the editor instead of using the modal

> Requires **React 18+** and **MUI v6–7**  
> (`@mui/material >=6 <8`, `@mui/icons-material >=6 <8`)

---

## Install

```bash
# npm
npm install @rajrai/mui-theme-manager @mui/material @mui/icons-material @emotion/react @emotion/styled

# yarn
yarn add @rajrai/mui-theme-manager @mui/material @mui/icons-material @emotion/react @emotion/styled

# pnpm
pnpm add @rajrai/mui-theme-manager @mui/material @mui/icons-material @emotion/react @emotion/styled
```

---

## Quick start

Minimal “wrap your app and let users pick a theme” setup:

```tsx
import React from "react";
import { Container, Button, Typography } from "@mui/material";
import {
  ThemeManagerProvider,
  ThemeSelector,
  ThemeEditorModal,
  NewThemeButton,
  allPresets,
} from "@rajrai/mui-theme-manager";

function App() {
  return (
    <ThemeManagerProvider presets={allPresets}>
      <ThemeEditorModal />

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>My App</Typography>

        <ThemeSelector />
        <NewThemeButton />

        <Button sx={{ mt: 3 }} variant="contained">
          This button uses the active theme
        </Button>
      </Container>
    </ThemeManagerProvider>
  );
}

export default App;
```

What you get:

- A working theme dropdown
- A modal editor for creating/editing themes
- Local persistence via `localStorage`

---

## Live demo

- Demo: **https://rajrai.github.io/mui-theme-manager**
- Demo source: `src/demo`

---

## Core API

### `ThemeManagerProvider`

Wraps your app, manages presets + custom themes, creates validated MUI themes, and exposes editing helpers.

```tsx
import { ThemeManagerProvider, allPresets } from "@rajrai/mui-theme-manager";

<ThemeManagerProvider presets={allPresets}>
  {/* your app */}
</ThemeManagerProvider>;
```

### ThemeDefinition & PersistenceAdapter

```ts
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
```

### Provider behavior

- Accepts `presets` or falls back to packaged presets
- Persists custom themes + active theme id
- Sanitizes invalid palette modes
- Exposes editing controls via context

Storage keys:

- `mui-theme-manager-custom-themes`
- `mui-theme-manager-active-theme-id`

---

## ThemeSelector

Dropdown to pick a theme. Shows edit/delete icons for custom themes when menu is open.

```tsx
<ThemeSelector />
```

Optional ID:

```tsx
<ThemeSelector id="settings-panel" />
```

This lets you know which selector opened the modal.

---

## ThemeEditorModal

Shared modal editor. Opens when any component calls `onEditTheme`.

Render once near the root:

```tsx
<ThemeEditorModal />
```

Props let you customize live-editing, save behavior, and JSON error handling.

---

## ThemeEditor (inline editor)

Embed the full editor anywhere—settings page, drawer, admin screen, etc.

```tsx
import { ThemeEditor, useThemeManager } from "@rajrai/mui-theme-manager";

const InlineEditor = () => {
  const { activeTheme } = useThemeManager();
  return <ThemeEditor value={activeTheme} />;
};
```

Supports:

- Name
- Mode
- Color pickers
- Advanced JSON editor
- Live preview toggle
- Optional Save/Cancel controls

Presets automatically become read-only.

---

## useThemeManager

```ts
export interface ThemeManagerContextValue {
  activeThemeId: string;
  activeTheme: ThemeDefinition;

  presets: ThemeDefinition[];
  customThemes: ThemeDefinition[];

  setActiveTheme(id: string): void;
  createCustomTheme(theme: ThemeDefinition): void;
  updateCustomTheme(id: string, updates: Partial<ThemeDefinition>): void;
  deleteCustomTheme(id: string): void;

  onEditTheme(theme?: ThemeDefinition, selectorId?: string): void;
  editingTheme: { theme?: ThemeDefinition; selectorId?: string };

  setPreviewTheme(theme?: ThemeDefinition): void;
}
```

Lets you build entirely custom theme UIs.

---

## Presets

Available collections:

- `defaultPresets`
- `professionalPresets`
- `vibrantPresets`
- `naturalPresets`
- `experimentalPresets`
- `allPresets` (combined)

Use everything:

```tsx
<ThemeManagerProvider presets={allPresets} />
```

Or mix:

```tsx
const presets = [...professionalPresets, ...vibrantPresets];
```

Or pass your own.

---

## Editor building blocks

These components are exported for custom editors:

- `ThemeEditor` (full editor)
- `ColorPickerGrid`
- `AdvancedColorSection`
- `AdvancedJsonEditor`
- `ColorSwatch`

Example:

```tsx
<ColorPickerGrid draft={draft} onChange={setDraft} />
<AdvancedColorSection draft={draft} onChange={setDraft} />
```

---

## Low-level helpers

```ts
getColorFromDraft(path: string)
setColorOnDraft(path: string, value: string)
```

Useful for building your own color controls.

---

## TypeScript

The package ships fully typed definitions:

```ts
import type {
  ThemeDefinition,
  PersistenceAdapter,
  ThemeManagerContextValue,
} from "@rajrai/mui-theme-manager";
```

---

## License

MIT

Use it freely in commercial or open-source projects.


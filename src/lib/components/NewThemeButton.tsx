// NewThemeButton.tsx
import React, { useMemo } from "react";
import { Button, ButtonProps } from "@mui/material";
import { useThemeManager } from "../ThemeManagerContext";
import { ThemeDefinition } from "../types";
import {ThemeEditorModal} from "./ThemeEditorModal";

function deepClone<T>(o: T): T { return JSON.parse(JSON.stringify(o)); }

export const NewThemeButton: React.FC<{
    id?: string;
    buttonProps?: ButtonProps;
}> = ({ id = '', buttonProps }) => {
    const { onEditTheme, activeTheme } = useThemeManager();

    return (
        <Button
            variant="outlined"
            size="small"
            onClick={(e) => {onEditTheme({
                id: `custom-${Date.now()}`,
                name: "",
                isPreset: false,
                themeOptions: deepClone(activeTheme.themeOptions),
            }, id)}}
            {...buttonProps}
        >
            + New Theme
        </Button>
    );
};

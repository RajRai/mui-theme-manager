import React from "react";
import { Button } from "@mui/material";
import { useThemeManager } from "../ThemeManagerContext";

export const NewThemeButton: React.FC = () => {
  const { openEditor } = useThemeManager();

  return (
      <Button
          variant="outlined"
          size="small"
          onClick={() => openEditor()}
      >
          + New Theme
      </Button>
  );
};

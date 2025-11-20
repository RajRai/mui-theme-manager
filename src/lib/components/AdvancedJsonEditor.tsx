import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeDefinition } from "../types";

export interface AdvancedJsonEditorProps {
  draft: ThemeDefinition;
  jsonError?: string;
  onJsonChange: (value: string) => void;
}

export const AdvancedJsonEditor: React.FC<AdvancedJsonEditorProps> = ({
  draft,
  jsonError,
  onJsonChange
}) => {
  const [text, setText] = React.useState(() =>
    JSON.stringify(draft.themeOptions, null, 2)
  );

  React.useEffect(() => {
    setText(JSON.stringify(draft.themeOptions, null, 2));
  }, [draft.themeOptions]);

  return (
    <Accordion sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2">Advanced configuration (raw theme JSON)</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          This allows direct editing of the MUI ThemeOptions object. Changes here override
          values set in the color pickers above.
        </Typography>
        <TextField
          label="ThemeOptions JSON"
          fullWidth
          multiline
          minRows={8}
          value={text}
          onChange={event => {
            const value = event.target.value;
            setText(value);
            onJsonChange(value);
          }}
          error={Boolean(jsonError)}
          helperText={jsonError || " "}
        />
      </AccordionDetails>
    </Accordion>
  );
};

import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeDefinition } from "../types";

export interface AdvancedJsonEditorProps {
    draft: ThemeDefinition;
    jsonError?: string;
    onJsonChange: (value: string) => void;
    disabled?: boolean;       // ⬅️ NEW
}

export const AdvancedJsonEditor: React.FC<AdvancedJsonEditorProps> = ({
                                                                          draft,
                                                                          jsonError,
                                                                          onJsonChange,
                                                                          disabled = false,
                                                                      }) => {
    const [text, setText] = React.useState(() =>
        JSON.stringify(draft.themeOptions, null, 2)
    );

    React.useEffect(() => {
        setText(JSON.stringify(draft.themeOptions, null, 2));
    }, [draft.themeOptions]);

    return (
        <Accordion sx={{ mt: 2, opacity: disabled ? 0.5 : 1 }} disabled={disabled}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ pointerEvents: disabled ? "none" : "auto" }}
            >
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
                    disabled={disabled}      // ⬅️ disable editing
                    value={text}
                    onChange={(event) => {
                        if (disabled) return;
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

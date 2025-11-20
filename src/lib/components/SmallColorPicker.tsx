import React from "react";
import { Box, TextField, Typography } from "@mui/material";

export interface SmallColorPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export const SmallColorPicker: React.FC<SmallColorPickerProps> = ({
                                                                      label,
                                                                      value,
                                                                      onChange
                                                                  }) => {
    return (
        <Box>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {label}
            </Typography>
            <TextField
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                sx={{
                    width: 60,
                    height: 40,
                    p: 0,
                    "& input": {
                        p: 0,
                        width: 40,
                        height: 32,
                        cursor: "pointer"
                    }
                }}
                inputProps={{ style: { padding: 0 } }}
            />
        </Box>
    );
};

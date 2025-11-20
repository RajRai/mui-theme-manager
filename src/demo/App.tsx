import React from "react";
import {
    Box,
    Container,
    Paper,
    Typography,
    Stack,
    Divider,
    IconButton,
    Tooltip,
    Link,
    Button,
    TextField,
    Alert,
    Chip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
    ThemeManagerProvider,
    ThemeSelector,
    ThemeEditorModal,
    NewThemeButton,
    defaultPresets,
} from "../lib";

const DemoApp: React.FC = () => {
    return (
        <ThemeManagerProvider presets={defaultPresets}>
            <ThemeEditorModal />
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Paper
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 4,
                    }}
                >
                    {/* --- Header with GitHub link --- */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 3 }}
                    >
                        <Box>
                            <Typography variant="h4" fontWeight={600} gutterBottom>
                                MUI Theme Manager Demo
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Edit, preview, and persist custom MUI v6 themes in real time.
                            </Typography>
                        </Box>

                        <Tooltip title="View source on GitHub">
                            <IconButton
                                component={Link}
                                href="https://github.com/rajrai/mui-theme-manager"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: "text.secondary" }}
                            >
                                <GitHubIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={4}
                        alignItems="stretch"
                    >
                        {/* --- Left controls --- */}
                        <Box
                            sx={{
                                flexBasis: { xs: "100%", md: "35%" },
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                Theme Controls
                            </Typography>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <ThemeSelector />
                                <NewThemeButton />
                            </Stack>

                            <Typography variant="body2" color="text.secondary">
                                Switch between presets or create your own theme. Edits apply live to
                                this preview area.
                            </Typography>
                        </Box>

                        {/* --- Right live preview --- */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                flexBasis: { xs: "100%", md: "65%" },
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider",
                                p: 3,
                                backgroundColor: "background.paper",
                            }}
                        >
                            <Typography variant="subtitle1" gutterBottom>
                                Live Preview
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Everything below uses the active MUI theme — colors, typography, spacing,
                                and component styling.
                            </Typography>

                            {/* --- Demo UI --- */}
                            <Stack spacing={3} sx={{ mt: 2 }}>
                                {/* Buttons row */}
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" color="primary">
                                        Primary Button
                                    </Button>
                                    <Button variant="outlined" color="secondary">
                                        Secondary
                                    </Button>
                                    <Button variant="text">Text</Button>
                                </Stack>

                                {/* Inputs and chip */}
                                <Stack direction="row" spacing={2}>
                                    <TextField label="Name" size="small" />
                                    <TextField label="Email" size="small" />
                                    <Chip label="Example Chip" color="info" />
                                </Stack>

                                {/* Alert showcase */}
                                <Stack spacing={1}>
                                    <Alert severity="info">This is an info alert.</Alert>
                                    <Alert severity="success">This is a success alert.</Alert>
                                    <Alert severity="warning">This is a warning alert.</Alert>
                                    <Alert severity="error">This is an error alert.</Alert>
                                </Stack>

                                {/* Card examples */}
                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                    <Paper sx={{ p: 2, flex: 1 }} elevation={2}>
                                        <Typography variant="h6" gutterBottom>
                                            Dashboard Card
                                        </Typography>
                                        <Typography variant="body2">
                                            Card backgrounds, text, and borders reflect the active theme.
                                        </Typography>
                                    </Paper>
                                    <Paper sx={{ p: 2, flex: 1 }} elevation={1}>
                                        <Typography color="primary" variant="h6" gutterBottom>
                                            Accent Card
                                        </Typography>
                                        <Typography color="text.secondary" variant="body2">
                                            Great for seeing secondary and text color contrasts.
                                        </Typography>
                                    </Paper>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </ThemeManagerProvider>
    );
};

export default DemoApp;

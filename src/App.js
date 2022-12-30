/**
 * TODO lumpsum added pension calculation
 */

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material//styles";

import "typeface-roboto";

import { calculatePensionPots } from "./pension";
import PensionForm from "./pensionForm";
import PensionCalulationCard from "./pensionCard";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function App() {
    const initialPensionFormState = JSON.parse(window.localStorage.getItem("form")) || {
        age: 45,
        currentPensionPot: 0,
        earlyRetirementAge: 55,
        monthlyAddedPensionPayment: 0,
        normalPensionAge: 67,
        addedPensionType: "self",
        pensionableEarnings: 40000,
        EPAPension: 0,
        reducedHoursAge: 55,
        reducedHoursPercentage: 50
    };

    const [cardData, setCardData] = useState(calculatePensionPots(initialPensionFormState));

    const handleCallback = (form) => {
        setCardData(calculatePensionPots(form));
        localStorage.setItem("form", JSON.stringify(form));
    };

    const THEME = createTheme({
        palette: {
            primary: {
                main: "#D3D3D3",
                light: "#E5E4E2"
            }
        },
        typography: {
            h1: {
                fontSize: "2rem"
            },
            h5: {
                fontSize: "1rem"
            },
            h3: {
                fontSize: "1.2rem",
                fontWeight: "bold"
            }
        }
    });

    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={THEME}>
                <Container maxWidth="lg">
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static" sx={{ backgroundColor: "primary.light" }}>
                            <Toolbar>
                                <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                                    Civil Service Alpha Pension Calculator
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <PensionForm
                                    initialState={initialPensionFormState}
                                    onChange={handleCallback}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container direction={"column"}>
                                    <Grid item>
                                        <Card sx={{ p: -1 }}>
                                            <Box
                                                sx={{
                                                    backgroundColor: "primary.light"
                                                }}>
                                                <CardHeader
                                                    sx={{ p: 1 }}
                                                    title="Retiring at Normal Pension Age"
                                                    align="center"
                                                />
                                            </Box>
                                            <CardContent sx={{ m: -2 }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={3}>
                                                        <PensionCalulationCard
                                                            title="Your annual pension is"
                                                            subtitle="including state pension"
                                                            pension={
                                                                cardData.pensionForNormalPensionAge
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <PensionCalulationCard
                                                            title="Your annual pension with added pension is"
                                                            subtitle="including state pension"
                                                            pension={
                                                                cardData.pensionWithMonthlyAddedPension
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <PensionCalulationCard
                                                            title="Your annual pension with reduced hours is"
                                                            subtitle="including state pension"
                                                            pension={
                                                                cardData.pensionForNormalPensionAgeWithReducedHours
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <PensionCalulationCard
                                                            title="Your annual pension with reduced hours and added pension is"
                                                            subtitle="including state pension"
                                                            pension={
                                                                cardData.pensionNormalRetirementAddedPensionReducedHours
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item>
                                        <Card sx={{ p: -1 }}>
                                            <Box
                                                sx={{
                                                    backgroundColor: "primary.light"
                                                }}>
                                                <CardHeader
                                                    sx={{ p: 1 }}
                                                    title="Retiring Early"
                                                    align="center"
                                                />
                                            </Box>
                                            <CardContent sx={{ m: -2 }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={3}>
                                                        <PensionCalulationCard
                                                            title="Your annual early retirement pension is"
                                                            subtitle="including state pension (at NPA)"
                                                            pension={
                                                                cardData.pensionForEarlyRetirement
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <PensionCalulationCard
                                                            title="Your annual early retirement pension with added pension is"
                                                            subtitle="including state pension (at NPA)"
                                                            pension={
                                                                cardData.pensionEarlyRetirementMonthlyAddedPension
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <PensionCalulationCard
                                                            title="Your annual early retirement pension with reduced hours is"
                                                            subtitle="including state pension"
                                                            pension={
                                                                cardData.pensionForEarlyRetirementWithReducedHours
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <PensionCalulationCard
                                                            title="Your annual early retirement pension with reduced hours and added pension is"
                                                            subtitle="including state pension"
                                                            pension={
                                                                cardData.pensionForEarlyRetirementWithAddedPensionReducedHours
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;

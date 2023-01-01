/* eslint-disable jsdoc/require-jsdoc */
/**
 * @todo lump sum added pension calculation
 * @todo EPA testing and work with NPA calculations
 */

import React, { useState } from "react";
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
import NPACards from "./npaCards";
import EarlyRetirementCards from "./earlyRetirementCards";

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
                    <AppBar position="static" sx={{ backgroundColor: "primary.light" }}>
                        <Toolbar>
                            <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                                Civil Service Alpha Pension Calculator
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={5} md={4} lg={4}>
                            <PensionForm initialState={initialPensionFormState} onChange={handleCallback} />
                        </Grid>
                        <Grid xs={12} sm={7} md={8} lg={8}>
                            <Grid>
                                <Grid>
                                    <NPACards data={cardData} />
                                </Grid>
                                <Grid>
                                    <EarlyRetirementCards data={cardData} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;

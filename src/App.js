/**
 * @todo lump sum added pension calculation
 * @todo EPA testing and work with NPA calculations
 */

import { useState, React } from "react";
import { ThemeProvider, createTheme, CssBaseline, Container, Unstable_Grid2 as Grid } from "@mui/material/";
import "typeface-roboto";

import calculatePensionPots from "./pension";
import PensionForm from "./components/PensionForm";
import NPACards from "./components/NpaCards";
import EarlyRetirementCards from "./components/EarlyRetirementCards";
import AppBar from "./components/AppBar";

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
        <>
            <ThemeProvider theme={THEME}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <AppBar />
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={5} md={4} lg={4}>
                            <PensionForm initialState={initialPensionFormState} onChange={handleCallback} />
                        </Grid>
                        <Grid xs={12} sm={7} md={8} lg={8}>
                            <Grid>
                                <NPACards data={cardData} />
                            </Grid>
                            <Grid>
                                <EarlyRetirementCards data={cardData} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;

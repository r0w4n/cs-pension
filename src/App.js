/**
 * @todo lump sum added pension calculation
 * @todo EPA testing and work with NPA calculations
 */

import { useState, React } from "react";
import { useTheme, useMediaQuery, Unstable_Grid2 as Grid } from "@mui/material/";
import "typeface-roboto";

import { calculatePensionPots } from "./pension";
import PensionForm from "./components/PensionForm";
import NPACards from "./components/NpaCards";
import EarlyRetirementCards from "./components/EarlyRetirementCards";
import MobilePensionForm from "./components/MobilePensionForm";
import { Tabs, TabContent } from "./components/Tabs";

import ReactGA from "react-ga4";
import Page from "./components/Page";

function App() {
    ReactGA.initialize("G-HZWS413BTP");
    ReactGA.send("pageview");

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

    const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

    const [cardData, setCardData] = useState(calculatePensionPots(initialPensionFormState));
    const handleCallback = (form) => {
        setCardData(calculatePensionPots(form));
        localStorage.setItem("form", JSON.stringify(form));
    };

    if (isMobile) {
        return (
            <Page>
                <Grid container direction={"column"} spacing={1}>
                    <Tabs>
                        <TabContent name="normal">
                            <NPACards data={cardData} />
                        </TabContent>
                        <TabContent name="early">
                            <EarlyRetirementCards data={cardData} />
                        </TabContent>
                        <TabContent name="settings">
                            <MobilePensionForm initialState={initialPensionFormState} onChange={handleCallback} />
                        </TabContent>
                    </Tabs>
                </Grid>
            </Page>
        );
    } else {
        return (
            <Page>
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
            </Page>
        );
    }
}

export default App;

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
import Page from "./components/Page";
import defaultSettings from "./defaultSettings.json";

import ReactGA from "react-ga4";

function App() {
    ReactGA.initialize("G-HZWS413BTP");
    ReactGA.send("pageview");

    const settings = JSON.parse(window.localStorage.getItem("form")) || defaultSettings;

    const [cardData, setCardData] = useState(calculatePensionPots(settings));
    const handleUpdatePensionCards = (form) => {
        setCardData(calculatePensionPots(form));
        localStorage.setItem("form", JSON.stringify(form));
    };

    if (useMediaQuery(useTheme().breakpoints.down("sm"))) {
        // is mobile?
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
                            <MobilePensionForm initialState={settings} onChange={handleUpdatePensionCards} />
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
                        <PensionForm initialState={settings} onChange={handleUpdatePensionCards} />
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

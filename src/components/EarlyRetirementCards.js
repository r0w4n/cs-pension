import { Box, Unstable_Grid2 as Grid, Card, CardHeader, CardContent } from "@mui/material";
import "typeface-roboto";
import PropTypes from "prop-types";

import PensionCard from "./PensionCard";

const EarlyRetirementCards = (props) => {
    const cardData = props.data.cardData;
    const settings = props.data.settings;

    var titleAmendment = "";
    if (settings.drawPensionAge !== settings.retirementAge) {
        titleAmendment = ", when drawing from age " + settings.drawPensionAge + ",";
    }

    return (
        <Card sx={{ p: -1 }}>
            <Box
                sx={{
                    backgroundColor: "primary.light"
                }}>
                <CardHeader sx={{ p: 1 }} title="Retiring Early" align="center" />
            </Box>
            <CardContent sx={{ m: -2 }}>
                <Grid container spacing={1}>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title={"Your annual early retirement pension" + titleAmendment + " is"}
                            subtitle="including state pension (at NPA)"
                            pension={cardData.pensionForEarlyRetirement}
                            statePension={settings.statePension}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title={"Your annual early retirement pension with added pension" + titleAmendment + " is"}
                            subtitle="including state pension (at NPA)"
                            pension={cardData.pensionForEarlyRetirementWithAddedPension}
                            statePension={settings.statePension}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title={"Your annual early retirement pension with reduced hours" + titleAmendment + " is"}
                            subtitle="including state pension (at NPA)"
                            pension={cardData.pensionForEarlyRetirementWithReducedHours}
                            statePension={settings.statePension}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title={"Your annual early retirement pension with reduced hours and added pension" + titleAmendment + " is"}
                            subtitle="including state pension (at NPA)"
                            pension={cardData.pensionForEarlyRetirementWithAddedPensionReducedHours}
                            statePension={settings.statePension}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

EarlyRetirementCards.propTypes = {
    data: PropTypes.shape({
        settings: PropTypes.shape({
            statePension: PropTypes.number.isRequired,
            drawPensionAge: PropTypes.number.isRequired,
            retirementAge: PropTypes.number.isRequired
        }).isRequired,
        cardData: PropTypes.shape({
            pensionForEarlyRetirementWithAddedPensionReducedHours: PropTypes.number.isRequired,
            pensionForEarlyRetirementWithReducedHours: PropTypes.number.isRequired,
            pensionForEarlyRetirementWithAddedPension: PropTypes.number.isRequired,
            pensionForEarlyRetirement: PropTypes.number.isRequired,
            statePension: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
};

export default EarlyRetirementCards;

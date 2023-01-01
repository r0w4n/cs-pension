import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "typeface-roboto";

import PensionCalulationCard from "./pensionCard";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";

const NPACards = (props) => {
    const cardData = props.data;

    return (
        <Card sx={{ p: -1 }}>
            <Box
                sx={{
                    backgroundColor: "primary.light"
                }}>
                <CardHeader sx={{ p: 1 }} title="Retiring at Normal Pension Age" align="center" />
            </Box>
            <CardContent sx={{ m: -2 }}>
                <Grid container spacing={1}>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCalulationCard title="Your annual pension is" subtitle="including state pension" pension={cardData.pensionForNPA} />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCalulationCard
                            title="Your annual pension with added pension is"
                            subtitle="including state pension"
                            pension={cardData.pensionForNPAWithMonthlyAddedPension}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCalulationCard
                            title="Your annual pension with reduced hours is"
                            subtitle="including state pension"
                            pension={cardData.pensionForNPAWithReducedHours}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCalulationCard
                            title="Your annual pension with reduced hours and added pension is"
                            subtitle="including state pension"
                            pension={cardData.pensionForNPAWithAddedPensionAndReducedHours}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

NPACards.propTypes = {
    data: PropTypes.object.isRequired
};

export default NPACards;

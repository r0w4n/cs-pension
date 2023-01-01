import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "typeface-roboto";

import PensionCard from "./pensionCard";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";

const EarlyRetirementCards = (props) => {
    const cardData = props.data;

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
                            title="Your annual early retirement pension is"
                            subtitle="including state pension (at NPA)"
                            pension={cardData.pensionForEarlyRetirement}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title="Your annual early retirement pension with added pension is"
                            subtitle="including state pension (at NPA)"
                            pension={cardData.pensionForEarlyRetirementMonthlyAddedPension}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title="Your annual early retirement pension with reduced hours is"
                            subtitle="including state pension"
                            pension={cardData.pensionForEarlyRetirementWithReducedHours}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title="Your annual early retirement pension with reduced hours and added pension is"
                            subtitle="including state pension"
                            pension={cardData.pensionForEarlyRetirementWithAddedPensionReducedHours}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

EarlyRetirementCards.propTypes = {
    data: PropTypes.object.isRequired
};

export default EarlyRetirementCards;

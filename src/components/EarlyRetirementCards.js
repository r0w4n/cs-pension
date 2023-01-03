import { Box, Unstable_Grid2 as Grid, Card, CardHeader, CardContent } from "@mui/material";
import "typeface-roboto";
import PropTypes from "prop-types";

import PensionCard from "./PensionCard";

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
                            pension={cardData.pensionForEarlyRetirementWithAddedPension}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title="Your annual early retirement pension with reduced hours is"
                            subtitle="including state pension (at NPA)"
                            pension={cardData.pensionForEarlyRetirementWithReducedHours}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title="Your annual early retirement pension with reduced hours and added pension is"
                            subtitle="including state pension (at NPA)"
                            pension={cardData.pensionForEarlyRetirementWithAddedPensionReducedHours}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

EarlyRetirementCards.propTypes = {
    data: PropTypes.shape({
        pensionForEarlyRetirementWithAddedPensionReducedHours: PropTypes.number.isRequired,
        pensionForEarlyRetirementWithReducedHours: PropTypes.number.isRequired,
        pensionForEarlyRetirementWithAddedPension: PropTypes.number.isRequired,
        pensionForEarlyRetirement: PropTypes.number.isRequired
    })
};

export default EarlyRetirementCards;

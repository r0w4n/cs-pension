import { Card, CardHeader, CardContent, Unstable_Grid2 as Grid, Box } from "@mui/material";
import "typeface-roboto";
import PropTypes from "prop-types";

import PensionCard from "./PensionCard";

const NPACards = (props) => {
    const cardData = props.data;
    const statePension = cardData.statePension;

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
                        <PensionCard
                            title="Your annual pension is"
                            subtitle="including state pension"
                            pension={cardData.pensionForNPA}
                            statePension={statePension}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title="Your annual pension with added pension is"
                            subtitle="including state pension"
                            pension={cardData.pensionForNPAWithAddedPension}
                            statePension={statePension}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title="Your annual pension with reduced hours is"
                            subtitle="including state pension"
                            pension={cardData.pensionForNPAWithReducedHours}
                            statePension={statePension}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} lg={3}>
                        <PensionCard
                            title="Your annual pension with reduced hours and added pension is"
                            subtitle="including state pension"
                            pension={cardData.pensionForNPAWithAddedPensionAndReducedHours}
                            statePension={statePension}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

NPACards.propTypes = {
    data: PropTypes.shape({
        pensionForNPAWithAddedPensionAndReducedHours: PropTypes.number.isRequired,
        pensionForNPAWithReducedHours: PropTypes.number.isRequired,
        pensionForNPAWithAddedPension: PropTypes.number.isRequired,
        pensionForNPA: PropTypes.number.isRequired,
        statePension: PropTypes.number.isRequired
    })
};

export default NPACards;

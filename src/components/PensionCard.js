import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import statePension from "../pension";
import PropTypes from "prop-types";

const PensionCard = (props) => {
    const pension = Number(props.pension).toLocaleString("en");
    const statePensionPot = Number(props.pension + statePension).toLocaleString("en");

    return (
        <Card sx={{ height: 1 }}>
            <CardHeader sx={{ p: 0 }} title={props.title} align="center" />
            <CardContent>
                <Typography variant="h3" color="text.secondary" align="center">
                    £{pension} <span>/year</span>
                </Typography>
                <Typography align="center">
                    £{statePensionPot} <span>/year</span> <span>{props.subtitle}</span>
                </Typography>
            </CardContent>
        </Card>
    );
};

PensionCard.propTypes = {
    pension: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

export default PensionCard;

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { statePension } from "./pension";
import PropTypes from "prop-types";

const PensionCalulationCard = (props) => {
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

PensionCalulationCard.propTypes = {
    pension: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

export default PensionCalulationCard;

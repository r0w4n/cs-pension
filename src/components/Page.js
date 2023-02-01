import { BottomNavigation, BottomNavigationAction, ThemeProvider, createTheme, CssBaseline, Container } from "@mui/material/";
import PropTypes from "prop-types";
import CookieConsent from "react-cookie-consent";
import GitHubIcon from "@mui/icons-material/GitHub";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import BugReportIcon from "@mui/icons-material/BugReport";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

import AppBar from "./AppBar";

function Page(props) {
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
        <ThemeProvider theme={THEME}>
            <CssBaseline />
            <Container maxWidth="lg">
                <AppBar />
                {props.children}
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Github" icon={<GitHubIcon />} href="https://github.com/r0w4n/cs-pension" />
                    <BottomNavigationAction
                        label="Donate"
                        icon={<VolunteerActivismIcon />}
                        href="https://www.paypal.com/donate/?hosted_button_id=37J8F7GCENZVA    "
                    />
                    <BottomNavigationAction
                        label="Report Bug"
                        icon={<BugReportIcon />}
                        href="https://github.com/r0w4n/cs-pension/issues/new?assignees=&labels=&template=bug_report.md&title="
                    />
                    <BottomNavigationAction
                        label="Suggestions"
                        icon={<LightbulbIcon />}
                        href="https://github.com/r0w4n/cs-pension/issues/new?assignees=&labels=&template=feature_request.md&title="
                    />
                </BottomNavigation>
            </Container>
            <CookieConsent>This website uses cookies for Google Analytics</CookieConsent>
        </ThemeProvider>
    );
}

Page.propTypes = {
    children: PropTypes.object
};

export default Page;

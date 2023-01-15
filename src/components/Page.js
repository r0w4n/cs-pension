import { ThemeProvider, createTheme, CssBaseline, Container } from "@mui/material/";
import PropTypes from "prop-types";
import CookieConsent from "react-cookie-consent";

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
            </Container>
            <CookieConsent>This website uses cookies for Google Adsense</CookieConsent>
        </ThemeProvider>
    );
}

Page.propTypes = {
    children: PropTypes.object
};

export default Page;

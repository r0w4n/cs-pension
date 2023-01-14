/* eslint-disable react/prop-types */
import { ThemeProvider, createTheme, CssBaseline, Container } from "@mui/material/";

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
        </ThemeProvider>
    );
}

export default Page;
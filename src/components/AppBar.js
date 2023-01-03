import { AppBar as MUAppBar, Toolbar, Typography } from "@mui/material";

const AppBar = () => {
    return (
        <MUAppBar position="static" sx={{ backgroundColor: "primary.light" }}>
            <Toolbar>
                <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                    Civil Service Alpha Pension Calculator
                </Typography>
            </Toolbar>
        </MUAppBar>
    );
};

export default AppBar;

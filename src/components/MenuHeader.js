import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const MenuHeader = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "primary.light" }}>
            <Toolbar>
                <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                    Civil Service Alpha Pension Calculator
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default MenuHeader;

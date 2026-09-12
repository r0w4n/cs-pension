import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";

function BetaAnnouncement() {
    const [isOpen, setIsOpen] = useState(true);

    const dismissAnnouncement = () => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onClose={dismissAnnouncement} aria-labelledby="beta-announcement-title">
            <DialogTitle id="beta-announcement-title">The beta calculator is replacing this calculator</DialogTitle>
            <DialogContent>
                <DialogContentText>The Civil Service Pension Calculator is going to be replaced by the current beta version.</DialogContentText>
                <DialogContentText sx={{ mt: 2 }}>
                    If there is a reason you are still using the old calculator, please get in touch using the{" "}
                    <Link href="https://forms.gle/mqgPbWFLt9byHC7B8" target="_blank" rel="noopener noreferrer">
                        feedback form
                    </Link>{" "}
                    for the beta app.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="inherit" onClick={dismissAnnouncement}>
                    Dismiss
                </Button>
                <Button
                    component={Link}
                    href="https://beta.civilservicepensioncalculator.co.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={dismissAnnouncement}
                    variant="contained">
                    Try the beta
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default BetaAnnouncement;

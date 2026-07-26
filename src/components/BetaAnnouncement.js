import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";

import { createBetaAnnouncementDismissalCookie, hasDismissedBetaAnnouncement } from "../betaAnnouncementCookie";

function BetaAnnouncement() {
    const [isOpen, setIsOpen] = useState(() => !hasDismissedBetaAnnouncement(document.cookie));

    const dismissAnnouncement = () => {
        document.cookie = createBetaAnnouncementDismissalCookie(window.location.protocol === "https:");
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onClose={dismissAnnouncement} aria-labelledby="beta-announcement-title">
            <DialogTitle id="beta-announcement-title">Try the new beta calculator</DialogTitle>
            <DialogContent>
                <DialogContentText>There is a new beta version of the Civil Service Pension Calculator for you to try.</DialogContentText>
                <DialogContentText sx={{ mt: 2 }}>
                    If you find a bug, would like to suggest a feature, or have other feedback, you can find a feedback form in the footer of the beta app.
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

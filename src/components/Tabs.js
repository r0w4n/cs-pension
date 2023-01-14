import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { Tab } from "@mui/material/";
import SettingsIcon from "@mui/icons-material/Settings";
import PropTypes from "prop-types";

function Tabs(props) {
    const [value, setValue] = window.localStorage.getItem("form") !== null ? useState("normal") : useState("settings");

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <TabList onChange={handleTabChange} variant="fullWidth" textColor="secondary" centered>
                <Tab label="Normal Retirement" value="normal" wrapped />
                <Tab label="Early Retirement" value="early" wrapped />
                <Tab icon={<SettingsIcon />} value="settings" wrapped />
            </TabList>
            {props.children}
        </TabContext>
    );
}

function TabContent(props) {
    return <TabPanel value={props.name}>{props.children}</TabPanel>;
}

Tabs.propTypes = {
    children: PropTypes.array
};

TabContent.propTypes = {
    name: PropTypes.string,
    children: PropTypes.object
};

export { Tabs, TabContent };

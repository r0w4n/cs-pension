import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material/";
import SettingsIcon from "@mui/icons-material/Settings";
import PropTypes from "prop-types";

function Tabs(props) {
    const handleTabChange = props.onTabChange;
    const tabSelection = props.tabSelection;

    return (
        <TabContext value={tabSelection}>
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
    children: PropTypes.array,
    tabSelection: PropTypes.string,
    onTabChange: PropTypes.func
};

TabContent.propTypes = {
    name: PropTypes.string,
    children: PropTypes.object
};

export { Tabs, TabContent };

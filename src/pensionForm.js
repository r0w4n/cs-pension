/**
 * @todo fix form ids
 */

import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PropTypes from "prop-types";

function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
}

class PensionForm extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.form = props.initialState;
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        if (isNumeric(value)) {
            this.form[name] = +value;
        } else {
            this.form[name] = value;
        }

        this.onChange(this.form);
    };

    render() {
        return (
            <Grid container direction={"column"} spacing={1}>
                <Grid item sx={{ mt: 2 }}>
                    <InputLabel>Age</InputLabel>
                    <Slider
                        name="age"
                        value={this.form.age}
                        min={16}
                        max={70}
                        step={1}
                        valueLabelDisplay="on"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item>
                    <InputLabel>Normal Pension Age</InputLabel>
                    <Slider
                        name="normalPensionAge"
                        value={this.form.normalPensionAge}
                        min={65}
                        max={68}
                        step={1}
                        valueLabelDisplay="on"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item>
                    <InputLabel>Early Retirement Age</InputLabel>
                    <Slider
                        name="earlyRetirementAge"
                        value={this.form.earlyRetirementAge}
                        min={55}
                        max={70}
                        step={1}
                        valueLabelDisplay="on"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item>
                    <InputLabel htmlFor="pension-pot">Current Pension Pot</InputLabel>
                    <FormControl fullWidth>
                        <Input
                            name="currentPensionPot"
                            value={this.form.currentPensionPot}
                            id="pension-pot"
                            startAdornment={<InputAdornment position="start">£</InputAdornment>}
                            type="number"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <InputLabel htmlFor="pensionable-earnings">Pensionable Earnings</InputLabel>
                    <FormControl fullWidth>
                        <Input
                            name="pensionableEarnings"
                            value={this.form.pensionableEarnings}
                            id="standard-adornment-amount"
                            startAdornment={<InputAdornment position="start">£</InputAdornment>}
                            type="number"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <InputLabel>Monthly Added Pension Payments(£)</InputLabel>
                    <Slider
                        name="monthlyAddedPensionPayment"
                        value={this.form.monthlyAddedPensionPayment}
                        min={0}
                        max={2000}
                        step={10}
                        valueLabelDisplay="on"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item>
                    <InputLabel id="addedPensionTypeInput">Added Pension Type</InputLabel>
                    <FormControl variant="standard" fullWidth>
                        <Select
                            name="addedPensionType"
                            value={this.form.addedPensionType}
                            labelId="addedPensionTypeInput"
                            id="demo-simple-select"
                            label="Added Pension Type"
                            onChange={this.handleChange}>
                            <MenuItem value="self">Self</MenuItem>
                            <MenuItem value="self+dependants">Self & Dependants</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <InputLabel id="EPALabel">EPA</InputLabel>
                    <FormControl variant="standard" fullWidth>
                        <Select
                            name="EPAPension"
                            value={this.form.EPAPension}
                            labelId="EPALabel"
                            id="EPAPension"
                            label="Added Pension Type"
                            onChange={this.handleChange}>
                            <MenuItem value="0">No EPA</MenuItem>
                            <MenuItem value="65">65</MenuItem>
                            <MenuItem value="66">66</MenuItem>
                            <MenuItem value="67">67</MenuItem>
                            <MenuItem value="68">68</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <InputLabel>Reduced Hours Age</InputLabel>
                    <Slider
                        name="reducedHoursAge"
                        value={this.form.reducedHoursAge}
                        min={30}
                        max={65}
                        step={1}
                        valueLabelDisplay="on"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item>
                    <InputLabel>Reduced Hours Percentage</InputLabel>
                    <Slider
                        name="reducedHoursPercentage"
                        value={this.form.reducedHoursPercentage}
                        min={0}
                        max={100}
                        step={1}
                        valueLabelDisplay="on"
                        onChange={this.handleChange}
                    />
                </Grid>
            </Grid>
        );
    }
}

PensionForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    initialState: PropTypes.object.isRequired
};

export default PensionForm;

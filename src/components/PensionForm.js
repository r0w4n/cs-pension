import React from "react";
import { FormControl, Select, MenuItem, Slider, InputLabel, Input, InputAdornment, Unstable_Grid2 as Grid } from "@mui/material";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import PropTypes from "prop-types";
import isNumeric from "isnumeric";

class PensionForm extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.form = props.initialState;
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.form[name] = isNumeric(value) ? +value : value;
        this.onChange(this.form);
    };

    render() {
        return (
            <form>
                <Grid container direction={"column"} spacing={1}>
                    <Grid sx={{ mt: 2 }} width="100%">
                        <InputLabel>Age</InputLabel>
                        <Slider name="age" value={this.form.age} min={16} max={70} step={1} valueLabelDisplay="on" onChange={this.handleChange} />
                    </Grid>
                    <Grid width="100%">
                        <InputLabel>
                            Normal Pension Age
                            <a href="https://www.gov.uk/state-pension-age" target="_blank" rel="noreferrer">
                                <InfoTwoToneIcon />
                            </a>
                        </InputLabel>
                        <Slider
                            name="normalPensionAge"
                            value={this.form.normalPensionAge}
                            min={65}
                            max={68}
                            step={1}
                            marks
                            valueLabelDisplay="on"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid width="100%">
                        <InputLabel htmlFor="currentPensionPot">
                            Accrued Pension To Date
                            <a
                                href="https://www.civilservicepensionscheme.org.uk/your-pension/yearly-pension-update/annual-benefit-statement-abs/"
                                target="_blank"
                                rel="noreferrer">
                                <InfoTwoToneIcon />
                            </a>
                        </InputLabel>
                        <FormControl fullWidth>
                            <Input
                                name="currentPensionPot"
                                value={this.form.currentPensionPot}
                                id="currentPensionPot"
                                startAdornment={<InputAdornment position="start">£</InputAdornment>}
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid width="100%">
                        <InputLabel htmlFor="pensionable-earnings">Pensionable Earnings</InputLabel>
                        <FormControl fullWidth>
                            <Input
                                name="pensionableEarnings"
                                value={this.form.pensionableEarnings}
                                id="pensionable-earnings"
                                startAdornment={<InputAdornment position="start">£</InputAdornment>}
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid width="100%">
                        <InputLabel htmlFor="early-retirementAge">Early Retirement Age</InputLabel>
                        <Slider
                            name="earlyRetirementAge"
                            id="early-retirementAge"
                            value={this.form.earlyRetirementAge}
                            min={55}
                            max={70}
                            step={1}
                            valueLabelDisplay="on"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid width="100%">
                        <InputLabel htmlFor="monthlyAddedPensionPayment">
                            Monthly Added Pension Payments(£)
                            <a
                                href="https://www.civilservicepensionscheme.org.uk/your-pension/managing-your-pension/increase-your-pension/added-pension/"
                                target="_blank"
                                rel="noreferrer">
                                <InfoTwoToneIcon />
                            </a>
                        </InputLabel>
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
                    <Grid width="100%">
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
                    <Grid width="100%">
                        <InputLabel id="EPAPension">
                            EPA
                            <a
                                // eslint-disable-next-line max-len
                                href="https://www.civilservicepensionscheme.org.uk/planning-for-retirement/what-are-my-options/early-retirement/epa-effective-pension-age/"
                                target="_blank"
                                rel="noreferrer">
                                <InfoTwoToneIcon />
                            </a>
                        </InputLabel>
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
                    <Grid width="100%">
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
                    <Grid width="100%">
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
                    <Grid width="100%">
                        <InputLabel>State Pension</InputLabel>
                        <FormControl fullWidth>
                            <Input
                                name="statePension"
                                value={this.form.statePension}
                                id="statePension"
                                startAdornment={<InputAdornment position="start">£</InputAdornment>}
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

PensionForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    initialState: PropTypes.shape({
        age: PropTypes.number.isRequired,
        currentPensionPot: PropTypes.number.isRequired,
        earlyRetirementAge: PropTypes.number.isRequired,
        monthlyAddedPensionPayment: PropTypes.number.isRequired,
        normalPensionAge: PropTypes.number.isRequired,
        addedPensionType: PropTypes.string.isRequired,
        pensionableEarnings: PropTypes.number.isRequired,
        EPAPension: PropTypes.number.isRequired,
        reducedHoursAge: PropTypes.number.isRequired,
        reducedHoursPercentage: PropTypes.number.isRequired,
        statePension: PropTypes.number.isRequired
    })
};

export default PensionForm;

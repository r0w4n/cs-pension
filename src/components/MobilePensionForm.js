import React from "react";
import { Button, TextField, Autocomplete, FormControl, Select, MenuItem, InputLabel, Input, InputAdornment, Unstable_Grid2 as Grid } from "@mui/material";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import PropTypes from "prop-types";
import isNumeric from "isnumeric";

class MobilePensionForm extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.form = props.initialState;
        this.changeTab = props.onChangeTab;
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
                    <Grid width="100%">
                        <InputLabel htmlFor="age">Age</InputLabel>
                        <Autocomplete
                            autoHighlight
                            autoSelect
                            disableClearable
                            getOptionLabel={(option) => String(option)}
                            id="age"
                            onChange={(event, value) => this.handleChange({ target: { name: "age", value: value } })}
                            options={[...Array(70 - 16 + 1).keys()].map((x) => x + 16)}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                            value={this.form.age}
                        />
                    </Grid>
                    <Grid width="100%">
                        <InputLabel htmlFor="normalPensionAge">
                            Normal Pension Age
                            <a href="https://www.gov.uk/state-pension-age" target="_blank" rel="noreferrer">
                                <InfoTwoToneIcon />
                            </a>
                        </InputLabel>
                        <FormControl variant="standard" fullWidth>
                            <Select
                                name="normalPensionAge"
                                value={this.form.normalPensionAge}
                                labelId="normalPensionAge"
                                id="normalPensionAge"
                                onChange={this.handleChange}>
                                <MenuItem value="65">65</MenuItem>
                                <MenuItem value="66">66</MenuItem>
                                <MenuItem value="67">67</MenuItem>
                                <MenuItem value="68">68</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid width="100%">
                        <InputLabel htmlFor="earlyRetirementAge">Early Retirement Age</InputLabel>
                        <FormControl variant="standard" fullWidth>
                            <Select
                                name="earlyRetirementAge"
                                value={this.form.earlyRetirementAge}
                                labelId="earlyRetirementAge"
                                id="earlyRetirementAge"
                                onChange={this.handleChange}>
                                <MenuItem value="55">55</MenuItem>
                                <MenuItem value="56">56</MenuItem>
                                <MenuItem value="57">57</MenuItem>
                                <MenuItem value="58">58</MenuItem>
                                <MenuItem value="59">59</MenuItem>
                                <MenuItem value="60">60</MenuItem>
                                <MenuItem value="61">61</MenuItem>
                                <MenuItem value="62">62</MenuItem>
                                <MenuItem value="63">63</MenuItem>
                                <MenuItem value="64">64</MenuItem>
                                <MenuItem value="65">65</MenuItem>
                                <MenuItem value="66">66</MenuItem>
                                <MenuItem value="67">67</MenuItem>
                                <MenuItem value="68">68</MenuItem>
                            </Select>
                        </FormControl>
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
                        <InputLabel htmlFor="pensionableEarnings">Pensionable Earnings</InputLabel>
                        <FormControl fullWidth>
                            <Input
                                name="pensionableEarnings"
                                value={this.form.pensionableEarnings}
                                id="pensionableEarnings"
                                startAdornment={<InputAdornment position="start">£</InputAdornment>}
                                type="number"
                                onChange={this.handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid width="100%">
                        <InputLabel htmlFor="monthlyAddedPensionPayment">
                            Monthly Added Pension Payments
                            <a
                                href="https://www.civilservicepensionscheme.org.uk/your-pension/managing-your-pension/increase-your-pension/added-pension/"
                                target="_blank"
                                rel="noreferrer">
                                <InfoTwoToneIcon />
                            </a>
                        </InputLabel>
                        <FormControl fullWidth>
                            <Input
                                name="monthlyAddedPensionPayment"
                                value={this.form.monthlyAddedPensionPayment}
                                id="monthlyAddedPensionPayment"
                                type="number"
                                onChange={this.handleChange}
                                startAdornment={<InputAdornment position="start">£</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid width="100%">
                        <InputLabel id="addedPensionType">Added Pension Type</InputLabel>
                        <FormControl variant="standard" fullWidth>
                            <Select
                                name="addedPensionType"
                                value={this.form.addedPensionType}
                                labelId="addedPensionType"
                                id="addedPensionType"
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
                            <Select name="EPAPension" value={this.form.EPAPension} labelId="EPAPension" id="EPAPension" onChange={this.handleChange}>
                                <MenuItem value="0">No EPA</MenuItem>
                                <MenuItem value="65">65</MenuItem>
                                <MenuItem value="66">66</MenuItem>
                                <MenuItem value="67">67</MenuItem>
                                <MenuItem value="68">68</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid width="100%">
                        <InputLabel id="reducedHoursAge">Reduced Hours Age</InputLabel>
                        <Autocomplete
                            autoHighlight
                            autoSelect
                            disableClearable
                            getOptionLabel={(option) => String(option)}
                            id="reducedHoursAge"
                            onChange={(event, value) => this.handleChange({ target: { name: "reducedHoursAge", value: value } })}
                            options={[...Array(70 - 16 + 1).keys()].map((x) => x + 16)}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                            value={this.form.reducedHoursAge}
                        />
                    </Grid>
                    <Grid width="100%">
                        <InputLabel id="reducedHoursPercentage">Reduced Hours Percentage</InputLabel>
                        <Autocomplete
                            autoHighlight
                            autoSelect
                            disableClearable
                            getOptionLabel={(option) => String(option)}
                            id="reducedHoursPercentage"
                            onChange={(event, value) => this.handleChange({ target: { name: "reducedHoursPercentage", value: value } })}
                            options={Array.from(Array(101).keys())}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                            value={this.form.reducedHoursPercentage}
                        />
                    </Grid>
                    <Grid width="100%">
                        <InputLabel htmlFor="statePension">
                            State Pension
                            <a href="https://www.gov.uk/browse/working/state-pension" target="_blank" rel="noreferrer">
                                <InfoTwoToneIcon />
                            </a>
                        </InputLabel>
                        <FormControl fullWidth>
                            <Input
                                name="statePension"
                                value={this.form.statePension}
                                id="statePension"
                                type="number"
                                onChange={this.handleChange}
                                startAdornment={<InputAdornment position="start">£</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid container width="100%">
                        <Grid xs={6}>
                            <Button variant="contained" onClick={this.changeTab} value="normal">
                                Calculate for Normal Retirement
                            </Button>
                        </Grid>
                        <Grid xs={6}>
                            <Button variant="contained" onClick={this.changeTab} value="early">
                                Calculate for Early Retirement
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

MobilePensionForm.propTypes = {
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
    }),
    onChangeTab: PropTypes.func
};

export default MobilePensionForm;

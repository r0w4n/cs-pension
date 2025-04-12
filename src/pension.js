import earlyPaymentReductionFactors from "./data/early_payment_reduction_factors.js";
import addedPensionByPeriodicalContributionFactors from "./data/added_pension_by_periodical_contribution_factors.js";
import addedPensionRevaluationFactorByYears from "./data/added_pension_revaluation_factors.js";

const pensionAccrualFactor = 0.0232;

/**
 * Pension Calculation Class
 *
 * @returns {Pension}
 */
class Pension {
    /**
     * @param {object} parameters
     */
    constructor(
        parameters = {
            age: 0,
            currentPensionPot: 0,
            retirementAge: 0,
            reducedHoursAge: 0,
            normalPensionAge: 0,
            monthlyAddedPensionPayment: 0,
            addedPensionType: "self",
            pensionableEarnings: 0,
            EPAPension: 0,
            reducedHoursPercentage: 0,
            statePension: 0
        }
    ) {
        this.parameters = parameters;
    }

    /**
     * Calculates the pension for a normal age retirement
     *
     * @returns {number}
     */
    calculatePensionNPA = () => {
        // number of years until retirement * yearly pension pot grown + existing pension pot
        return Math.round(this.getPensionableYears() * this.getYearlyPensionPotGrowth() + this.parameters.currentPensionPot);
    };

    /**
     * Calculates the pension for a normal age retirement with reduced hours
     *
     * @returns {number}
     */
    calculatePensionNPAWithReducedHours = () => {
        // number of years before reduced hours * yearly pension pot growth +
        // number of years between reduced hours and retirement * yearly pension pot growth (pro rata) +
        // current pension pot

        return Math.round(
            (this.parameters.reducedHoursAge - this.parameters.age) * this.getYearlyPensionPotGrowth() +
                (this.parameters.normalPensionAge - this.parameters.reducedHoursAge) * this.getYearlyPensionPotGrowth(true) +
                this.parameters.currentPensionPot
        );
    };

    /**
     * Calculates the pension at normal pension age with monthly added pension
     *
     * https://www.civilservicepensionscheme.org.uk/media/btmmnayj/alpha-added-pension-factors-and-guidance.pdf
     *
     * @returns {number}
     */
    calculatePensionNPAWithAddedPension = () => {
        // calculate added pension for time period +
        // calculate pension for NPA

        return Math.round(this.calculateAddedPensionForMultipleYears() + this.calculatePensionNPA());
    };

    /**
     * Calculates pension at normal pension age with added pension and reduced hours
     *
     * @returns {number}
     */
    calculatePensionNPAWithAddedPensionAndReducedHours = () => {
        // calculatePensionNPAWithReducedHours +
        // added pension of complete period

        return Math.round(this.calculatePensionNPAWithReducedHours() + this.calculateAddedPensionForMultipleYears());
    };

    /**
     * Calculates added pension for multiple years
     *
     * @param {boolean} earlyRetirement
     * @returns {float}
     */
    calculateAddedPensionForMultipleYears = (earlyRetirement = false) => {
        const earlyReductionFactor = this.getEarlyReductionFactors();

        let addedPensionPot = 0;
        let totalContributionsForYear = 12 * this.parameters.monthlyAddedPensionPayment;
        let retirementAge = earlyRetirement === true ? this.parameters.retirementAge : this.parameters.normalPensionAge;
        for (let age = this.parameters.age; age < retirementAge; age++) {
            addedPensionPot += this.calculateAddedPensionForYearForGivenAge(totalContributionsForYear, age);
        }

        return earlyRetirement === true ? addedPensionPot * earlyReductionFactor : addedPensionPot;
    };

    /**
     * Calculates added pension for the whole year for a given age
     *
     * @param {number} totalContributionsForPeriod the total contributed amount of added pension for the year
     * @param {number} age the age of the person for that year
     * @returns {number} added pension pot for that year
     */
    calculateAddedPensionForYearForGivenAge = (totalContributionsForPeriod, age) => {
        return Math.round(
            totalContributionsForPeriod / (this.getAddedPensionByPeriodicalContributionFactors(age) * this.getAddedPensionRevaluationFactorByYears(age))
        );
    };

    /**
     * Calculates the size of the pot by the time they get to early retirement age then
     * multiply by the Early Reduction Factor
     *
     * Limitations: Does not take in to account the months therefore is only accurate to the whole year
     *
     * @returns {number}
     */
    calculatePensionForEarlyRetirement = () => {
        // calculate the number of years between age and early retirement
        // calculate the size of the pot based on pensionable earnings and years before retirement
        // add existing pot of the calculated pot
        // multiply pot by early retirement factor
        const earlyReductionFactor = this.getEarlyReductionFactors();

        return Math.round((this.getPensionableYears(true) * this.getYearlyPensionPotGrowth() + this.parameters.currentPensionPot) * earlyReductionFactor);
    };

    /**
     * Calculates pension for early retirement with monthly added pension
     *
     * @returns {number}
     */
    calculatePensionForEarlyRetirementWithAddedPension = () => {
        return Math.round(this.calculateAddedPensionForMultipleYears(true) + this.calculatePensionForEarlyRetirement());
    };

    /**
     * Calculates pension for early retirement with reduced hours
     *
     * @returns {number}
     */
    calculatePensionForEarlyRetirementWithReducedHours = () => {
        // number of years before reduced hours * yearly pension pot growth +
        // number of years between reduced hours and retirement * yearly pension pot growth (pro rata) +
        // current pension pot
        // multiply pot by early retirement factor

        const earlyReductionFactor = this.getEarlyReductionFactors();

        return Math.round(
            ((this.parameters.reducedHoursAge - this.parameters.age) * this.getYearlyPensionPotGrowth() +
                (this.parameters.retirementAge - this.parameters.reducedHoursAge) * this.getYearlyPensionPotGrowth(true) +
                this.parameters.currentPensionPot) *
                earlyReductionFactor
        );
    };

    /**
     * Calculates pension for early retirement with monthly added pension and reduced hours
     *
     * @returns {number}
     */
    calculatePensionForEarlyRetirementWithAddedPensionReducedHours = () => {
        // calculatePensionForEarlyRetirementWithReducedHours +
        // added pension of complete period

        return Math.round(this.calculatePensionForEarlyRetirementWithReducedHours() + this.calculateAddedPensionForMultipleYears(true));
    };

    /**
     * Calculates the increase in pension pot size based on the yearly earnings and the pension accrual factor
     *
     * @param {boolean} reducedHours
     * @returns {integer}
     */
    getYearlyPensionPotGrowth = (reducedHours = false) => {
        let yearlyPensionPotGrowth = this.parameters.pensionableEarnings * pensionAccrualFactor;

        if (reducedHours === true) {
            yearlyPensionPotGrowth = yearlyPensionPotGrowth * (this.parameters.reducedHoursPercentage / 100);
        }

        return Math.round(yearlyPensionPotGrowth);
    };

    /**
     * Returns the number of pensionable years
     *
     * @param {boolean} earlyRetirement
     * @returns {integer}
     */
    getPensionableYears = (earlyRetirement = false) => {
        if (earlyRetirement === true) {
            return this.parameters.retirementAge - this.parameters.age;
        }

        return this.parameters.normalPensionAge - this.parameters.age;
    };

    /**
     * Returns the age at which the parameters will retire.
     * This will either be the parameters normal retirement age (NRA) or their EPA Retirement age
     *
     * @returns {integer}
     */
    getEffectiveNormalRetirementAge = () => {
        if (this.parameters.EPAPension > 0) {
            return this.parameters.EPAPension;
        }

        return this.parameters.normalPensionAge;
    };

    /**
     * https://www.civilservicepensionscheme.org.uk/media/oislhmme/early-and-late-retirement-factors-and-guidance-alpha.pdf
     *
     * @returns {float}
     */
    getEarlyReductionFactors = () => {
        if (this.parameters.drawPensionAge > this.getEffectiveNormalRetirementAge()) return 1;
        return earlyPaymentReductionFactors[this.getEffectiveNormalRetirementAge()][this.parameters.drawPensionAge];
    };

    /**
     * Gets the added pension by periodical contribution factors
     *
     * https://www.civilservicepensionscheme.org.uk/media/btmmnayj/alpha-added-pension-factors-and-guidance.pdf
     *
     * @param {age}
     * @returns {float}
     */
    getAddedPensionByPeriodicalContributionFactors = (age) => {
        let factorPart = addedPensionByPeriodicalContributionFactors[this.parameters.normalPensionAge][age];

        return factorPart[this.parameters.addedPensionType == "self+dependants" ? 2 : 0];
    };

    /**
     * Gets the added pension revaluation factor by years
     *
     * https://www.civilservicepensionscheme.org.uk/media/oislhmme/early-and-late-retirement-factors-and-guidance-alpha.pdf
     *
     * @param {age}
     * @returns {float}
     */
    getAddedPensionRevaluationFactorByYears = (age) => {
        var numberOfAprils = this.parameters.normalPensionAge - age;
        return addedPensionRevaluationFactorByYears[numberOfAprils > 0 ? numberOfAprils : 0].factor;
    };
}

/**
 * Calculates all of the different pension calculations
 *
 * @param {parameters}
 */
function calculatePensionPots(parameters) {
    const pension = new Pension(parameters);
    return {
        pensionForNPA: pension.calculatePensionNPA(),
        pensionForNPAWithAddedPension: pension.calculatePensionNPAWithAddedPension(),
        pensionForNPAWithReducedHours: pension.calculatePensionNPAWithReducedHours(),
        pensionForNPAWithAddedPensionAndReducedHours: pension.calculatePensionNPAWithAddedPensionAndReducedHours(),
        pensionForEarlyRetirement: pension.calculatePensionForEarlyRetirement(),
        pensionForEarlyRetirementWithAddedPension: pension.calculatePensionForEarlyRetirementWithAddedPension(),
        pensionForEarlyRetirementWithReducedHours: pension.calculatePensionForEarlyRetirementWithReducedHours(),
        pensionForEarlyRetirementWithAddedPensionReducedHours: pension.calculatePensionForEarlyRetirementWithAddedPensionReducedHours()
    };
}

export { Pension, calculatePensionPots };

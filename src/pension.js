import earlyPaymentReductionFactors from "./data/early_payment_reduction_factors.js";
import addedPensionByPeriodicalContributionFactors from "./data/added_pension_by_periodical_contribution_factors.js";
import addedPensionRevaluationFactorByYears from "./data/added_pension_revaluation_factors.js";

const pensionAccrualFactor = 0.0232;
const statePension = 9660;

/**
 * Pension Calulation Class
 * @return {Pension}
 * @todo fix when reduced hours age is less that current age
 */
class Pension {
    /**
     * @param {object} parameters
     */
    constructor(parameters) {
        this.parameters = parameters;
    }

    /**
     * Calulates the pension for a normal age retirement
     *
     * @return {integer}
     */
    calculatePensionForNormalPensionAge = () => {
        // number of years until retirement * yearly pension pot grown + existing pension pot
        return Math.round(this.getPensionableYears() * this.getYearlyPensionPotGrowth() + this.parameters.currentPensionPot);
    };

    /**
     * Calulates the pension for a normal age retirement with reduced hours
     *
     * @return {integer}
     */
    calculatePensionForNormalPensionAgeWithReducedHours = () => {
        // number of years before reduced hours * yearly pension pot growth +
        // number of years between reduced hours and retirement * yearly pension pot growth (pro rata) +
        // current pension pot

        return Math.round(
            (this.parameters.reducedHoursAge - this.parameters.age) * this.getYearlyPensionPotGrowth() +
                (this.parameters.normalPensionAge - this.parameters.reducedHoursAge) * this.getYearlyPensionPotGrowth(true) +
                this.parameters.currentPensionPot
        );
    };

    calculatePensionNormalRetirementAddedPensionReducedHours = () => {
        // calculatePensionForNormalPensionAgeWithReducedHours +
        // added pension of complete period

        return Math.round(this.calculatePensionForNormalPensionAgeWithReducedHours() + this.calculateAddedPensionForMultipleYears());
    };

    /**
     *
     * https://www.civilservicepensionscheme.org.uk/media/btmmnayj/alpha-added-pension-factors-and-guidance.pdf
     * @param {*} parameters
     * @return {number}
     */
    calculatePensionNormalRetirementWithMonthlyAddedPension = () => {
        return Math.round(this.calculateAddedPensionForMultipleYears() + this.calculatePensionForNormalPensionAge());
    };

    /**
     *
     * @param {boolean} earlyRetirement
     * @return {float}
     *
     * @todo unit test
     */
    calculateAddedPensionForMultipleYears = (earlyRetirement = false) => {
        let addedPensionPot = 0;
        let totalContributionsForYear = 12 * this.parameters.monthlyAddedPensionPayment;
        let retirementAge = earlyRetirement === true ? this.parameters.earlyRetirementAge : this.parameters.normalPensionAge;
        for (let age = this.parameters.age; age < retirementAge; age++) {
            addedPensionPot += this.calulateAddedPensionForYearForGivenAge(totalContributionsForYear, age);
        }

        return addedPensionPot;
    };

    /**
     *
     * @param {integer} totalContributionsForPeriod
     * @param {integer} age
     * @return integer
     */
    calulateAddedPensionForYearForGivenAge = (totalContributionsForPeriod, age) => {
        return Math.round(
            totalContributionsForPeriod / (this.getAddedPensionByPeriodicalContributionFactors(age) * this.getAddedPensionRevaluationFactorByYears(age))
        );
    };

    /**
     * Calculates the size of the pot by the time they get to early retirement age then
     * mutiply by the Early Reduction Factor
     *
     * Limitations: Does not take in to account the months therefore is only accurate to the whole year
     *
     * @param {*} parameters
     * @return {number}
     */
    calculatePensionForEarlyRetirement = () => {
        const earlyReductionFactor = this.getEarlyReductionFactors();

        return Math.round(
            (this.getPensionableYears(true) * // find the number of years between age and early retirement
                this.getYearlyPensionPotGrowth() + // calculate the size of the pot based on pensionable earnings and years before retirement
                this.parameters.currentPensionPot) * // add existing pot of the calculated pot
                earlyReductionFactor // multiply pot by early retirement factory
        );
    };

    /**
     *
     * @return {integer}
     */
    calculatePensionEarlyRetirementMonthlyAddedPension = () => {
        return Math.round(this.calculateAddedPensionForMultipleYears(true) + this.calculatePensionForEarlyRetirement());
    };

    calculatePensionForEarlyRetirementWithReducedHours = () => {
        // number of years before reduced hours * yearly pension pot growth +
        // number of years between reduced hours and retirement * yearly pension pot growth (pro rata) +
        // current pension pot
        return Math.round(
            (this.parameters.reducedHoursAge - this.parameters.age) * this.getYearlyPensionPotGrowth() +
                (this.parameters.earlyRetirementAge - this.parameters.reducedHoursAge) * this.getYearlyPensionPotGrowth(true)
        );
    };

    calculatePensionForEarlyRetirementWithAddedPensionReducedHours = () => {
        // calculatePensionForEarlyRetirementWithReducedHours +
        // added pension of complete period

        return Math.round(this.calculatePensionForEarlyRetirementWithReducedHours() + this.calculateAddedPensionForMultipleYears(true));
    };

    /**
     * Calculates the increase in pension pot size based on the yearly earnings and the pension accrual factor
     * @param {boolean} reducedHours
     * @return {integer}
     */
    getYearlyPensionPotGrowth = (reducedHours = false) => {
        let yearlyPensionPotGrowth = this.parameters.pensionableEarnings * pensionAccrualFactor;

        if (reducedHours === true) {
            console.info(yearlyPensionPotGrowth);
            yearlyPensionPotGrowth = yearlyPensionPotGrowth * (this.parameters.reducedHoursPercentage / 100);
            console.info(yearlyPensionPotGrowth);
        }

        return Math.round(yearlyPensionPotGrowth);
    };

    /**
     * Returns the number of pensionable years
     *
     * @param {boolean} earlyRetirement
     * @return {integer}
     */
    getPensionableYears = (earlyRetirement = false) => {
        if (earlyRetirement === true) {
            return this.parameters.earlyRetirementAge - this.parameters.age;
        }

        return this.parameters.normalPensionAge - this.parameters.age;
    };

    /**
     * Returns the age at which the parameters will retire.
     * This will either be the parameterss nornal retirement age (NRA) or their EPA Retirement age
     *
     * @return {integer}
     */
    getEffectiveNormalRetirementAge = () => {
        if (this.parameters.EPAPension > 0) {
            return this.parameters.EPAPension;
        }

        return this.parameters.normalPensionAge;
    };

    /**
     * https://www.civilservicepensionscheme.org.uk/media/oislhmme/early-and-late-retirement-factors-and-guidance-alpha.pdf
     * @return {float}
     */
    getEarlyReductionFactors = () => {
        return earlyPaymentReductionFactors[this.getEffectiveNormalRetirementAge()][this.parameters.earlyRetirementAge];
    };

    /**
     *
     * https://www.civilservicepensionscheme.org.uk/media/btmmnayj/alpha-added-pension-factors-and-guidance.pdf
     * @return {float}
     */
    getAddedPensionByPeriodicalContributionFactors = (age) => {
        let factorPart = addedPensionByPeriodicalContributionFactors[this.parameters.normalPensionAge][age];

        return factorPart[this.parameters.addedPensionType == "self+dependants" ? 2 : 0];
    };

    /**
     *
     * https://www.civilservicepensionscheme.org.uk/media/oislhmme/early-and-late-retirement-factors-and-guidance-alpha.pdf
     * @param {boolean} earlyRetirement
     * @return {float}
     */
    getAddedPensionRevaluationFactorByYears = (age) => {
        return addedPensionRevaluationFactorByYears[this.parameters.normalPensionAge - age].factor;
    };
}

function calculatePensionPots(parameters) {
    const pension = new Pension(parameters);
    return {
        pensionForNormalPensionAge: pension.calculatePensionForNormalPensionAge(),
        pensionForEarlyRetirement: pension.calculatePensionForEarlyRetirement(parameters),
        pensionWithMonthlyAddedPension: pension.calculatePensionNormalRetirementWithMonthlyAddedPension(parameters),
        pensionEarlyRetirementMonthlyAddedPension: pension.calculatePensionEarlyRetirementMonthlyAddedPension(parameters),
        pensionForNormalPensionAgeWithReducedHours: pension.calculatePensionForNormalPensionAgeWithReducedHours(),
        pensionNormalRetirementAddedPensionReducedHours: pension.calculatePensionNormalRetirementAddedPensionReducedHours(),
        pensionForEarlyRetirementWithReducedHours: pension.calculatePensionForEarlyRetirementWithReducedHours(),
        pensionForEarlyRetirementWithAddedPensionReducedHours: pension.calculatePensionForEarlyRetirementWithAddedPensionReducedHours()
    };
}

export { Pension, statePension, calculatePensionPots };

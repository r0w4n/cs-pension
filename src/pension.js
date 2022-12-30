import earlyPaymentReductionFactors from "./data/early_payment_reduction_factors.js";
import addedPensionByPeriodicalContributionFactors from "./data/added_pension_by_periodical_contribution_factors.js";
import addedPensionRevaluationFactorByYears from "./data/added_pension_revaluation_factors.js";

const pensionAccrualFactor = 0.0232;
const statePension = 9660;

/**
 * Pension Calulation Class
 * @return {Pension}
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
        // number of years until retirement * yearly pension pot grown + exiting pension pot
        return Math.round(
            this.getPensionableYears() * this.getYearlyPensionPotGrowth() +
                this.parameters.currentPensionPot
        );
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

        console.info(
            this.parameters.reducedHoursAge - this.parameters.age,
            this.getYearlyPensionPotGrowth()
        );
        console.info(
            this.parameters.normalPensionAge - this.parameters.reducedHoursAge,
            this.getYearlyPensionPotGrowth(true)
        );

        return Math.round(
            (this.parameters.reducedHoursAge - this.parameters.age) *
                this.getYearlyPensionPotGrowth() +
                (this.parameters.normalPensionAge - this.parameters.reducedHoursAge) *
                    this.getYearlyPensionPotGrowth(true) +
                this.parameters.currentPensionPot
        );
    };

    calculatePensionNormalRetirementAddedPensionReducedHours = () => {
        // calculatePensionForNormalPensionAgeWithReducedHours +
        // added pension of complete period

        return Math.round(
            this.calculatePensionForNormalPensionAgeWithReducedHours() +
                this.calculateAddedPensionForMultipleYears()
        );
    };

    /**
     *
     * https://www.civilservicepensionscheme.org.uk/media/btmmnayj/alpha-added-pension-factors-and-guidance.pdf
     * @param {*} parameters
     * @return {number}
     */
    calculatePensionWithMonthlyAddedPension = () => {
        return Math.round(
            this.calculateAddedPensionForMultipleYears() +
                this.calculatePensionForNormalPensionAge()
        );
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
        for (let index = this.getPensionableYears(earlyRetirement); index > 0; index--) {
            addedPensionPot +=
                ((12 * this.parameters.monthlyAddedPensionPayment) /
                    this.getAddedPensionByPeriodicalContributionFactors(this.parameters)) *
                this.getAddedPensionRevaluationFactorByYears(earlyRetirement);
        }

        return addedPensionPot;
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
        return Math.round(
            this.calculateAddedPensionForMultipleYears(true) +
                this.calculatePensionForEarlyRetirement()
        );
    };

    calculatePensionForEarlyRetirementWithReducedHours = () => {
        // number of years before reduced hours * yearly pension pot growth +
        // number of years between reduced hours and retirement * yearly pension pot growth (pro rata) +
        // current pension pot

        // console.info("number of years before reduced hours", this.parameters.reducedHoursAge - this.parameters.age, this.getYearlyPensionPotGrowth());
        // console.info("number of years after reduced hours", this.parameters.earlyRetirementAge - this.parameters.reducedHoursAge,
        //     this.getYearlyPensionPotGrowth(true));

        return Math.round(
            (this.parameters.reducedHoursAge - this.parameters.age) *
                this.getYearlyPensionPotGrowth() +
                (this.parameters.earlyRetirementAge - this.parameters.reducedHoursAge) *
                    this.getYearlyPensionPotGrowth(true) +
                this.parameters.currentPensionPot
        );
    };

    calculatePensionForEarlyRetirementWithAddedPensionReducedHours = () => {
        // calculatePensionForEarlyRetirementWithReducedHours +
        // added pension of complete period

        return Math.round(
            this.calculatePensionForEarlyRetirementWithReducedHours() +
                this.calculateAddedPensionForMultipleYears(true)
        );
    };

    /**
     * Calculates the increase in pension pot size based on the yearly earnings and the pension accrual factor
     * @param {boolean} reducedHours
     * @return {integer}
     */
    getYearlyPensionPotGrowth = (reducedHours = false) => {
        let yearlyPensionPotGrowth = this.parameters.pensionableEarnings * pensionAccrualFactor;

        if (reducedHours === true) {
            yearlyPensionPotGrowth =
                yearlyPensionPotGrowth * (this.parameters.reducedHoursPercentage / 100);
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
        return earlyPaymentReductionFactors[this.getEffectiveNormalRetirementAge()][
            this.parameters.earlyRetirementAge
        ];
    };

    /**
     *
     * https://www.civilservicepensionscheme.org.uk/media/btmmnayj/alpha-added-pension-factors-and-guidance.pdf
     * @return {float}
     */
    getAddedPensionByPeriodicalContributionFactors = () => {
        return addedPensionByPeriodicalContributionFactors[this.parameters.age][
            this.parameters.addedPensionType
        ];
    };

    /**
     *
     * https://www.civilservicepensionscheme.org.uk/media/oislhmme/early-and-late-retirement-factors-and-guidance-alpha.pdf
     * @param {boolean} earlyRetirement
     * @return {float}
     */
    getAddedPensionRevaluationFactorByYears = (earlyRetirement = false) => {
        return addedPensionRevaluationFactorByYears[this.getPensionableYears(earlyRetirement)]
            .factor;
    };
}

function calculatePensionPots(parameters) {
    const pension = new Pension(parameters);
    return {
        pensionForNormalPensionAge: pension.calculatePensionForNormalPensionAge(),
        pensionForEarlyRetirement: pension.calculatePensionForEarlyRetirement(parameters),
        pensionWithMonthlyAddedPension: pension.calculatePensionWithMonthlyAddedPension(parameters),
        pensionEarlyRetirementMonthlyAddedPension:
            pension.calculatePensionEarlyRetirementMonthlyAddedPension(parameters),
        pensionForNormalPensionAgeWithReducedHours:
            pension.calculatePensionForNormalPensionAgeWithReducedHours(),
        pensionNormalRetirementAddedPensionReducedHours:
            pension.calculatePensionNormalRetirementAddedPensionReducedHours(),
        pensionForEarlyRetirementWithReducedHours:
            pension.calculatePensionForEarlyRetirementWithReducedHours(),
        pensionForEarlyRetirementWithAddedPensionReducedHours:
            pension.calculatePensionForEarlyRetirementWithAddedPensionReducedHours()
    };
}

export { Pension, statePension, calculatePensionPots };

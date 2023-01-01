/* eslint-disable max-len */
import { Pension } from "../src/pension";

test("calculate pension when aged 45, pensionable earnings are £30000 with a pension pot of £1000 and normal pension age of 67", () => {
    let pension = new Pension({
        age: 45,
        pensionableEarnings: 30000,
        currentPensionPot: 1000,
        normalPensionAge: 67
    });
    expect(pension.calculatePensionNPA()).toBe(16312);
});

test("calculate pension when aged 33, pensionable earnings are £40000 with a pension pot of £9000 and normal pension age of 68", () => {
    let pension = new Pension({
        age: 33,
        pensionableEarnings: 40000,
        currentPensionPot: 9000,
        normalPensionAge: 68
    });
    expect(pension.calculatePensionNPA()).toBe(41480);
});

test("calculate pension when aged 49, pensionable earnings are £40000 with a pension pot of £9000 and normal pension age of 67", () => {
    let pension = new Pension({
        age: 49,
        pensionableEarnings: 40000,
        currentPensionPot: 0,
        normalPensionAge: 67
    });
    expect(pension.calculatePensionNPA()).toBe(16704);
});

/**
 * @todo double check
 */
test("calculate early retirement pension when aged 33, pensionable earnings are £40000 with a pension pot of £9000 and normal pension age of 55", () => {
    let pension = new Pension({
        age: 33,
        pensionableEarnings: 40000,
        currentPensionPot: 9000,
        earlyRetirementAge: 55,
        normalPensionAge: 67
    });
    expect(pension.calculatePensionForEarlyRetirement()).toBe(16120);
});

test("get normal retirement age when 67 and EPA Pension is 67", () => {
    let pension = new Pension({ normalPensionAge: 67, EPAPension: 67 });
    expect(pension.getEffectiveNormalRetirementAge()).toBe(67);
});

test("get normal retirement age when 67 and EPA Pension is 66", () => {
    let pension = new Pension({ normalPensionAge: 67, EPAPension: 66 });
    expect(pension.getEffectiveNormalRetirementAge()).toBe(66);
});

test("get normal retirement age when 67 and EPA Pension is 65", () => {
    let pension = new Pension({ normalPensionAge: 67, EPAPension: 65 });
    expect(pension.getEffectiveNormalRetirementAge()).toBe(65);
});

test("get the yearly pot growth when pensionalble earnings is 40000", () => {
    let pension = new Pension({ pensionableEarnings: 40000 });
    expect(pension.getYearlyPensionPotGrowth()).toBe(928);
});

test("get the yearly pot growth when pensionalble earnings is 12000", () => {
    let pension = new Pension({ pensionableEarnings: 12000 });
    expect(pension.getYearlyPensionPotGrowth()).toBe(278);
});

test("get the yearly pot growth when pensionalble earnings is 40000, with reduced hours of 66%", () => {
    let pension = new Pension({
        pensionableEarnings: 40000,
        reducedHoursPercentage: 66
    });
    expect(pension.getYearlyPensionPotGrowth(true)).toBe(612);
});

test("get the yearly pot growth when pensionalble earnings is 12000, with reduced hours of 30%", () => {
    let pension = new Pension({
        pensionableEarnings: 12000,
        reducedHoursPercentage: 30
    });
    expect(pension.getYearlyPensionPotGrowth(true)).toBe(84);
});

test("get added pension revaluation factor by years of 15", () => {
    let pension = new Pension({ normalPensionAge: 65 });
    expect(pension.getAddedPensionRevaluationFactorByYears(50)).toBe(1.35);
});

test("get added pension revaluation factor by years of 4", () => {
    let pension = new Pension({ normalPensionAge: 65 });
    expect(pension.getAddedPensionRevaluationFactorByYears(61)).toBe(1.08);
});

test("get added pension periodical contribution factor when aged 37 and NPA is 65", () => {
    let pension = new Pension({ normalPensionAge: 65 });
    expect(pension.getAddedPensionByPeriodicalContributionFactors(37)).toBe(5.87);
});

test("get added pension periodical contribution factor when aged 26 and NPA is 65 and pension type is self and dependants", () => {
    let pension = new Pension({ normalPensionAge: 65, addedPensionType: "self+dependants" });
    expect(pension.getAddedPensionByPeriodicalContributionFactors(26)).toBe(4.04);
});

test("get added pension periodical contribution factor when aged 44 and NPA is 66", () => {
    let pension = new Pension({ normalPensionAge: 66 });
    expect(pension.getAddedPensionByPeriodicalContributionFactors(44)).toBe(7.26);
});

test("get added pension periodical contribution factor when aged 66 and NPA is 66 and pension type is self and dependants", () => {
    let pension = new Pension({ normalPensionAge: 66, addedPensionType: "self+dependants" });
    expect(pension.getAddedPensionByPeriodicalContributionFactors(66)).toBe(18.31);
});

test("get added pension periodical contribution factor when aged 23 and NPA is 67", () => {
    let pension = new Pension({ normalPensionAge: 67 });
    expect(pension.getAddedPensionByPeriodicalContributionFactors(23)).toBe(2.91);
});

test("get added pension periodical contribution factor when aged 55 and NPA is 67 and pension type is self and dependants", () => {
    let pension = new Pension({ normalPensionAge: 67, addedPensionType: "self+dependants" });
    expect(pension.getAddedPensionByPeriodicalContributionFactors(55)).toBe(11.3);
});

test("get added pension periodical contribution factor when aged 44 and NPA is 68", () => {
    let pension = new Pension({ normalPensionAge: 68 });
    expect(pension.getAddedPensionByPeriodicalContributionFactors(44)).toBe(6.33);
});

test("get added pension periodical contribution factor when aged 42 and NPA is 68 and pension type is self and dependants", () => {
    let pension = new Pension({ normalPensionAge: 68, addedPensionType: "self+dependants" });
    expect(pension.getAddedPensionByPeriodicalContributionFactors(42)).toBe(6.36);
});

test("calculate pension when aged 45, pensionable earnings are £40000 with a pension pot of £0 and normal pension age of 67, reducing hours at 50 to 50%", () => {
    let pension = new Pension({
        age: 45,
        pensionableEarnings: 40000,
        currentPensionPot: 0,
        normalPensionAge: 67,
        reducedHoursAge: 50,
        reducedHoursPercentage: 50
    });
    expect(pension.calculatePensionNPAWithReducedHours()).toBe(12528);
});

test("calculate pension when aged 30, pensionable earnings are £30000 with a pension pot of £1000 and normal pension age of 67, reducing hours at 45 to 30%", () => {
    let pension = new Pension({
        age: 30,
        pensionableEarnings: 30000,
        currentPensionPot: 1000,
        normalPensionAge: 67,
        reducedHoursAge: 45,
        reducedHoursPercentage: 30
    });
    expect(pension.calculatePensionNPAWithReducedHours()).toBe(16038);
});

test("calculate pension when aged 36, pensionable earnings are £42342 with a pension pot of £5345 and normal pension age of 68, reducing hours at 48 to 43%", () => {
    let pension = new Pension({
        age: 36,
        pensionableEarnings: 42342,
        currentPensionPot: 5345,
        normalPensionAge: 68,
        reducedHoursAge: 48,
        reducedHoursPercentage: 43
    });
    expect(pension.calculatePensionNPAWithReducedHours()).toBe(25569);
});

test("calulate Added Pension For Year For Given Age when \
    aged 35, \
    added pension payments of £200 per month, therefore £2400 for the year\
    normal pension age of 68\
    and pension typs is self+dependants", () => {
    let pension = new Pension({
        normalPensionAge: 68,
        addedPensionType: "self+dependants"
    });

    expect(pension.calculateAddedPensionForYearForGivenAge(2400, 35)).toBe(259);
});

test("calulate Added Pension For Year For Given Age when \
    aged 45, \
    added pension payments of £100 per month, therefore £1200 for the year\
    normal pension age of 67\
    and pension typs is self+dependants", () => {
    let pension = new Pension({
        normalPensionAge: 67,
        addedPensionType: "self+dependants"
    });

    expect(pension.calculateAddedPensionForYearForGivenAge(1200, 45)).toBe(101);
});

test("calulate Added Pension For Year For Given Age when \
    aged 22, \
    added pension payments of £145 per month, therefore £1740 for the year\
    normal pension age of 68\
    and pension typs is self", () => {
    let pension = new Pension({
        normalPensionAge: 68
    });

    expect(pension.calculateAddedPensionForYearForGivenAge(1740, 22)).toBe(268);
});

test("calculate Added Pension For Multiple Years when \
    aged 60, \
    added pension payments of £100 per month\
    normal pension age of 67\
    and pension typs is self", () => {
    let pension = new Pension({
        age: 60,
        normalPensionAge: 67,
        monthlyAddedPensionPayment: 100
    });

    expect(pension.calculateAddedPensionForMultipleYears()).toBe(535);
});

test("calculate Added Pension For Multiple Years when \
    aged 55, \
    added pension payments of £250 per month\
    normal pension age of 68\
    and pension typs is self+dependants", () => {
    let pension = new Pension({
        age: 55,
        normalPensionAge: 68,
        monthlyAddedPensionPayment: 250,
        addedPensionType: "self+dependants"
    });

    expect(pension.calculateAddedPensionForMultipleYears()).toBe(2545);
});

test("calculate Added Pension For Multiple Years when \
    aged 55, \
    added pension payments of £250 per month\
    normal pension age of 68\
    and pension typs is self+dependants\
    and retiring at 60", () => {
    let pension = new Pension({
        age: 55,
        normalPensionAge: 68,
        monthlyAddedPensionPayment: 250,
        addedPensionType: "self+dependants",
        earlyRetirementAge: 60
    });

    expect(pension.calculateAddedPensionForMultipleYears(true)).toBe(1057);
});

// only testing once as this funciton is an composite function whose components have already been tested
test("calculate pension For NPA With Added Pension And Reduced Hours when:", () => {
    let pension = new Pension({
        age: 55,
        pensionableEarnings: 40000,
        currentPensionPot: 0,
        normalPensionAge: 68,
        reducedHoursAge: 50,
        reducedHoursPercentage: 50,
        monthlyAddedPensionPayment: 250,
        addedPensionType: "self+dependants"
    });

    expect(pension.calculatePensionNPAWithAddedPensionAndReducedHours()).toBe(6257);
});

// only testing once as this funciton is an composite function whose components have already been tested
test("calculate Pension NPA With Monthly Added Pension when:", () => {
    let pension = new Pension({
        age: 45,
        pensionableEarnings: 30000,
        currentPensionPot: 1000,
        normalPensionAge: 67,
        monthlyAddedPensionPayment: 250,
        addedPensionType: "self+dependants"
    });

    expect(pension.calculatePensionNPAWithMonthlyAddedPension()).toBe(20896);
});

// only testing once as this funciton is an composite function whose components have already been tested
test("calculate Pension For Early Retirement Monthly Added Pension when:", () => {
    let pension = new Pension({
        age: 33,
        pensionableEarnings: 40000,
        currentPensionPot: 9000,
        earlyRetirementAge: 55,
        normalPensionAge: 67,
        monthlyAddedPensionPayment: 250,
        addedPensionType: "self+dependants"
    });
    expect(pension.calculatePensionForEarlyRetirementMonthlyAddedPension()).toBe(21925);
});

// calculatePensionForEarlyRetirementWithReducedHours

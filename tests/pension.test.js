import {Pension } from '../src/pension';

test('calculate pension when aged 45, pensionable earnings are £30000 with a pension pot of £1000 and normal pension age of 67', () => {
    let pension = new Pension({ age: 45, pensionableEarnings: 30000, currentPensionPot: 1000, normalPensionAge: 67 });
    expect(pension.calculatePensionForNormalPensionAge()).toBe(16312);
});

test('calculate pension when aged 33, pensionable earnings are £40000 with a pension pot of £9000 and normal pension age of 68', () => {
    let pension = new Pension({ 'age': 33, pensionableEarnings: 40000, currentPensionPot: 9000, normalPensionAge: 68 });
    expect(pension.calculatePensionForNormalPensionAge()).toBe(41480);
});

test('calculate pension when aged 49, pensionable earnings are £40000 with a pension pot of £9000 and normal pension age of 67', () => {
    let pension = new Pension({ age: 49, pensionableEarnings: 40000, currentPensionPot: 0, normalPensionAge: 67 });
    expect(pension.calculatePensionForNormalPensionAge()).toBe(16704);
});

test('calculate early retirement pension when aged 33, pensionable earnings are £40000 with a pension pot of £9000 and normal pension age of 55', () => {
    let pension = new Pension({ age: 33, pensionableEarnings: 40000, currentPensionPot: 9000, earlyRetirementAge: 55, normalPensionAge: 67 });
    expect(pension.calculatePensionForEarlyRetirement()).toBe(16120);
});

test('get normal retirement age when 67 and EPA Pension is 67', () => {
    let pension = new Pension({normalPensionAge: 67, EPAPension: 67});
    expect(pension.getEffectiveNormalRetirementAge()).toBe(67);
});

test('get normal retirement age when 67 and EPA Pension is 66', () => {
    let pension = new Pension({normalPensionAge: 67, EPAPension: 66});
    expect(pension.getEffectiveNormalRetirementAge()).toBe(66);
});

test('get normal retirement age when 67 and EPA Pension is 65', () => {
    let pension = new Pension({normalPensionAge: 67, EPAPension: 65});
    expect(pension.getEffectiveNormalRetirementAge()).toBe(65);
});

test('get the yearly pot growth when pensionalble earnings is 40000', () => {
    let pension = new Pension({pensionableEarnings: 40000});
    expect(pension.getYearlyPensionPotGrowth()).toBe(928);
});

test('get the yearly pot growth when pensionalble earnings is 12000', () => {
    let pension = new Pension({pensionableEarnings: 12000});
    expect(pension.getYearlyPensionPotGrowth()).toBe(278);
});

test('get the yearly pot growth when pensionalble earnings is 40000, with reduced hours of 66%', () => {
    let pension = new Pension({pensionableEarnings: 40000, reducedHoursPercentage: 66});
    expect(pension.getYearlyPensionPotGrowth(true)).toBe(612);
});

test('get the yearly pot growth when pensionalble earnings is 12000, with reduced hours of 30%', () => {
    let pension = new Pension({pensionableEarnings: 12000, reducedHoursPercentage: 30});
    expect(pension.getYearlyPensionPotGrowth(true)).toBe(84);
});


test('get added pension revaluation factor by years of 15', () => {
    let pension = new Pension({normalPensionAge: 65, age: 50});
    expect(pension.getAddedPensionRevaluationFactorByYears()).toBe(1.35);
});

test('get added pension revaluation factor by years of 4', () => {
    let pension = new Pension({normalPensionAge: 65, age: 61});
    expect(pension.getAddedPensionRevaluationFactorByYears()).toBe(1.08);
});

test('get added pension periodical contribution factor when 37', () => {
    let pension = new Pension({addedPensionType: "self", age: 37});
    expect(pension.getAddedPensionByPeriodicalContributionFactors()).toBe(5.73);
});

test('get added pension periodical contribution factor when 26 and pension type is self and dependants', () => {
    let pension = new Pension({addedPensionType: "self+dependants", age: 26});
    expect(pension.getAddedPensionByPeriodicalContributionFactors()).toBe(3.95);
});

test('calculate pension when aged 45, pensionable earnings are £40000 with a pension pot of £0 and normal pension age of 67, reducing hours at 50 to 50%', () => {
    let pension = new Pension({ age: 45, pensionableEarnings: 40000, currentPensionPot: 0, normalPensionAge: 67,  reducedHoursAge: 50, reducedHoursPercentage: 50});
    expect(pension.calculatePensionForNormalPensionAgeWithReducedHours()).toBe(12528);
});

test('calculate pension when aged 30, pensionable earnings are £30000 with a pension pot of £1000 and normal pension age of 67, reducing hours at 45 to 30%', () => {
    let pension = new Pension({ age: 30, pensionableEarnings: 30000, currentPensionPot: 1000, normalPensionAge: 67,  reducedHoursAge: 45, reducedHoursPercentage: 30});
    expect(pension.calculatePensionForNormalPensionAgeWithReducedHours()).toBe(16038);
});

test('calculate pension when aged 36, pensionable earnings are £42342 with a pension pot of £5345 and normal pension age of 68, reducing hours at 48 to 43%', () => {
    let pension = new Pension({ age: 36, pensionableEarnings: 42342, currentPensionPot: 5345, normalPensionAge: 68,  reducedHoursAge: 48, reducedHoursPercentage: 43});
    expect(pension.calculatePensionForNormalPensionAgeWithReducedHours()).toBe(25569);
});

// test('something', () => {
//     // £200
//     let pension = new Pension({normalPensionAge: 67, age: 30, monthlyAddedPensionPayment: 200, addedPensionType: self, pensionableEarnings: 30000, currentPensionPot: 0});
//     expect(pension.calculatePensionWithMonthlyAddedPension()).toBe(3.95);
// });
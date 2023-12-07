const MAX_HP_STAT_VALUE = 720;
const MAX_OTHER_STAT_VALUE = 250;


export const calculateTotalStats = (stat, baseStats = {}, ivStats = {}, evStats = {}, pokemonLevel, nature, natures = {}) => {
    let totalStat;
    let level = Number(pokemonLevel); // Ensure pokemonLevel is a number

    // Check if the stats objects and the stat property are defined
    if (baseStats[stat] !== undefined && ivStats[stat] !== undefined && evStats[stat] !== undefined) {
        if (stat === 'hp') {
            totalStat = Math.floor(((2 * baseStats[stat] + ivStats[stat] + Math.floor(evStats[stat] / 4)) * level / 100));
        } else {
            totalStat = Math.floor(((2 * baseStats[stat] + ivStats[stat] + Math.floor(evStats[stat] / 4)) * level / 100));
        }

        // add level and 10 (for HP) or 5 (for other stats) after rounding down
        if (stat === 'hp') {
            totalStat += level + 10;
        } else {
            totalStat += 5;
        }

        // adjust the stat based on the nature
        const natureEffect = natures[nature];
        if (natureEffect) {
            if (natureEffect.increase === stat) {
                totalStat = Math.floor(totalStat * 1.1);
            }
            if (natureEffect.decrease === stat) {
                totalStat = Math.floor(totalStat * 0.9);
            }
        }
    }

    return totalStat;
};

export const calculateColor = (stat, baseStats, ivStats, evStats, pokemonLevel, nature, natures, MAX_HP_STAT_VALUE, MAX_OTHER_STAT_VALUE) => {
    const totalStat = calculateTotalStats(stat, baseStats, ivStats, evStats, pokemonLevel, nature, natures);
    const maxStat = stat === 'hp' ? MAX_HP_STAT_VALUE : MAX_OTHER_STAT_VALUE;
    const totalStatPercentage = (totalStat / maxStat) * 100;
    const green = Math.round((totalStatPercentage / 100) * 255);
    const red = 255 - green;
    return `rgb(${red}, ${green}, 0)`;
};


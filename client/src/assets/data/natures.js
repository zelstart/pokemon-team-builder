const natures = {
    Hardy: { increase: null, decrease: null },
    Lonely: { increase: 'atk', decrease: 'def' },
    Brave: { increase: 'atk', decrease: 'spe' },
    Adamant: { increase: 'atk', decrease: 'spa' },
    Naughty: { increase: 'atk', decrease: 'spd' },
    Bold: { increase: 'def', decrease: 'atk' },
    Docile: { increase: null, decrease: null },
    Relaxed: { increase: 'def', decrease: 'spe' },
    Impish: { increase: 'def', decrease: 'spa' },
    Lax: { increase: 'def', decrease: 'spd' },
    Timid: { increase: 'spe', decrease: 'atk' },
    Hasty: { increase: 'spe', decrease: 'def' },
    Serious: { increase: null, decrease: null },
    Jolly: { increase: 'spe', decrease: 'spa' },
    Naive: { increase: 'spe', decrease: 'spd' },
    Modest: { increase: 'spa', decrease: 'atk' },
    Mild: { increase: 'spa', decrease: 'def' },
    Quiet: { increase: 'spa', decrease: 'spe' },
    Bashful: { increase: null, decrease: null },
    Rash: { increase: 'spa', decrease: 'spd' },
    Calm: { increase: 'spd', decrease: 'atk' },
    Gentle: { increase: 'spd', decrease: 'def' },
    Sassy: { increase: 'spd', decrease: 'spe' },
    Careful: { increase: 'spd', decrease: 'spa' },
    Quirky: { increase: null, decrease: null }
}

export default natures;
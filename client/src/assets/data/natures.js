const natures = {
    hardy: { increase: null, decrease: null },
    lonely: { increase: 'atk', decrease: 'def' },
    brave: { increase: 'atk', decrease: 'spe' },
    adamant: { increase: 'atk', decrease: 'spa' },
    naughty: { increase: 'atk', decrease: 'spd' },
    bold: { increase: 'def', decrease: 'atk' },
    docile: { increase: null, decrease: null },
    relaxed: { increase: 'def', decrease: 'spe' },
    impish: { increase: 'def', decrease: 'spa' },
    lax: { increase: 'def', decrease: 'spd' },
    timid: { increase: 'spe', decrease: 'atk' },
    hasty: { increase: 'spe', decrease: 'def' },
    serious: { increase: null, decrease: null },
    jolly: { increase: 'spe', decrease: 'spa' },
    naive: { increase: 'spe', decrease: 'spd' },
    modest: { increase: 'spa', decrease: 'atk' },
    mild: { increase: 'spa', decrease: 'def' },
    quiet: { increase: 'spa', decrease: 'spe' },
    bashful: { increase: null, decrease: null },
    rash: { increase: 'spa', decrease: 'spd' },
    calm: { increase: 'spd', decrease: 'atk' },
    gentle: { increase: 'spd', decrease: 'def' },
    sassy: { increase: 'spd', decrease: 'spe' },
    careful: { increase: 'spd', decrease: 'spa' },
    quirky: { increase: null, decrease: null }
}

export default natures;
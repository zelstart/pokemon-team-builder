// API CALL TO GET LIST OF POKEMON NAMES 
export async function fetchPokemonNames() {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=1118')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.results);
}

// API CALL TO GRAB SINGLE POKEMON JSON OBJECT
export async function getPokemonDetails(name) {
    let nameLc = name.toLowerCase();
    let url = "https://pokeapi.co/api/v2/pokemon/" + nameLc;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // console.error(`Error fetching Pokemon details for ${name}: ${response.statusText}`);
            return null; // or throw an error, or return a default value
        }

        const pokemon = await response.json();

        let pokemonSprite = pokemon.sprites.front_default;
        let pokemonAbilities = pokemon.abilities.map(ability => ability.ability.name);
        let pokemonMoves = pokemon.moves.map(move => move.move.name);
        let pokemonStats = pokemon.stats.map(stat => ({name: stat.stat.name, value: stat.base_stat}));
        let pokemonTypes = pokemon.types.map(type => type.type.name);

        return {sprite: pokemonSprite, abilities: pokemonAbilities, moves: pokemonMoves, stats: pokemonStats, types: pokemonTypes};
    } catch (error) {
        console.error(error);
    }
}
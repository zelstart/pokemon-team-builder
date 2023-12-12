
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
    let url = "https://pokeapi.co/api/v2/pokemon/" + name;

    try {
        const response = await fetch(url);
        const pokemon = await response.json();

        let pokemonSprite = pokemon.sprites.front_default;
        let pokemonAbilities = pokemon.abilities.map(ability => ability.ability.name);
        let pokemonMoves = pokemon.moves.map(move => move.move.name);
        let pokemonStats = pokemon.stats.map(stat => ({name: stat.stat.name, value: stat.base_stat}));

        return {sprite: pokemonSprite, abilities: pokemonAbilities, moves: pokemonMoves, stats: pokemonStats};
    } catch (error) {
        console.error(error);
    }
}
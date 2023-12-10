
// API CALL TO GET LIST OF POKEMON NAMES 
export function getPokemonInfo() {
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
// export async function getPokemonInfo(num) {
//     let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

//     try {
//         const response = await fetch(url);

//         const pokemon = await response.json();
//         const speciesResponse = await fetch(pokemon.species.url);
//         const speciesData = await speciesResponse.json();

//         let pokemonName = pokemon.name;
//         let pokemonType = pokemon.types.map(type => type.type.name);
//         let pokemonImg = pokemon.sprites.front_default; // THIS CAN BE FEMALE, SHINY ETC..... 

//         // All this does is find the earliest entry that is english. Needs more testing.
//         let pokemonDesc = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

//         // This is all the descriptions. It seems only 1-15 in the array are english and they only go up to soulsilver, needs more testing
//         let allDescs = speciesData.flavor_text_entries;

//         pokedexEntry[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};

//     } catch (error) {
//         console.error('Error fetching Pokemon:', error);
//     }
// }
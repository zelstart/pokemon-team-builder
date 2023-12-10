/*const pokemonInformation = document.getElementById("pokemon-info");

const pokedexName = ;
const pokemonDescription = ;
*/

const pokemonCount = 151; // This can be updated but for now it's gen 1

var pokedexEntry = {}; // This is a map of the pokemon we will find

//EXAMPLE:
//{1 : {"name" : "bulbasaur", "img" : url, "type" : ["grass", "poison"], "desc" : "A VERY LONG STRING"}}

window.onload = async function() {
    //getPokemon(1);

    for (let i = 1; i<= pokemonCount; i++) {
        await getPokemon(i);
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + "." + pokedexEntry[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);

    }

    document.getElementById("pokemon-description").innerText = pokedexEntry[1].desc;

    console.log(pokedexEntry);
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    try {
        const response = await fetch(url);

        const pokemon = await response.json();
        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();

        let pokemonName = pokemon.name;
        let pokemonType = pokemon.types.map(type => type.type.name);
        let pokemonImg = pokemon.sprites.front_default; // THIS CAN BE FEMALE, SHINY ETC..... 

        // All this does is find the earliest entry that is english. Needs more testing.
        //
        // We can have this dynamically grab the desc:
        //
        // let version = whatver
        // pokemonDesc = flavor_text_entries.version.flavor_text
        //
        let pokemonDesc = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

        // This is all the descriptions. It seems only 1-15 in the array are english and they only go up to soulsilver, needs more testing
        let allDescs = speciesData.flavor_text_entries;

        //console.log(pokemonName);
        //console.log(pokemonType);
        //console.log(pokemonImg);
        //console.log(pokemonDesc);

        console.log(allDescs);

        pokedexEntry[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};

    } catch (error) {
        console.error('Error fetching Pokemon:', error);
    }
}

function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedexEntry[this.id].img;
    

    // Clear previous types
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    // update types
    let types = pokedexEntry[this.id].types;
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i].toUpperCase();
        typesDiv.append(type);
    }

    // update description
    document.getElementById("pokemon-description").innerText = pokedexEntry[this.id].desc;

    // update name
    document.getElementById("pokemon-name").innerText = pokedexEntry[this.id].name;
}


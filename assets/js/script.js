const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

const pokemonList = document.querySelector("#pokemonList");

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon">
        <span class="numero">#001</span>
        <span class="nome">${pokemon.name}</span>
        <div class="detalhes">
            <ol class="tipos">
                <li>grass</li>
                <li>poison</li>
            </ol>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                alt="${pokemon.name}">
        </div>
    </li>
    `;
}

fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => {
        pokemons.forEach(pokemon => {
            pokemonList.innerHTML += convertPokemonToLi(pokemon);
        });
    })
    .catch((error) => console.log(error));

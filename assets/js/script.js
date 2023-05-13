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

pokeApi.getPokemons().then((pokemonListJson = []) => {
    pokemonList.innerHTML = pokemonListJson.map(convertPokemonToLi).join('');
});

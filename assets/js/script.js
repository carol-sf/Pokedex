const pokemonList = document.querySelector("#pokemonList");

function convertPokemonTypesToLi(pokemonType) {
    return pokemonType.map((typeSlot) => `<li>${typeSlot.type.name}</li>`);
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <span class="numero">${pokemon.order}</span>
            <span class="nome">${pokemon.name}</span>
            <div class="detalhes">
                <ol class="tipos">
                    ${convertPokemonTypesToLi(pokemon.types).join('')}
                </ol>
                <img src="${pokemon.sprites.other.dream_world.front_default}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `;
}

pokeApi.getPokemons().then((pokemonListJson = []) => {
    pokemonList.innerHTML = pokemonListJson.map(convertPokemonToLi).join('');
    // pokemonListJson.map(convertPokemonTypesToLi);
});

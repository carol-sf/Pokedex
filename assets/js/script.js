const pokemonList = document.querySelector("#pokemonList");

function convertPokemonTypesToLi(pokemonType) {
    return pokemonType.map((typeSlot) => `<li>${typeSlot.type.name}</li>`);
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <span class="numero">#${pokemon.number}</span>
            <span class="nome">${pokemon.name}</span>
            <div class="detalhes">
                <ol class="tipos">
                    ${pokemon.types.map((type) => `<li>${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `;
}

pokeApi.getPokemons().then((pokemonListJson = []) => {
    pokemonList.innerHTML = pokemonListJson.map(convertPokemonToLi).join('');
});

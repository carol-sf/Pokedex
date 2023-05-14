const pokeApi = {};

function converterPokeApiParaPokemon (pokeDetalhes) {
    const pokemon = new Pokemon();
    const tipos = pokeDetalhes.types.map((typeSlot) => typeSlot.type.name);

    pokemon.numero = pokeDetalhes.id;
    pokemon.nome = pokeDetalhes.name;
    pokemon.tipos = tipos;
    pokemon.tipo = tipos[0];
    pokemon.foto = pokeDetalhes.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokeDetalhes = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(converterPokeApiParaPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokeDetalhes))
        .then((requestDetalhes) => Promise.all(requestDetalhes))
}
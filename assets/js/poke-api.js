const pokeApi = {};

function getEspecie(pokeDetalhes) {
    const url = pokeDetalhes.species.url;
    return fetch(url)
        .then((response) => response.json());
}

function getNomeEspecie(pokeDetalhes) {
    return getEspecie(pokeDetalhes)
        .then((especie) => {
            let vetEspecie = especie.genera[7].genus.split(" ");
            return vetEspecie.filter((nomeEspecie) => nomeEspecie != "Pokémon").join(" ");
        });
}

function getGenero(pokeDetalhes) {
    return getEspecie(pokeDetalhes).then((especie) => {
        const genero = new Map();
        const taxaGenero = especie.gender_rate;
        switch (taxaGenero) {
            case -1:
                genero.set("fem", 0);
                genero.set("masc", 0);
                break;
            case 0:
                genero.set("fem", 0);
                genero.set("masc", 100);
                break;
            case 1:
                genero.set("fem", 50);
                genero.set("masc", 50);
                break;
            case 2:
                genero.set("fem", 66.67);
                genero.set("masc", 33.33);
                break;
            case 4:
                genero.set("fem", 33.33);
                genero.set("masc", 66.67);
                break;
            case 6:
                genero.set("fem", 85.71);
                genero.set("masc", 14.29);
                break;
            case 8:
                genero.set("fem", 100);
                genero.set("masc", 0);
                break;
        }
        return genero;
    });    
}

function getGruposOvos(pokeDetalhes) {
    return getEspecie(pokeDetalhes).then((especie) => especie.egg_groups.map((grupo) => grupo.name));
}

function converterPokeApiParaPokemon(pokeDetalhes) {
    const pokemon = new Pokemon();
    const tipos = pokeDetalhes.types.map((typeSlot) => typeSlot.type.name);

    pokemon.numero = pokeDetalhes.id;
    pokemon.nome = pokeDetalhes.name;
    pokemon.tipos = tipos;
    pokemon.tipo = tipos[0];
    pokemon.foto = pokeDetalhes.sprites.other.dream_world.front_default;
    pokemon.altura = pokeDetalhes.height;
    pokemon.peso = pokeDetalhes.weight;
    pokemon.habilidades = pokeDetalhes.abilities.map((habilidade) => habilidade.ability.name); //.join(", ")
    getNomeEspecie(pokeDetalhes).then((nomeEspecie) => pokemon.especie = nomeEspecie);
    getGenero(pokeDetalhes).then((genero) => pokemon.genero = genero);
    getGruposOvos(pokeDetalhes).then((grupoOvos) => pokemon.gruposOvos = grupoOvos);

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
        .then((requestDetalhes) => Promise.all(requestDetalhes));
}

pokeApi.getPokemon = (pokeNome) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeNome}`;
    return fetch(url)
        .then((response) => response.json())
        .then(converterPokeApiParaPokemon);
}
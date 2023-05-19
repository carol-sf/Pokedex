let pokeNome = window.location.search;
pokeNome = pokeNome.slice(1);

pokeApi.getPokemon(pokeNome).then((pokemon) => {

    console.log(pokemon);

    
});
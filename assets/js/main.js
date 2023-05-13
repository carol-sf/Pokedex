const pokemonList = document.querySelector("#pokemonList");
const btnCarregarMais = document.querySelector("#btnCarregarMais");
const limit = 8;
let offset = 0;

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset,limit).then((pokemonListJson = []) => {
        const newHtml = pokemonListJson.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
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
        `).join('');
    
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemons(offset, limit);

btnCarregarMais.addEventListener("click", () => {
    offset += limit;
    loadPokemons(offset, limit);
});
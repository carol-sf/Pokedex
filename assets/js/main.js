const pokemonList = document.querySelector("#pokemonList");
const btnCarregarMais = document.querySelector("#btnCarregarMais");

const maxRecords = 151;
const limit = 12;
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
    const qtdRecordNextPage = offset + limit;
    
    if(qtdRecordNextPage > maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemons(offset, newLimit);
        btnCarregarMais.parentElement.removeChild(btnCarregarMais);
    } else {
        loadPokemons(offset, limit);
    }
});
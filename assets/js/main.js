const listaPokemon = document.querySelector("#listaPokemon");
const btnMaisPokemon = document.querySelector("#btnMaisPokemon");

const maxFichas = 151;
const limit = 12;
let offset = 0;

function carregarPokemons(offset, limit) {
    pokeApi.getPokemons(offset,limit).then((pokemonListJson = []) => {
        const novoHtml = pokemonListJson.map((pokemon) => `
            <li class="pokemon ${pokemon.tipo}">
                <span class="numero">#${pokemon.numero}</span>
                <span class="nome">${pokemon.nome}</span>
                <div class="detalhes">
                    <ol class="tipos">
                        ${pokemon.tipos.map((tipo) => `<li>${tipo}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.foto}"
                        alt="${pokemon.nome}">
                </div>
            </li>
        `).join('');
    
        listaPokemon.innerHTML += novoHtml;
    });
}

carregarPokemons(offset, limit);

btnMaisPokemon.addEventListener("click", () => {
    offset += limit;
    const fichasProximaPag = offset + limit;
    
    if(fichasProximaPag > maxFichas) {
        const novoLimit = maxFichas - offset;
        carregarPokemons(offset, novoLimit);
        btnMaisPokemon.parentElement.removeChild(btnMaisPokemon);
    } else {
        carregarPokemons(offset, limit);
    }
});
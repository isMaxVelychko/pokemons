
function getPokemons() {
    return $.get( "http://pokeapi.co/api/v2/pokemon", {limit: 12});
}
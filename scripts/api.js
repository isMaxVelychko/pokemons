"use strict";

import ajaxHelper from './ajaxHelper';

const apiUrl = 'http://pokeapi.co/api/v2/';


function getPokemons(fullUrl = apiUrl + 'pokemon?limit=12') {
    return ajaxHelper('GET', fullUrl);
}

export {getPokemons};
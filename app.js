"use strict";
import {getPokemons} from './services'

drawListPokemons();

function drawListPokemons() {
    getPokemons().then(function(response) {
        let list = document.getElementById('list');

        let data = JSON.parse(response);
        data.results.forEach(item => {
             let li = document.createElement('li');
             let text = document.createTextNode(item.name);
             li.appendChild(text);
             list.appendChild(li);
         })
    });
}

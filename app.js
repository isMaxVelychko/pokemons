"use strict";
import {getPokemons} from './scripts/api'

let nextListUrl = null;

drawListPokemons();

document.addEventListener("DOMContentLoaded", function() {
    let loadMoreElement = document.getElementById('loadMore');
    loadMoreElement.onclick = loadMore;
});


function drawListPokemons(url) {
    getPokemons(url).then(function(response) {
        let list = document.getElementById('list');

        let data = JSON.parse(response);
        nextListUrl = data.next;
        data.results.forEach(item => {
             let li = document.createElement('li');
             let text = document.createTextNode(item.name);
             li.appendChild(text);
             list.appendChild(li);
        });
    });
}

function loadMore() {
    drawListPokemons(nextListUrl);
}

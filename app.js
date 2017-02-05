"use strict";
import {getPokemons} from './scripts/api'
import filter from './scripts/filter'

let nextListLink = null;
let typeCollection = [];

drawListPokemons();

document.addEventListener("DOMContentLoaded", function() {
    let loadMoreElement = document.getElementById('loadMore');
    let formElement = document.getElementById('form');
    loadMoreElement.onclick = loadMore;
    formElement.onsubmit = onSubmit;
});


function drawListPokemons(url) {
    getPokemons(url).then(response => {
        let list = document.getElementById('list');
        let linkCollection = [];

        let data = JSON.parse(response);
        nextListLink = data.next;
        data.results.forEach(item => {
            let li = document.createElement('li');
            let text = document.createTextNode(item.name);
            li.appendChild(text);
            li.setAttribute('name', item.name);
            list.appendChild(li);
            linkCollection.push(item.url);
        });
        return linkCollection;
    }).then(response => {
        response.forEach(link => {
            setTypeCollection(link);
        })
    })
}

function loadMore() {
    drawListPokemons(nextListLink);
}

function onSubmit(event) {
    event.preventDefault();
    filter(document.querySelectorAll("li"), this.type.value, typeCollection);
}

function setTypeCollection(link) {
    let types = [];
    getPokemons(link).then(data => {
        let pokemonData = JSON.parse(data);
        pokemonData.types.forEach(item => {
            types.push(item.type.name);
        });
        typeCollection.push({name: pokemonData.name, types: types});
    });
}
"use strict";
import {getPokemons} from './scripts/api'

let nextListLink = null;
let typeCollection = [];

drawListPokemons();

document.addEventListener("DOMContentLoaded", function() {
    let loadMoreElement = document.getElementById('loadMore');
    let formElement = document.getElementById('form');
    loadMoreElement.onclick = loadMore;
    formElement.onsubmit = filterPokemons;
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

function filterPokemons(event) {
    event.preventDefault();

    let listElements = document.querySelectorAll("li");
    let searchText = this.type.value;
    let matchedItems = [];
    typeCollection.forEach(item => {
        item.types.forEach(type => {
            if(searchText === type) {
                matchedItems.push(item.name);
            }
        })
    });

    showElements(listElements);

    if(matchedItems.length) {
        listElements.forEach(element => {
            let attrName = element.getAttribute('name');
            if(matchedItems.indexOf(attrName) == -1) {
                hideElements([element]);
            }
        });
    } else if(searchText) {
        hideElements(listElements);
    }
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

function showElements(elements) {
    elements.forEach(item => {
        item.style.display = "block";
    });
}

function hideElements(elements) {
    elements.forEach(item => {
        item.style.display = "none";
    });
}
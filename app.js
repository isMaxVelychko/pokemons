"use strict";
import {getPokemons} from './scripts/api';
import filter from './scripts/filter';
import storage from './scripts/storage';
import {setBackground} from './scripts/domManipulation';

(function App() {
    let nextListLink = null;
    let typeCollection = [];

    drawListPokemons();
    initFavorites();

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
                let btn = document.createElement('button');
                let text = document.createTextNode(item.name);
                btn.innerHTML = 'add to favorite';
                btn.setAttribute('name', item.name);
                btn.onclick = addToFavorite;
                li.appendChild(text);
                li.appendChild(btn);
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

    function addToFavorite() {
        let wrapperElement = this.parentElement;
        let favorites = storage.get('favorites');
        favorites.push(wrapperElement.getAttribute('name'));
        storage.set('favorites', favorites);
        setBackground(wrapperElement, 'antiquewhite');

        let listFavorites = document.getElementById('listFavorites');
        let li = document.createElement('li');
        li.onclick = removeFromFavorite;
        let text = document.createTextNode(wrapperElement.getAttribute('name'));
        li.appendChild(text);
        listFavorites.appendChild(li);
    }

    function removeFromFavorite() {
        this.remove();
        let favorites = storage.get('favorites');
        favorites = favorites.filter(item => {
            return item !== this.innerText;
        });
        storage.set('favorites', favorites);

        document.querySelectorAll('#list li').forEach(element => {
            if(element.getAttribute('name') === this.innerText) {
                setBackground(element, 'none');
            }
        })
    }

    function onSubmit(event) {
        event.preventDefault();
        filter(document.querySelectorAll("#list li"), this.type.value, typeCollection);
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

    function initFavorites() {
        storage.set('favorites', []);
    }
})();




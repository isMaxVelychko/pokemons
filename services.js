
var apiUrl = 'http://pokeapi.co/api/v2/';

function getPokemons() {
    var queryUrl = apiUrl + 'pokemon?limit=12';
    return makeQuery('GET', queryUrl);
}

function makeQuery(method, url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(method, url);
        req.onload = onLoad;
        req.onerror = onError;
        req.send();

        function onLoad() {
            if(req.status == 200) {
                resolve(this.response);
            } else {
                reject(this.responseText);
            }
        }

        function onError() {
            reject(Error('Network Error'));
        }
    });
};
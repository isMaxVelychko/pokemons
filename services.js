
const apiUrl = 'http://pokeapi.co/api/v2/';

function getPokemons() {
    let queryUrl = apiUrl + 'pokemon?limit=12';
    return makeQuery('GET', queryUrl);
}

function makeQuery(method, url) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
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

export {getPokemons};
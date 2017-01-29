
getPokemons().then(function(response) {
    var list = document.getElementById('list');
    response.results.forEach(function(item) {
        var li = document.createElement('li');
        var text = document.createTextNode(item.name);
        li.appendChild(text);
        list.appendChild(li);
    })
});

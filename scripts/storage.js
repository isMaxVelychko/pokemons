"use strict";

class Storage {
    get(item) {
        return JSON.parse(localStorage.getItem(item));
    }

    set(key, value) {
        if(value instanceof Object) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }
}
let storage = new Storage();

export default storage;
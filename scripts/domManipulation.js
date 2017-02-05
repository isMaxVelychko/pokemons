"use strict";

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

export {showElements, hideElements};
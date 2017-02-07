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

function setBackground(element, color) {
    element.style.background = color;
}

export {showElements, hideElements, setBackground};
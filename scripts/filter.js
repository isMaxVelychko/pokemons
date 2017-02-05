"use strict";

import {showElements, hideElements} from './domManipulation';

export default function filter(elements, searchText, types) {
    showElements(elements);

    let matchedItems = [];
    types.forEach(item => {
        item.types.forEach(type => {
            if(searchText === type) {
                matchedItems.push(item.name);
            }
        })
    });
    if(matchedItems.length) {
        elements.forEach(element => {
            let attrName = element.getAttribute('name');
            if(matchedItems.indexOf(attrName) == -1) {
                hideElements([element]);
            }
        });
    } else if(searchText) {
        hideElements(elements);
    }
};
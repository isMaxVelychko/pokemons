"use strict";

export default function ajaxHelper(method, url) {
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
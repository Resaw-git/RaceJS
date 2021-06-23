'use strict'
try {
    var form = document.querySelector('#form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        console.log('submit');
    });
} catch(e) {
    console.error('form error');
}
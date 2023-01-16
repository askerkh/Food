'use strict';
import  tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
    tabs('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    modal('.modal', '[data-modal]');
    timer('.timer__block span', '2023-01-31');
    cards();
    calc();
    forms('form', '.modal');
    slider({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner',
    });

});
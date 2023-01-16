/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = "female";
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    calcInitLocalSettings('#gender div', 'calculating__choose-item_active');
    calcInitLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcInitLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.classList.remove(activeClass);
            if(el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                el.classList.add(activeClass);
            } 
            if(el.getAttribute('id') === localStorage.getItem('sex')){
                el.classList.add(activeClass);
            }
        }); 
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
        }
        if(sex === 'female') {
            result.textContent = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        } else {
            result.textContent = (88.36 + (13.4 * weight) + (4.8 *height) - (5.7 *age)) * ratio;
        }
        result.textContent = Math.round(+result.textContent);
    }
    
    calcTotal();

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.addEventListener('click', e => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(el => el.classList.remove(activeClass));
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)) {
                input.style.boxShadow = "0 4px 15px rgb(255 0 0 / 60%)";
                return;
            } else {
                input.style.boxShadow = "0 4px 15px rgb(0 0 0 / 20%)";
            }

            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    //add cards

    class FoodCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 68.55;
            this.changeToRub();
            this.classes = classes;
        }

        changeToRub() {
            this.price = Math.ceil(this.price * this.transfer);
        }

        render() {
            const card = document.createElement('div');
            if(this.classes.length === 0) {
                this.classes = 'menu__item';
                card.classList.add(this.classes);
            } else {
                this.classes.forEach(className => card.classList.add(className));
            }
            card.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>`;
            this.parent.append(card);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu')
        .then(cards => {
            cards.forEach(({img, altimg, title, descr, price}) => {
                new FoodCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
    
    // axios.get('http://localhost:3000/menu')
    //     .then(response => {
    //         response.data.forEach(({img, altimg, title, descr, price}) => {
    //             new FoodCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalSelector) {
    // forms
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Всё прошло успешно, мы скоро с вами свяжемся!',
        failure: 'Что-то пошло не так...',
    };

    forms.forEach(form => bindPostData(form));

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const stImg = document.createElement('img');
            stImg.src = message.loading;
            stImg.style = `display: block; margin: 0 auto;`;
            form.insertAdjacentElement('afterend', stImg);

            
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
                stImg.remove();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector); 
        }, 5000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show', 'fade');
}

function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show', 'fade');
}

function modal(modalSelector, triggerSelector) {
    //modal 
    const modal = document.querySelector(modalSelector);
    const btnsModal = document.querySelectorAll(triggerSelector);

    const modalTimerID = setTimeout(openModal, 50000);

    modal.addEventListener('click', event => {
        if(event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    btnsModal.forEach(el => {
        el.addEventListener('click', (event) => {
            clearInterval(modalTimerID);
            openModal(modalSelector);
        });
    });

    document.addEventListener('keydown', event => {
        if(event.code === "Escape" && modal.classList.contains('active')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if(document.documentElement.scrollTop + 
            document.documentElement.clientHeight == document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll );
            clearInterval(modalTimerID);
        }
    }

    window.addEventListener('scroll', showModalByScroll );
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //slider
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          lSlideBtn = document.querySelector(prevArrow),
          rSlideBtn = document.querySelector(nextArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    total.textContent = (slides.length > 0 && slides.length < 10) ? `0${slides.length}` : slides.length;

    let slideIndex = 1;
    let offset = 0;

    slidesWrapper.style.overflow = 'hidden';
    
    slidesField.style.width = `${slides.length * 100}%`;
    slidesField.style.transition = `0.5s`;
    slidesField.style.display = 'flex';

    slides.forEach(slide => {
        slide.style.width = width;    
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);
    const dots = [];
    for(let i = 0; i < slides.length; ++i) {
        const dot = document.createElement('li');
        dot.classList.add('dot');

        indicators.append(dot);
        dots.push(dot);
    }

    function toNum(str) {
        return +str.replace(/\D/ig, '');
    }

    const parsedWidth = toNum(width);

    function translateSlides() {
        slideIndex = offset / parsedWidth + 1;
        current.textContent = (slideIndex > 0 && slideIndex < 10) ? `0${slideIndex}` : slideIndex;

        dots.forEach(el => el.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';

        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    translateSlides();

    lSlideBtn.addEventListener('click', () => {
        if(offset == 0) {
            offset = parsedWidth * (slides.length - 1);
        } else {
            offset -= parsedWidth;
        }
        translateSlides();
    });

    rSlideBtn.addEventListener('click', () => {
        if(offset == parsedWidth * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += parsedWidth;
        }
        translateSlides();
    });

    dots.forEach((el) => {
        el.addEventListener('click', () => {
            offset = (dots.indexOf(el) + 1)* parsedWidth - parsedWidth;
            translateSlides();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, btnsParentSelector, btnsSelector, activeClass) {

    const tabVariations = document.querySelectorAll(tabsSelector);
    const btnsParent = document.querySelector(btnsParentSelector);
    const btns = btnsParent.querySelectorAll(btnsSelector);

    btnsParent.addEventListener('click', (event) => {
        if(event.target && event.target.classList.contains(btnsSelector.slice(1))) {
            let num = 0;
            btns.forEach((el) => el.classList.remove(activeClass));
            event.target.classList.add(activeClass);
            btns.forEach((el, index) => {
                if(event.target == el) {
                    num = index;
                }
            });
            tabVariations.forEach((el) => {
                el.classList.add('hide');
                el.classList.remove('show', 'fade');
            });
            tabVariations[num].classList.remove('hide');
            tabVariations[num].classList.add('show', 'fade');
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerBlocksSelector, deadline) {
    //timer
        
    function getTimeRemaining(endtime) {
        const t = (Date.parse(endtime) - new Date()) / 1000;
        const days = Math.trunc(t / 86400);
        const hours = Math.trunc(t % 86400 / 3600);
        const minutes = Math.trunc(t % 86400 % 3600 / 60);
        const seconds = Math.trunc(t % 86400 % 3600 % 60);

        return [days, hours, minutes, seconds, t];
    }

    function setTime(selector, endtime) {
        const time = document.querySelectorAll(selector);

        const timeRemaining = getTimeRemaining(endtime);
        
        reloadTimer();

        function reloadTimer() {
            const timeRemaining = getTimeRemaining(endtime);
            timeRemaining.forEach((el, index, arr) => {
                if(el < 10) {
                    arr[index] = `0${el}`;
                }
            });
            time.forEach((el, index) => el.innerHTML = timeRemaining[index]);
        }

        const timer = setInterval(reloadTimer, 1000);
        if(timeRemaining[timeRemaining.length] <= 0) {
            clearInterval(timer);
        }
    }

    setTime(timerBlocksSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getData = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', '[data-modal]');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer__block span', '2023-01-31');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', '.modal');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
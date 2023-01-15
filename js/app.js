'use strict';

window.addEventListener('DOMContentLoaded', () => {

    //tabs

    const tab = document.querySelector('.tabcontainer');

    const btns = tab.querySelector('.tabheader__items');
    const innerBtnsTab = btns.querySelectorAll('.tabheader__item');

    const tabVariations = document.querySelectorAll('.tabcontent');

    btns.addEventListener('click', (event) => {
        if(event.target && event.target.classList.contains('tabheader__item')) {
            let num = 0;
            innerBtnsTab.forEach((el) => el.classList.remove('tabheader__item_active'));
            event.target.classList.add('tabheader__item_active');
            innerBtnsTab.forEach((el, index) => {
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

    //timer

    const deadline = '2023-01-31';
    
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
    
    setTime('.timer__block span', deadline);

    //modal 
    const modal = document.querySelector('.modal');
    const btnsModal = document.querySelectorAll('[data-modal]');

    function closeModal() {
        modal.classList.remove('show', 'fade');
    }

    function openModal() {
        modal.classList.add('show', 'fade');
    }

    const modalTimerID = setTimeout(openModal, 50000);

    modal.addEventListener('click', event => {
        if(event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    btnsModal.forEach(el => {
        el.addEventListener('click', (event) => {
            clearInterval(modalTimerID);
            openModal();
        });
    });

    document.addEventListener('keydown', event => {
        if(event.code === "Escape" && modal.classList.contains('active')) {
            closeModal();
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

    new FoodCard(
        "img/tabs/vegy.jpg", 
        "vegy",
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9, 
        '.menu .container'
    ).render();

    new FoodCard(
        "img/tabs/elite.jpg", 
        "elite",
        'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        11, 
        '.menu .container', 
    ).render();

    new FoodCard(
        "img/tabs/post.jpg", 
        "post",
        'Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        13, 
        '.menu .container'
    ).render();
    
    // request's
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Всё прошло успешно, мы скоро с вами свяжемся!',
        failure: 'Что-то пошло не так...',
    };

    forms.forEach(form => postData(form));

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const stImg = document.createElement('img');
            stImg.src = message.loading;
            stImg.style = `display: block; margin: 0 auto;`;
            form.insertAdjacentElement('afterend', stImg);

            
            const formData = new FormData(form);
            
            const temp = {};

            formData.forEach((value, key) => temp[value] = key);

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(temp),
            })
            .then(data => data.json())
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
        openModal();

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
            closeModal(); 
        }, 5000);
    }
});
import { getData } from "../services/services";

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

    getData('http://localhost:3000/menu')
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

export default cards;
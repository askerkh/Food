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

export default tabs;
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
            openModal(modalSelector);
            window.removeEventListener('scroll', showModalByScroll );
            clearInterval(modalTimerID);
        }
    }

    window.addEventListener('scroll', showModalByScroll );
}

export default modal;
export {openModal, closeModal};
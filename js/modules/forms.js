import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

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

            postData('http://localhost:3000/requests', json)
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
        openModal(modalSelector);

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
            closeModal(modalSelector); 
        }, 5000);
    }
}

export default forms;
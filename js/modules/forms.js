
import {closeModal, openModal} from './modal'; // импортируем функции openModal, closeModal в модуль forms - импортиурем синтаксисом именованных импортов
// Импорт функции, которая работает с сервером
import {postData} from '../services/services'; // импортируем функциию постинга данных из services.js

function forms(formSelector, modalTimerId) { // добавляем аргумент

	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: 'Загрузка',
		success: 'Спасибо, скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});


	function bindPostData(form) { // меняем название функции на привязку постинга данных
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.innerHTML = message.loading;
			form.append(statusMessage);


			const formData = new FormData(form); // у формы в input всегда должен быть атрибут 'name' (иначе FormData не сможет найти input и не сможет взять у него value для того, чтобы сформировать правильно обьект)

			const json = JSON.stringify(Object.fromEntries(formData.entries())); // другой способ преобразования formData в json (formData.entries() - получаем массив пар ключ: значение, Object.fromEntries() - преобразовываем из массива обратно в обьект, JSON.stringify - преобразовываем его в json формат)

			postData(' http://localhost:3000/requests', json) // используем эту функцию вместо fetch выше, данные будут отправляться в db.json   (в качестве data был JSON.stringify(object))
				// .then(data => data.text()) // это убираем потому что в функции postData трансофрмация текста происходит автоматически и она там спрятана внутри
				.then((data) => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});					
		});

	// Красивое оповещение
		function showThanksModal(message) {
			const previousModalDialog = document.querySelector('.modal__dialog');

			previousModalDialog.classList.add('hide');
			openModal('.modal', modalTimerId); // передаем аргументы 

			const thanksModal = document.createElement('div');
			thanksModal.classList.add('modal__dialog');
			thanksModal.innerHTML = `
				<div class="modal__content">
					<div class="modal__close" data-close>×</div>
					<div class="modal__title">${message}</div>
				</div>
			`;

			document.querySelector('.modal').append(thanksModal);
			setTimeout(() => {
				thanksModal.remove();
				previousModalDialog.classList.add('show');
				previousModalDialog.classList.remove('hide');
				closeModal('.modal'); // передаем селектор (аргумент из modal)
			}, 3000);
		}
	}
}

export default forms;
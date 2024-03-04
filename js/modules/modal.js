
// функции openModal и closeModal делаем отдельной функциональности - вырезаем из функции modal и помещаем над ней (в самый верх модуля)
// т.к переменная modal накондится внутри функции modal, при вызове closeModal - работа с modal выдаст ошибку (потому что переменной modal не существует внутри функции closeModal)
// каждый модуль должен быть независим друг от друга - нельзя вызывать в одном модуле кусочек другого модуля, они не должна привязываться к одним и тем же сущностям (как с переменной modal)
// нужно создавать модули так, чтобы они зависели только от аргументов, которые в них передаются - потому что каждый модуль может быть вызван несколько раз для разных элементов
	function closeModal(modalSelector) { // передаем аргумент, потом этот аргумент будем использовать в функции modal (как бы связываем их с помощью аргументов) - название аргмумента этого не имеет значения
		const modal = document.querySelector(modalSelector); // создаем переменную для получение элемента через аргумент
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}


	// Настраиваиваем modalTimerId: (ключевое правило: понимать что за чем идет, куда что необходимо передавать, где что нужно расположить и идти по своему алгоритму, то сложностей не будет)
	// 1. Передаем его в качестве аргумента в функцию openModal - потому что нам необходимо работать через аргументы, а не через сущности (переменные) - не универсально
	// 2. Добавляем его в качестве аргумента в функцию modal (для связи openModal и modal)
	// 3. переносим переменную modalTimerId глобально в script.js (потому что она будет юзатся и в modal и в forms)
		// 3.1 Импортируем в script.js функцию openModal для использования modalTimerId глобально
	// 4. Передаем в forms в аргумент формы modalTimerId (для связи openModal и forms) и в модуле forms подставляем аргументы для функций openModal и closeModal
	// 5. Подставляем все аргументы в вызове функций в script.js

	function openModal(modalSelector, modalTimerId) { // аналогично передаем аргумент
		const modal = document.querySelector(modalSelector); // создаем переменную для получение элемента через аргумент
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';

		console.log(modalTimerId);
		// Условие (если modalTimerId существует)
		if (modalTimerId) {
			clearInterval(modalTimerId); // то запускаем очистку таймера (будет очищаться таймер, который находится в переменной modalTimerId, которая в script.js)
		}
	}


function modal(triggerSelector, modalSelector, modalTimerId) { // передаем три аргумента
    // Modal
	const modalTrigger = document.querySelectorAll(triggerSelector); //  было document.querySelectorAll('[data-modal]');
	const modal = document.querySelector(modalSelector); // было document.querySelectorAll('.modal');

	// когда в обработичке событий передаем callback функцию, мы не должны ее сразу вызывать (мы должны ее обьявить) - ('click', openModal);
	// !!! NEW INFO: Для того чтобы обойти это ограничение создаем стрелочную функцию, которая оборачивает нашу вызывающуяся функцию - ('click', () => openModal())
	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // передаем аргументы в фунциюю openModal, было - ('click', openModal); modalTimerId добавляем дял связи с openModal
	});

	modal.addEventListener('click', (e) => { 
		if (e.target === modal || e.target.getAttribute('data-close') == '') { 
			closeModal(modalSelector); // подставляем аргумент
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector); // подставляем аргумент
		}
	});


	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
			openModal(modalSelector, modalTimerId); // подставляем аргументы
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
// в модуле forms (нет фукнций openModal и closeModal)
export {closeModal, openModal}; // экспортируем функции (отдельные от modal) - делаем их именованными, а не по умолчанию

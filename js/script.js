'use strict';

// Собираем модули в проекте - большой script.js разбиваем на маленькие кусочки (tabs, slider, timer и т.д) 
// Создаем папку modules в папке js и создаем там файлики tabs.js, calc.js  и т.д
// Код из большого script.js вырезаем и вставляем в отдельные файлы - там создаем функции и внутрь вставляем код

	// Настраиваем импорты по Модульной структуре ES6 - рефакторим код (был CommandJS - const tabs = require('./modules/tabs'))
	// ESLint говорит, что нужно Все импорты поместить до DOMContentLoaded (в отличие от CommandJS) - импорты должны быть в самом верху

	// Настройка модулей: (фикс багов)
	// 1. Решение бага модуля forms(openModal и closeModal) // подробно написано в модуле modal.js и немного в forms.js
	// 	1.1 Делаем функции openModal и closeModal отдельной функциональности (вырезаем, экспортим и потом импортим куда надо) и создаем работу через аргументы, а не через зависимые сущности (переменные)
	// 	1.2 Чиним работу modalTimerId // подробно написано в модуле modal.js
	// 2. Фикс остальных модулей
	// 	2.1 Доработка модуля forms
	// 		2.1.1 Селектор form выносим как аргумент в функцию forms
	// 		2.1.2 Функцию postData (которая работает с сервером) выносим в сервисы - в отдельную папку и файл services.js, экспортим и импортируем в модуль forms
	//  2.3 Доработка модуля cards 
	// 		2.3.1 Функцию getResource (серверная) вырезаем в сервисы, эксопртируем и импортируем в модуль cards
	//  2.4 Доработка модуля tabs
	// 		2.4.1 Меняем селекторы на аргументы функции tabs
	//  2.5 Доработка модуля timer
	// 		2.5.1 Меняем селектор на аргмуент функции timer ('.timer' на id)
	// 		2.5.2 Меняем переменную deadline на аргумент функции timer (для того, чтобы не лезть в модуль и там менять дату, для удобства и быстроты изменять ее через аргмуент в script.js)
	//  2.6 Калькулятор calc - не трогаем, они редко похожи друг на друга и переиспользовать его еще раз это очень редкий сценарий (но если нужно,то  всегда можно его переписать как модули выше)
	// 2.7 Доработка модуля slider
		// 2.7.1 Использование деструктуризации для передачи аргументов (порядок свойств не будет влиять)
			// 2.7.1.1 Создаем обьект внутри обьявления slider() в модуле slider и передаем аргументы, которые заменят селекторы и меняем селекторы на аргументы
			// 2.7.1.2 Создаем обьект внутри вызова slider() и подставляем аргументы в виде свойств обьекта: ключ - аргумент, значение - селектор
			// 2.7.1.3 При вызове slider() будут подстраиваться значения ключей - селекторы (все отработает, как надо)


	import tabs from './modules/tabs'; // Импортируем функцию из файла tabs.js - юзаем CommandJS,  PS: порядок подключения модулей не важен
	import modal from './modules/modal'; // Импортируем функцию из файла modal.js - юзаем CommandJS
	import timer from './modules/timer';
	import cards from './modules/cards';
	import slider from './modules/slider';
	import forms from './modules/forms';
	import calc from './modules/calc';
	import {openModal} from './modules/modal'; // импортируем openModal, потому что мы юзаем ее в script.js (в modalTimerId глобально)

window.addEventListener('DOMContentLoaded', () => {
		// Создаем переменную в script.js (потому что этот аргумент будет юзаться и в модуле modal и в forms (в функциях openModal, которые внутри этих модулей))
		const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); // делаем стрелочную функцию, чтобы передать аргументы

		tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); // вызываем функцию tabs и подставляем все аргументы
		modal('[data-modal]', '.modal', modalTimerId); // вызываем функцию modal и подставляем аргументы - тут мы связываем openModal и modal и в дальнейшем forms (в этом модуле есть openModal)
		timer('.timer', '2024-07-16'); // передаем аргументы - селектор и дату деадлайна
		cards();
		slider({ // использование деструктуризации (передаем обьект, который будет содержать определные настройки)
			container: '.offer__slider', // в клюич container (аргмуент функции slider) подставляем значение селектора
			nextArrow: '.offer__slider-next',
			prevArrow: '.offer__slider-prev',
			slide: '.offer__slide',
			totalCounter: '#total',
			currentCounter: '#current',
			wrapper: '.offer__slider-wrapper',
			field: '.offer__slider-inner',

		});
		forms('form', modalTimerId); // передаем аргумент в формы, потому что будем юзать его в формах для функции openModal
		calc();
});

// npx webpack (собираем все вместе)
// в папке js появился файл bundle.js
// в HTML подключить файл bundle.js - <script src="js/bundle.js"></script>

// lifehack: чтобы юзать два терминала одновременно (webpack и json-server) использовать кнопку + в терминале (создание нового терминала)










































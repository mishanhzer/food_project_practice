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

// Создаем фунцию и вставляем внутрь код из большого файла script.js
function calc() {

    // Calc
	const result = document.querySelector('.calculating__result span'); 
	let sex, height, weight, age, ratio; 
	

	if (localStorage.getItem('sex')) { 
		sex = localStorage.getItem('sex'); 
	} else { 
		sex = 'female'; 
		localStorage.setItem('sex', 'female'); 
	}
	
	if (localStorage.getItem('ratio')) { 
		ratio = localStorage.getItem('ratio'); 
	} else { 
		ratio = 1.375; 
		localStorage.setItem('ratio', 1.375); 
	}
	
	
	function initLocalSettings(selector, activeClass) { 
		const elements = document.querySelectorAll(selector); 
	
		elements.forEach(elem => { 
			elem.classList.remove(activeClass); 
			if (elem.getAttribute('id') === localStorage.getItem('sex')) { 
				elem.classList.add(activeClass); 
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { 
				elem.classList.add(activeClass); 
			}
		});
	}
	initLocalSettings('#gender div', 'calculating__choose-item_active'); 
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); 
	
	
	function calcTotal() { 
		if (!sex || !height || !weight || !age || !ratio) { 
			result.textContent = '...'; 
			return; 
		} 
	
		if (sex === 'female') { 
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); 
		} else { 
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); 
		}
	}
	calcTotal(); 
	
	
	function getStaticInfo(selector, activeClass) { 
		const elements = document.querySelectorAll(selector); 
	
		elements.forEach(elem => {  
			elem.addEventListener('click', (e) => { 
				if (e.target.getAttribute('data-ratio')) { 
					ratio = +e.target.getAttribute('data-ratio'); 
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); 
				} else { 
					sex = e.target.getAttribute('id'); 
					localStorage.setItem('sex', e.target.getAttribute('id')); 
				}
				console.log(ratio, sex);
	
				elements.forEach(elem => { 
					elem.classList.remove(activeClass); 
				});
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
	
			if (input.value.match(/\D/g)) { 
				input.style.border = '1px solid red'; 
			} else { 
				input.style.border = 'none'; 
			}
	
			switch(input.getAttribute('id')) { 
				case 'height': 
					height = +input.value; 
					break; 
				case 'weight': 
					weight = +input.value; 
					break;
				case 'age': 
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc); // Модифицируем экспорт на Модульную структуру ES6 (вместо CommandJS) - было module.exports = calc;

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

 // импортируем функцию, которая работает с севрвером

function cards() {
	// Use class for card

    class MenuCard { // Создание шаблона
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { // classes (rest оператор - если мы не знаем, какие мы классы в будущем захотим добавить этому элементу)
            this.src = src; // путь для картинки
            this.alt = alt; // альтернативный текст (будет подгружаться, если картинка сломалась)
            this.title = title; // заголовок
            this.descr = descr; // описание 
            this.price = price; // цена
            this.classes = classes; // rest оператор (внутри будет массив)

            this.parent = document.querySelector(parentSelector); // Родитель элемента
            this.transfer = 88; // Курс рубля к гривне
            this.changeToUAH(); // вставляем метод после this.price и this.transfer (свойства в классе тоже идут по порядку сверху вниз)
        }

        changeToUAH() { // Добавялем метод (конвертация валюты)
            this.price = this.price * this.transfer;
        }

        render() { // Создание нового элемента (помещаем в него верстку, ее дополняем данными, которые приходят, как аргументы и помещаем элемент на страницу)
            const element = document.createElement('div'); // создание нового элемента с классом div
            if (this.classes.length === 0) { // ставим параметры по умолчанию через условие (если массив rest оператора будет пустым)
                this.element = 'menu__item'; // записали в свойство класса значение (это не связано с переменной element) PS: если мы создаем свойство внутри метода - это не считается конструктором. Просто свойство появилось в процессе работы класса.
                element.classList.add(this.element); // добавляем в element значение this.element
            } else { // Если в массиве rest есть какие нибудь элементы, то добавляем их
                this.classes.forEach(className => { // с помощью перебора добавляем элементу классы
                    element.classList.add(className);
                });
            }

        
            element.innerHTML = ` 
                    <img src=${this.src} alt=${this.alt}> 
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
                    </div>
            `;
            this.parent.append(element); // вставляем элемент внутрь родителя
        }
    }


	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => { // дестркутуризация
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});
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

 // импортируем функции openModal, closeModal в модуль forms - импортиурем синтаксисом именованных импортов
// Импорт функции, которая работает с сервером
 // импортируем функциию постинга данных из services.js

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

			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(' http://localhost:3000/requests', json) // используем эту функцию вместо fetch выше, данные будут отправляться в db.json   (в качестве data был JSON.stringify(object))
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
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); // передаем аргументы 

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
				(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal'); // передаем селектор (аргумент из modal)
			}, 3000);
		}
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
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);
// в модуле forms (нет фукнций openModal и closeModal)
 // экспортируем функции (отдельные от modal) - делаем их именованными, а не по умолчанию


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

// Деструктуризируем - меняем селекторы на аргументы функции slider с помощью обьекта
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    // Slider 
	const slides = document.querySelectorAll(slide), // Подставляем аргумент slide (при вызове в script.js будет вызваться значение ключа slide - '.offer__slide'
		prev = document.querySelector(prevArrow), 
		next = document.querySelector(nextArrow), 

		total = document.querySelector(totalCounter), 
		current = document.querySelector(currentCounter), 
		slidesWrapper = document.querySelector(wrapper), 
		slidesField = document.querySelector(field), 
		width = window.getComputedStyle(slidesWrapper).width; 

	const slider = document.querySelector(container); // Подставляем аргумент container (при вызове в script.js будет вызваться значение ключа container - '.offer__slider'
	slider.style.position = 'relative'; 
	const dots = []; 

	let slideIndex = 1; 
	let offset = 0; 

	if (slides.length < 10) { 
		total.textContent = `0${slides.length}`; 
		current.textContent = `0${slideIndex}`; 
	} else {
		total.textContent = slides.length; 
		current.textContent = slideIndex; 
	}


	slidesField.style.width = 100 * slides.length + '%'; // меняем ширину карусели (100 * количество слайдов) - 400%
	slidesField.style.display = 'flex'; // Карусель делаем в флексбокс (чтобы слайды стали горизонтально)
	slidesField.style.transition = '0.5s all'; // добавляем карусели плавный переход 

	slidesWrapper.style.overflow = 'hidden'; // Все выходит за пределы обертки делаем невидимым


	slides.forEach(slide => { // слайдам делаем фиксированную ширину в 650px (если этого не делать и без флексбокса и хиддена, ширина будет занимать все ширинку карусели - 2600px)
		slide.style.width = width;
	});


	// Выводим повторяющийся функционал в отдельные функции
		// Функция добавления класса активности точкам (работа с массивом)
		function dotActive() {
			dots.forEach(dot => dot.style.opacity = '.5'); // перебираем массив и меняем прозрачность всем точкам на 0.5
			dots[slideIndex - 1].style.opacity = 1; // Первой точке и последующим при клике (будет менять прозрачность на 1 - на активную точку)
		}

		// Функция добавления текущего слайда на страницу
		function currentOnPage() {
			if (slides.length < 10) { // если количество слайдов меньше 10
				current.textContent = `0${slideIndex}`; // То вставляем на страницу с 0
			} else { // если меньше 10 
				current.textContent = slideIndex; // То вставялем на сраницу без 0
			}
		}

	// Создаем обертку для наших точек
	const dotsWrapper = document.createElement('ol'); // создаем обертку - элемент ordered-list
	dotsWrapper.classList.add('carousel-indicators'); // добавляем ему класс
	slider.append(dotsWrapper); // помещаем его внутрь слайдера

	// Создаем новые элементы (точки) с помощью цикла
	for (let i = 0; i < slides.length; i++) { // цикл (i меньше количества слайдов)
		const dot = document.createElement('li'); // создаем точки (list-item)
		dot.setAttribute('data-slide-to', i + 1); // устанавливаем data атрибут точкам со значением i + 1 (0 + 1) - чтобы потом его сопоставить с текущим слайдом на странице
		dot.classList.add('dot'); // устанавливаем класс для точек
		if (i == 0) { // условие (если i == 0 - первая точка)
			dot.style.opacity = 1; // меняем класс прозрачности (делаем первый элемент активным)
		}
		dotsWrapper.append(dot); // устанавливаем точки внутрь нашего списка
		dots.push(dot); // пушим в массив наши точки
	}

	function deleteNotDigits(str) { // добавляем функцию (удаляем не числа с помощью регулярки)
		return +str.replace(/\D/g, '');
	}


	next.addEventListener('click', (e) => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) { // Условие (если ширина (переводим в number и отрезаем пиксели) умноженная на количество слайдов - 1 (это последний слайд в массиве слайдов, именно его номер - получается, что первый слайд идет в ширину 650px и когда смещаемся на 1950px, при следующем клике сработает наше условие) - "мы долистали до конца слайдера и пора вернуть его к первому слайду"
			offset = 0; // тогда возвращаем карусель заново
		} else { // Если не поледний слайд
			offset += deleteNotDigits(width); // Добавляем offset (смещение) ширину без пикселей
		}
		slides.forEach(item => {
			item.classList.remove('hide');
		});

		slidesField.style.transform = `translateX(-${offset}px)`; // перемещаем карусель (вправо это будет -X (-650px)) - ориентируемся по оси Х (влево минус, вправо плюс)

		if (slideIndex == slides.length) { // если текущий слайд будет равен последнему слайду
			slideIndex = 1; // то переместимся на первый слайд
		} else { // если не дошел до конца слайдера (не последий слайд)
			slideIndex++; // то прибавляем slideIndex на 1
		}

		// Добавляем текущий слайд на страницу
		currentOnPage();

		// Добавление активности точкам в зависимости от кнопки на которую нажали
		dotActive();
	});


	prev.addEventListener('click', () => {
		if (offset == 0) { // Условие (если offset будет равен 0, то при клике на кнопку предыдущего слайдера будет срабатывать условие)
			offset = deleteNotDigits(width) * (slides.length - 1); // тогда возвращаем слайдер в последний слайд (offset 1950px - cмещение на 1950px - на последний слайд)
		} else { // Если не первый слайд
			offset -= deleteNotDigits(width); // у offset (смещения) отнимаем ширину (- на - будет давать +)
		}
		slides.forEach(item => {
			item.classList.remove('hide');
		});

		slidesField.style.transform = `translateX(-${offset}px)`; // Перемещаем карусель (Влево это будет - (-650px) - минус на минус плюс = +650px) 

		if (slideIndex == 1) { // если у нас первый слайд
			slideIndex = slides.length; // То меняем slideIndex на количетсво всех слайдов (то есть перемещаемся в конец слайдера)
		} else { // Если не первый слайд
			slideIndex--; // То мы уменьшаем наш slideIndex на 1
		}

		// Добавляем текущий слайд на страницу
		currentOnPage();

		// Добавление активности точкам в зависимости от кнопки на которую нажали
		dotActive();

	});

	dots.forEach(dot => { // перебираем массив
		dot.addEventListener('click', (e) => { // вешаем обработчик событий на отдельную точку
			const slideTo = e.target.getAttribute('data-slide-to'); // помещаем в переменную (наше значение data-slide-to)
	
			slideIndex = slideTo; // меняем наш slideIndex на значение в data атрибуте (кликнули на 4 точку и в slideIndex пойдет значение 4)
			offset = deleteNotDigits(width) * (slideTo - 1); // получение offset (ширину умножаем на slideTo - 1) - смещение на определенную ширину (нажали на 3 кнопку - ширину 650 * 2 = 1300px, на 4 кнопку - 650 * 3 = 1950px) 
	
			slidesField.style.transform = `translateX(-${offset}px)`; // добавляем смещение слайдера 
	
			// Добавляем текущий слайд на страницу
			currentOnPage();
	
			// Добавление активности точкам в зависимости от кнопки на которую нажали
			dotActive();
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

// Меняем селекторы на аргмуенты функции (после этого мы можем вызывать несколько табов на странице, делаем универсальным модуль (наш модуль не знает с какими элементами он будет работать до вызова, ему это и не нужно знать))
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    // Tabs
    const tabContent = document.querySelectorAll(tabsContentSelector); // Подставляем аргумент
    const tabs = document.querySelectorAll(tabsSelector); // Подставляем аргумент
    const tabsParent = document.querySelector(tabsParentSelector); // Подставляем аргумент

    const hideTabContent = () => {
        tabContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
        item.classList.remove(activeClass); // Подставляем аргумент
        });
    };

    const showTabContent = (i = 0) => { 
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass); // Подставляем аргумент
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        // Подставляем аргумент ('.tabheader__item'), но у нас classList - селектор должен быть без точки
        if (target && target.classList.contains(tabsSelector.slice(1))) { // чтобы не было ошибки (начинаем аргмуент со второго символа - без точки)
        tabs.forEach((item, i) => {
            if (target == item) { 
            hideTabContent(); 
            showTabContent(i); 
            }
        });
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

function timer(id, deadline) { // Добавляем аргументы функции (deadline ставим, чтобы менять даты в script.js - для удобства)

    // Timer
	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.now();
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor((t / (1000 * 60 * 60) % 24));
			minutes = Math.floor((t / (1000 * 60) % 60));
			seconds = Math.floor((t / 1000) % 60);
		}

		return {total: t, days, hours, minutes, seconds};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	} 

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),

			timeInterval = setInterval(updateClock, 1000);

		updateClock();
  
		function updateClock() {
			const t = getTimeRemaining(endtime);
				days.innerHTML = getZero(t.days);
				hours.innerHTML = getZero(t.hours);
				minutes.innerHTML = getZero(t.minutes);
				seconds.innerHTML = getZero(t.seconds);
			
				if (t.total <= 0) {
					clearInterval(timeInterval);
				}
			}	
		}
	
	setClock(id, deadline); // подставляем аргумент id

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
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
// Функции, которые работают с сервером выносят с отдельный функцоинал (потому что на проекте она может пригодитсья где угодно)

// Функция постинг данных из модуля forms
const postData = async (url, data) => { // создаем функцию постинг данных (url передается в fetch, data - данные, которые будут поститься)
	const res = await fetch(url, { // переменная res внутрь помещаем промис, который возвращается от fetch, передаем аргумент url
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data // было JSON.stringify(object)
	}); // res - это ответ от сервера (промис)

	return await res.json(); // трансофрмируем ответ в json (возвращаем промис и дальше по обрабатываем по цепочке then), await ставим потому что нам нужно дождаться промис
};

// Функуция получения карточек
const getResource = async (url) => { // создаем функцию получение данных
    const res = await fetch(url);

    // Промис завершается с ошибкой, если fetch не смог выполнить HTTP-запрос, например при ошибке сети или если нет такого сайта. HTTP-статусы 404 и 500 не являются ошибкой
    // обрабатываем ошбику вручную 
    if (!res.ok) { // .ok ( логическое значение: будет true, если код HTTP-статуса в диапазоне 200-299)
        // Обьект ошибки new Error(текст ошибки)
        // throw — это значение исключения, то есть описание ситуации, которая должна считать ошибочной. (выкинь нам ошибку)
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); // status – код статуса HTTP-запроса, например 200
    }

    return await res.json(); // трансофрмируем ответ в json (возвращаем промис и дальше по обрабатываем по цепочке then), await ставим потому что нам нужно дождаться промис
};

 // экспортируем функцию



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
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");


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


	 // Импортируем функцию из файла tabs.js - юзаем CommandJS,  PS: порядок подключения модулей не важен
	 // Импортируем функцию из файла modal.js - юзаем CommandJS
	
	
	
	
	
	 // импортируем openModal, потому что мы юзаем ее в script.js (в modalTimerId глобально)

window.addEventListener('DOMContentLoaded', () => {
		// Создаем переменную в script.js (потому что этот аргумент будет юзаться и в модуле modal и в forms (в функциях openModal, которые внутри этих модулей))
		const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000); // делаем стрелочную функцию, чтобы передать аргументы

		(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); // вызываем функцию tabs и подставляем все аргументы
		(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId); // вызываем функцию modal и подставляем аргументы - тут мы связываем openModal и modal и в дальнейшем forms (в этом модуле есть openModal)
		(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2024-07-16'); // передаем аргументы - селектор и дату деадлайна
		(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
		(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({ // использование деструктуризации (передаем обьект, который будет содержать определные настройки)
			container: '.offer__slider', // в клюич container (аргмуент функции slider) подставляем значение селектора
			nextArrow: '.offer__slider-next',
			prevArrow: '.offer__slider-prev',
			slide: '.offer__slide',
			totalCounter: '#total',
			currentCounter: '#current',
			wrapper: '.offer__slider-wrapper',
			field: '.offer__slider-inner',

		});
		(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId); // передаем аргумент в формы, потому что будем юзать его в формах для функции openModal
		(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

// npx webpack (собираем все вместе)
// в папке js появился файл bundle.js
// в HTML подключить файл bundle.js - <script src="js/bundle.js"></script>

// lifehack: чтобы юзать два терминала одновременно (webpack и json-server) использовать кнопку + в терминале (создание нового терминала)










































})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
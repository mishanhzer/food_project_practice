'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabContent = document.querySelectorAll('.tabcontent');
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsParent = document.querySelector('.tabheader__items');

  const hideTabContent = () => { // создаем функцию, которая будет прятать tabcontent
    tabContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
      // item.style.display = 'none';
    })

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active'); // удаляем класс активности при вызове этой функции
    })
  };

  const showTabContent = (i = 0) => { // создаем функцию, которая будет показывать tabcontent (работаем через параметры функции, потому что будет ее вызывать через событие, где нужно будет указать i)
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    // tabContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active'); // добавляем класс активности при вызове этой функции
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) { // делигируем на содержание класса 'tabheader__item'
      tabs.forEach((item, i) => {
        if (target == item) { // если e.target при клике будет соответствовать item, то вызываем функции
          hideTabContent(); // сначала прячем все элементы
          showTabContent(i); // затем добавляем нужный нам элемент при клике (i элемент tabs будет работать с tabContent[i] и добавлять класс активности tabs[i])
        }
      })
    }
  });

  // Timer
  const deadline = '2023-12-10';

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
  
  	setClock('.timer', deadline);

    // Modal

	const modalTrigger = document.querySelectorAll('[data-modal]');
	const modal = document.querySelector('.modal');


	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	modalTrigger.forEach(item => {
		item.addEventListener('click', openModal)
	});


	const closeModal = () => {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	};

	modal.addEventListener('click', (e) => { // добавляем делегирование, если таргет === modal или таргет === атрибут data-close равен пустой строке (делаем это для того, что если мы элементы создаем динамически в js, то получение через document.querySelector не будет работать на новые динамические элементы, а через делигирование, через е.target будет работать и на новый динамические элементы)
		if (e.target === modal || e.target.getAttribute('data-close') == '') { // data-close в html равен пустоте, поэтому чтобы получить true сравниваем его с пустой строкой (но я бы лучше юзал e.target.hasAttribute('data-close'), тут не надо ни с чем сравнивать)
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);


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
			})
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

// первый способ:
// const div = new MenuCard(); // создаем переменную с аргументами
// div.render(); // вставляем в элемент верстку с помощью метода

// второй способ:
// создание обьекта без вложения его в переменную (это делатся тогда, когда обьект используется на месте - то есть он создастся и он удалится, потому что на него не будет никаких ссылок)


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





		
// деструктуризируем обьект для еще большего уменьшения кода
	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({img, altimg, title, descr, price}) => { // дестркутуризация
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});


	axios.get('http://localhost:3000/menu') // метод get (внутри axios) 
		.then(data => {
			data.data.forEach(({img, altimg, title, descr, price}) => { // свойство data внутри обьекта
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});
	

	// Forms FormData
// const forms = document.querySelectorAll('form');

// const message = {
// 	loading: 'img/form/spinner.svg', // добавляем картинку спиннера
// 	success: 'Спасибо, скоро мы с вами свяжемся',
// 	failure: 'Что-то пошло не так...'
// };

// forms.forEach(item => {
// 	postData(item);
// })

// function postData(form) {
// 	form.addEventListener('submit', (e) => {
// 		e.preventDefault();

// 		const statusMessage = document.createElement('img'); // создаем элемент с тегом img
// 		statusMessage.src = message.loading; //  указыаем путь к элементу (или юзаем setAttribute)
// 		statusMessage.style.cssText = ` 
// 			display: block;
// 			margin: 0 auto;
// 		`; 
// 		form.insertAdjacentElement('afterend', statusMessage); 

// 		const formData = new FormData(form); 

// 		fetch('server.php', {
// 			method: 'POST',
// 			body: formData
// 		})
// 		.then(data => data.text())
// 		.then((data) => {
// 			console.log(data);
// 			showThanksModal(message.success);
// 			statusMessage.remove();

// 		})
// 		.catch(() => {
// 			showThanksModal(message.failure);
// 		})
// 		.finally(() => {
// 			form.reset();
// 		})
		
// 	});
// }


// // 	function thanksModal(message) {
// // 		const modal = document.querySelector('.modal__dialog');
// // 		modal.classList.add('hide');
// // 		openModal();

// // 		const newModal = document.createElement('div');
// // 		newModal.classList.add('modal__dialog');
// // 		newModal.innerHTML = `
// // 			<div class="modal__content">
// // 				<div data-close class="modal__close">×</div>
// // 				<div class="modal__title">${message}</div>
// // 			</div>
// // 		`;
// // 		document.querySelector('.modal').append(newModal);
// // 		setTimeout(() => {
// // 			newModal.remove();
// // 			modal.classList.add('show');
// // 			modal.classList.remove('hide');
// // 		}, 3000)
// // 	}

// // 		// Добавляем красивое оповещение пользователя

// 	function showThanksModal(message) { // создаем функцию с аргументом message
// 	const previousModalDialog = document.querySelector('.modal__dialog'); // Берем существующее модальное окно (получаем класс modal__dialog)

// 	previousModalDialog.classList.add('hide'); // добавляем класс 'hide' (скрываем элемент перед тем как показать модальное окно) не удаляем, а скрываем (если полностью удалим блок, и пользователю нужно будет еще раз открыть модальное окно и отправить форму, то этого блока просто не будет на странице)
// 	openModal(); // открываем модальное окно, чтобы в будущем мы могли его изменить

// 	const thanksModal = document.createElement('div'); // создаем новый элемент
// 	thanksModal.classList.add('modal__dialog'); // добавляем класс modal__dialog (один modal__dialig заменяем другим modal__dialog)
// 	thanksModal.innerHTML = ` 
// 		<div class="modal__content">
// 			<div class="modal__close" data-close>×</div>
// 			<div class="modal__title">${message}</div>
// 		</div>
// 	`; // внутрь элемента помещаем верстку

// 	document.querySelector('.modal').append(thanksModal); // помещаем (аппендим) этот элемент в конец элемента modal (заменяем старый, который спрятан, на новый)

// 	setTimeout(() => { // создаем асинхронную операцию
// 		thanksModal.remove(); // удаляем элемент thanksModal
// 		previousModalDialog.classList.add('show'); // добавляем показ элемента
// 		previousModalDialog.classList.remove('hide'); // убираем класс 'hide'
// 		closeModal(); // закрываем модальное окно
// 	}, 4000);
// }

	


	// forms JSON
	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'Загрузка',
		success: 'Спасибо, скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	})

	


// Меняем данные внутри js на данные json (бэек администраторы в основном настривают карточки через административную панель)
// оптимизация функций к формам (потому что url форм может меняться) - функционал по общению с сервером выносим в отдельные функции

// У нас это асинхронных код (создаем запрос fetch, который уходит на сервер, а код идет дальше и получается в моменте в res у нас ничего нет (в fetch у нас есть только обещание, которое обещает что то нам вернуть) и код дальше выдаст просто ошибку return res.json(), потому что res undefined в моменте
// поэтому используем пару async await (async ставится перед функцией (показыаваем, что внутри функции у нас будет асинхронный код), await ставится перед теми операциями, которые нам необходимо дождаться)
	

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


	function bindPostData(form) { // меняем название функции на привязку постинга данных
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.innerHTML = message.loading;
			form.append(statusMessage);

			
			const formData = new FormData(form); // у формы в input всегда должен быть атрибут 'name' (иначе FormData не сможет найти input и не сможет взять у него value для того, чтобы сформировать правильно обьект)

			// const object = {};
			// formData.forEach(function(value, key) {
			// 	object[key] = value;
			// });

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
				})		


			// fetch('server.php', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-type': 'application/json'
			// 	},
			// 	body: JSON.stringify(object)
			// })
			
			
		});

	// Красивое оповещение
		function showThanksModal(message) {
			const previousModalDialog = document.querySelector('.modal__dialog');

			previousModalDialog.classList.add('hide');
			openModal();

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
				closeModal();
			}, 400000);
		}
	}

	// simple Slider

	const parentSlider = document.querySelector('.offer__slider-wrapper');
	const imageSlider = document.querySelectorAll('.offer__slide');

	let spanCurrent = document.querySelector('span#current');
	let spanTotal = document.querySelector('span#total');

	const sliderBtn = document.querySelector('.offer__slider-counter');
	let counter = 1;

	
	sliderBtn.addEventListener('click', (e) => {
		const target = e.target;
		counterIndex(target);
	});

	function counterIndex(target) {
		if (target && target.classList.contains('offer__slider-next') || target.classList.contains('img__slider-next')) {
			if (spanCurrent.innerText < spanTotal.innerText) {
				spanCurrent.textContent = `0${++counter}`;
			} else {
				counter = 0;
				spanCurrent.textContent = `0${++counter}`;
			}

			nextImageSlider(spanCurrent.textContent);
		} 

		if (target && target.classList.contains('offer__slider-prev') || target.classList.contains('img__slider-prev')) {
			if (spanCurrent.innerText <= 1) {
				counter = 5;
				spanCurrent.textContent = `0${--counter}`;
			} else {
				spanCurrent.textContent = `0${--counter}`;
			}
			previousImageSlider(spanCurrent.textContent);
		} 
	}


	function nextImageSlider(element) {
		imageSlider.forEach((image, i) => {
			if (element - 1 === i) {
				image.classList.add('show');
				image.classList.remove('hide');
			} else {
				image.classList.add('hide');
			}
		})
	}

	function previousImageSlider(element) {
		imageSlider.forEach((image, i) => {
			if (element - 1 === i) {
				image.classList.add('show');
				image.classList.remove('hide');
			} else {
				image.classList.add('hide');
			}
		});
	};

	
	function defaultImage(el, i) {
		imageSlider.forEach((item,i) => {
			if (i === 0) {
				spanCurrent.textContent = `0${1}`;
				item.classList.add('show');
				item.classList.remove('hide');
			} else {
				item.classList.add('hide');
			}
		});
	}
	defaultImage();
});









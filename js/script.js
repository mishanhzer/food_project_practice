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

	// const modalTimerId = setTimeout(openModal, 50000);

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

	// simple Slider Моя первая практика со слайдером (сделал сам полностью)

// Первый мой вариант

	// const parentSlider = document.querySelector('.offer__slider-wrapper'); // !PS: Родитель картинок слайдов оказался не нужен
	// const imageSlider = document.querySelectorAll('.offer__slide'); // Получение массива слайдеров (картинок)

	// let spanCurrent = document.querySelector('span#current'); // получаем элемент текущего слайда
	// let spanTotal = document.querySelector('span#total'); // получаем элемент количества всех слайдов

	// const sliderBtn = document.querySelector('.offer__slider-counter'); // Получение родителя кнопок
	// let counter = 1; // создаем счетчик


	// sliderBtn.addEventListener('click', (e) => { // навешиваем обработчик события на родителя кнопок
	// 	const target = e.target;
	// 	counterIndex(target);
	// });

	// function counterIndex(target) { // создаем функцию, которая меняет счетчик слайдов
	// 	if (target && target.classList.contains('offer__slider-next') || target.classList.contains('img__slider-next')) { // делаем условие, делигируем
	// 		if (spanCurrent.innerText < spanTotal.innerText) { // условие (если кол-во слйдов меньше чем общее кол-во слайдов)
	// 			spanCurrent.textContent = `0${++counter}`;
	// 		} else { // иначе (начинаем счетчик заново)
	// 			counter = 0;
	// 			spanCurrent.textContent = `0${++counter}`;
	// 		}

	// 		nextImageSlider(spanCurrent.textContent);
	// 	} 

	// 	if (target && target.classList.contains('offer__slider-prev') || target.classList.contains('img__slider-prev')) { // делаем аналогчно выше, только в обратную сторону
	// 		if (spanCurrent.innerText <= 1) {
	// 			counter = 5;
	// 			spanCurrent.textContent = `0${--counter}`;
	// 		} else {
	// 			spanCurrent.textContent = `0${--counter}`;
	// 		}

	// 		nextImageSlider(spanCurrent.textContent);
	// 	} 
	// }


	// function nextImageSlider(element) { // создаем функцию на получение следующей картинки в слайде
	// 	imageSlider.forEach((image, i) => { // перебираем картинки со слайдами
	// 		if (element - 1 === i) { // если элемент (элемент текущего слайда) будет равен индексу
	// 			image.classList.add('show');
	// 			image.classList.remove('hide');
	// 		} else {
	// 			image.classList.add('hide');
	// 		}
	// 	})
	// }



	// function defaultImage(el, i) { // создаем функцию на получение дефолтной картинки и счетчика
	// 	imageSlider.forEach((item,i) => { // перебор слайдов
	// 		if (i === 0) { // если индекс = 0
	// 			spanCurrent.textContent = `0${1}`; // вставляем на страницу счетчик 01
	// 			item.classList.add('show'); // показываем первую картинку слайда
	// 			item.classList.remove('hide');
	// 		} else {
	// 			item.classList.add('hide');
	// 		}
	// 	});
	// }
	// defaultImage();


	// Второй мой вариант (после отдыха)

	// let sliderImg = document.querySelectorAll('.offer__slide'); // Получение блоков с картинками слайдера
	
	// let sliderBtn = document.querySelector('.offer__slider-counter'); // Получение родителя для кнопок
	
	// let currentSlider = document.querySelector('#current'); // Получение текущего количества слайдов
	// let totalSlider = document.querySelector('#total'); // Получение общего количества слайдов
	// let counter = 1; // Создание счетчика

	// sliderBtn.addEventListener('click', (e) => { // Навешиваем обработчик события на родителя кнопок
	// 	let target = e.target;
	// 	if (target && target.classList.contains('offer__slider-next') || target.classList.contains('img__slider-next')) { // Делигируем на кнопку следующего слайда (Используем оператор ИЛИ, потому что одновременно на два элемента тыкнуть мы не можем)
	// 		currentSlider.textContent = `0${++counter}`; // Добавляем на страницу прибавление счетчика
	// 		nextElementSlider(); // Используем функцию, которая перебирает блока со слайдами и показывает нам нужный слайд
	// 		if (counter > 4) { // Условие, если слайдов больше 4, то начинаем все заново
	// 			counter = 0;
	// 			currentSlider.textContent = `0${++counter}`;
	// 			nextElementSlider();
	// 		}
	// 	} 

	// 	// Аналогично верхнему условию, только в обратную сторону

	// 	if (target && target.classList.contains('offer__slider-prev') || target.classList.contains('img__slider-prev')) { // Делигируем на кнопку предыдущего слайда
	// 		currentSlider.textContent = `0${--counter}`;
	// 		nextElementSlider();
	// 		if (counter < 1) {
	// 			counter = 5;
	// 			currentSlider.textContent = `0${--counter}`;
	// 			nextElementSlider();
	// 		}
	// 	} 
	// });



	// function nextElementSlider() { // Создаем функцию перебора слайдов
	// 	sliderImg.forEach((item, i) => {
	// 		if (i === counter - 1) { // если индекс i(0) будет равен счетику (0) - индекс и счетчик будет расти взависимости от условий выше
	// 			item.classList.add('show'); // добавляем элементам класс show
	// 			item.classList.remove('hide'); // добавляем элементам класс hide
	// 		} else { // иначе убираем эти классы
	// 			item.classList.add('hide');
	// 			item.classList.remove('show');
	// 		}
	// 	});
	// }


	// function defaultImage() { // создаем функцию дефолтного изображения
	// 	sliderImg.forEach((item, i) => {
	// 		if (i === 0) { // если индекс = 0 
	// 			currentSlider.textContent = `0${counter}`; // вставляем на страницу номер дефолнтго слайда
	// 			item.classList.add('show'); // аналогично добавляем и удаляем классы
	// 			item.classList.remove('hide');
	// 		} else {
	// 			item.classList.add('hide');
	// 			item.classList.remove('show');
	// 		}
	// 	})
	// }
	// defaultImage();


	
	// Simple slider by Ivan Petrichenko

	// const slides = document.querySelectorAll('.offer__slide'); // получаем массив всех слайдов
	// const prev = document.querySelector('.offer__slider-prev'); // получаем кнопку предыдущего слайда
	// const next = document.querySelector('.offer__slider-next'); // получаем кнопку следующего слайда

	// const total = document.querySelector('#total'); // получаем общее количество слайдов
	// const current = document.querySelector('#current'); // получаем текущий слайд

	// let slideIndex = 1; // создаем индекс (счетчик)

	// showSlides(slideIndex); // вызов функции для инициализации слайдера (чтобы показался первый слайд)

	// // Условие общего количества слайдов делаем это после инициализации showSlides(slideIndex), чтобы показали общее количество слайдов (юзаем перед функцией, потому что showSlides будет вызываться вместе с обработчиком события и каждый раз когда нажимаем на кнопку будет мигать элемент с общим количеством слайдов (каждый раз общее количество слайдов будет меняться при нажатии на нопку))
	// if (slides.length < 10) { // Условие (если количество слайдов меньше 10)
	// 	total.textContent = `0${slides.length}`; // вставляем в индекс общего количества слайдов - 0 с количеством слайдов
	// } else {
	// 	total.textContent = slides.length; // если больше 10, то просто вставляем на страницу в индекс обдего количества слайдов - количество слайдов без 0
	// }

	// function showSlides(n) { // n принимает в себя slideIndex
	// 	if (n > slides.length) { // Условие (если текущий слайд больше количества всех слайдов)
	// 		slideIndex = 1 // то текущий слайд мы возвращаем в начало
	// 	}

	// 	if (n < 1) { // Условие (если текущий слайд меньше 1)
	// 		slideIndex = slides.length; // то в текущий слайд мы помещаем количество всех слайдов (то есть начинмем слайдер с конца)
	// 	}

	// 	slides.forEach(item => item.style.display = 'none'); // скрываем все слайды через inline стили

	// 	slides[slideIndex - 1].style.display = 'block'; // показ текущего слайда (отталкиваемся от slideIndex), отнимаем 1, чтобы получить адеватный индекс (если первый слайд, то индекс 0, если второй слайд, то индекс 1)


	// 	// Условие, которое меняет наш счетчик и вставляем на страницу (когда работаем с текущим слайдом, юзаем внутри функции, чтобы показ слайдов соответствовал с индексом слайда)
	// 	if (slides.length < 10) { // Условие (если количество слайдов меньше 10)
	// 		current.textContent = `0${slideIndex}`; // вставляем в индекс текущего слайда - текущий слайд
	// 	} else {
	// 		current.textContent = slideIndex; // если больше 10, то просто вставляем на страницу индекс текущего слайда - текущий слайд без 0
	// 	}
	// }

	// function plusSlides(n) { // создаем функцию, который будет прибавлять индекс
	// 	showSlides(slideIndex += n); // если будет 1, то будет прибавляться к slideIndex 1, если -1, то будет убавляться к slideIndex 1
	// }

	// prev.addEventListener('click', () => { // создаем обработчик события на кнопку предыдущего слайда
	// 	plusSlides(-1); // отнимаем 1 у slideIndex (то есть будет проходить все условия функции showSlides и будет показываться предыдущая картинка слайда)
	// });

	// next.addEventListener('click', () => { // создаем обработчик события на кнопку следующего слайда
	// 	plusSlides(1); // прибавляем 1 к slideIndex (то есть будет проходить все условия функции showSlides и будет показываться следующая картинка слайда)
	// });


	// Difficult slider by Ivan Petrichenko (Сarousel) 

	const slides = document.querySelectorAll('.offer__slide'), // получаем массив всех слайдов
	prev = document.querySelector('.offer__slider-prev'), // получаем кнопку предыдущего слайда
	next = document.querySelector('.offer__slider-next'), // получаем кнопку следующего слайда

	total = document.querySelector('#total'), // получаем общее количество слайдов
	current = document.querySelector('#current'), // получаем текущий слайд
	slidesWrapper = document.querySelector('.offer__slider-wrapper'), // Получаем обертку слайдера (что за пределами ее будем скрывать)
	slidesField = document.querySelector('.offer__slider-inner'), // Получаем карусель (будет занимать столько ширины, сколько слайдов в слайдере)
	width = window.getComputedStyle(slidesWrapper).width; // Получаем ширину обертки слайдера (650px)

	const slider = document.querySelector('.offer__slider'); // Получаем весь слайдер
	slider.style.position = 'relative'; // ставим в позицию relative
	const dots = []; // создаем массив (нужно поместить точки в структуру, чтобы потом работать с ней)

	let slideIndex = 1; // создаем индекс (счетчик)
	let offset = 0; // создаем (смещение)

	if (slides.length < 10) { // Условие (если количество слайдов меньше 10)
		total.textContent = `0${slides.length}`; // вставляем в индекс общего количества слайдов - 0 с количеством слайдов
		current.textContent = `0${slideIndex}`; // вставляем в индекс текущего слайда - первый слайд
	} else {
		total.textContent = slides.length; // если больше 10, то просто вставляем на страницу в индекс общего количества слайдов - количество слайдов без 0
		current.textContent = slideIndex; // если больше 10, то вставляем на страницу в индекс текущего слайда - текущий слайд без 0
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
		};

		// Функция добавления текущего слайда на страницу
		function currentOnPage() {
			if (slides.length < 10) { // если количество слайдов меньше 10
				current.textContent = `0${slideIndex}`; // То вставляем на страницу с 0
			} else { // если меньше 10 
				current.textContent = slideIndex; // То вставялем на сраницу без 0
			}
		};

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
	};

	function deleteNotDigits(str) { // добавляем функцию (удаляем не числа с помощью регулярки)
		return +str.replace(/\D/g, '');
	}


	next.addEventListener('click', (e) => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) { // Условие (если ширина (переводим в number и отрезаем пиксели) умноженная на количество слайдов - 1 (это последний слайд в массиве слайдов, именно его номер - получается, что первый слайд идет в ширину 650px и когда смещаемся на 1950px, при следующем клике сработает наше условие) - "мы долистали до конца слайдера и пора вернуть его к первому слайду"
			offset = 0; // тогда возвращаем карусель заново
		} else { // Если не поледний слайд
			offset += deleteNotDigits(width) // Добавляем offset (смещение) ширину без пикселей
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



});






















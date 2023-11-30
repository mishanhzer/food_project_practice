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

	// const modalTrigger = document.querySelectorAll('[data-modal]');
	// const modal = document.querySelector('.modal');
	// const closeModalBtn = document.querySelector('[data-close]');


	// function openModal() {
	// 	modal.classList.add('show');
	// 	modal.classList.remove('hide');
	// 	document.body.style.overflow = 'hidden';
	// 	clearInterval(modalTimerId);
	// }

	// modalTrigger.forEach(item => {
	// 	item.addEventListener('click', openModal)
	// });


	// const closeModal = () => {
	// 	modal.classList.add('hide');
	// 	modal.classList.remove('show');
	// 	document.body.style.overflow = '';
	// };

	// closeModalBtn.addEventListener('click', closeModal);

	// modal.addEventListener('click', (e) => {
	// 	if (e.target === modal) {
	// 		closeModal();
	// 	}
	// });

	// document.addEventListener('keydown', (e) => {
	// 	if (e.code === 'Escape' && modal.classList.contains('show')) {
	// 		closeModal();
	// 	}
	// });

	// const modalTimerId = setTimeout(openModal, 5000);

	// function showModalByScroll() {
	// 	if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
	// 		openModal();
	// 		window.removeEventListener('scroll', showModalByScroll);
	// 	}
	// }

	// window.addEventListener('scroll', showModalByScroll);


	// Use class for card

	
class MenuCard { // Создание шаблона
	constructor(src, alt, title, descr, price, current, parentSelector, ...classes) { // classes (rest оператор - если мы не знаем, какие мы классы в будущем захотим добавить этому элементу)
		this.src = src; // путь для картинки
		this.alt = alt; // альтернативный текст (будет подгружаться, если картинка сломалась)
		this.title = title; // заголовок
		this.descr = descr; // описание 
		this.price = price; // цена
		this.current = current; // валюта
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
					<div class="menu__item-total"><span>${this.price}</span> ${this.current}/день</div>
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
new MenuCard(
	'img/tabs/vegy.jpg', // ссылка src
	'vegy', // alt
	'Меню "Фитнес"', // title (использование разной комбинации кавычек)
	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', // description
	9, // price
	'руб',
	'.menu .container', // parent selector
	'menu__item', // добавили класс (rest оператор classes) не юзаем точку, потому что будет использовать в classList
	'big', // добавили еще один класс для теста
).render();

new MenuCard(
	'img/tabs/elite.jpg',
	'elite',
	'Меню “Премиум”',
	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	12,
	'руб',
	'.menu .container',
	'menu__item',
	'test',
).render();

new MenuCard(
	'img/tabs/post.jpg',
	'post',
	'Меню "Постное"',
	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	3,
	'руб',
	'.menu .container',
	'menu__item',
	'yet',
).render();

// PS: Нарушение принципа DRY(dont repeat yourself) - в будующем научимся исправлять это


});













































































import {getResource} from '../services/services'; // импортируем функцию, которая работает с севрвером

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


	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => { // дестркутуризация
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});
}

export default cards;
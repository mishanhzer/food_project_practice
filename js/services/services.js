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

export {postData}; // экспортируем функцию
export {getResource};
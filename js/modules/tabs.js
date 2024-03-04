
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

export default tabs;
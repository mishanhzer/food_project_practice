window.addEventListener('DOMContentLoaded', () => {
  const tabContent = document.querySelectorAll('.tabcontent');
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsParent = document.querySelector('.tabheader__items');

  const hideTabContent = () => {
    tabContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
      // item.style.display = 'none';
    })

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    })
  };


  const showTabContent = (i = 0) => {
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    // tabContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  })





})


































import initAnimationEfects from "../js/animation.js";


/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.querySelector('#nav-menu'),
    navToggle = document.querySelector('#nav-toggle'),
    navClose = document.querySelector('#nav-close');
  

/*===== MENU SHOW =====*//*===== MENU HIDDEN =====*/
/* Validate if constant exists */

function toggleMenu( ){
  navMenu.classList.toggle('show-menu');
}

navToggle ? navToggle.addEventListener('click', toggleMenu) : false; 
navClose ? navClose.addEventListener('click',toggleMenu) : false;

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
  const menu = document.querySelector('#nav-menu')
  toggleMenu(navMenu);
}
navLink.forEach(item => item.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const content = document.getElementsByClassName('skills-content');
const header = document.querySelectorAll('.skills-header');
const open = 'skills-open', close = 'skills-close';

function skillsAction() {
  const item = this.parentNode;

  console.log(item)
  // Remover a classe 'skills-open' de todos os elementos
  for (let i = 0; i < content.length; i++) {
    content[i].classList.remove(open);
  }

  if (item.classList.contains(open)) {
    item.classList.toggle(close);
  } else if( item.classList.contains(close)) {
    item.classList.add(open);
  }

}
header.forEach((item) => item.addEventListener('click', skillsAction));

/*==================== QUALIFICATION TABS ====================*/


const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');
const tabButtons = document.querySelectorAll('.qualification-button');
const activeTab = 'qualification-active'

tabs.forEach((tab) =>{
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove(activeTab) 
    })
    target.classList.add(activeTab)
    tab.forEach((tab) => { 
      tab.classList.remove(activeTab) 
    });
    tab.classList.add(activeTab)
  })
})

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remover a classe 'qualification-active' de todos os botões
    tabButtons.forEach((btn) => {
      btn.classList.toggle(activeTab);
      btn.style.backgroundColor = 'white'; // Cor de fundo padrão
      btn.style.color = '#232529';
    });

    // Adicionar a classe 'qualification-active' ao botão clicado
    button.classList.add(activeTab);

    // Alterar a cor do texto
    button.style.color = 'var(--primeira-cor)';
  });
});



/*==================== SERVICES MODAL ====================*/

const modalElements = document.querySelectorAll('.services-modal');
const buttonElements = document.querySelectorAll('.services-button');
const closeElements = document.querySelectorAll('.services-modal-close');

const activeModal = 'active-modal'

buttonElements.forEach((item, i) => {
  item.addEventListener('click', () =>{
    modalElements[i].classList.add(activeModal)
  })
});

closeElements.forEach((modalClose) => {
  modalClose.addEventListener('click', () => {
    modalElements.forEach((views) => {
      views.classList.remove(activeModal);
    });
  });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/


/*==================== CHANGE BACKGROUND HEADER ====================*/ 


/*==================== SHOW SCROLL UP ====================*/ 


/*==================== DARK LIGHT THEME ====================*/ 


initAnimationEfects()


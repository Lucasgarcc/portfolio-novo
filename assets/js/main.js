
import initAnimationEfects from "../js/animation.js";
import Validation from "../js/validation.js";

/*==================== VALIDATION FORM ====================*/

const name = document.querySelector('#name');
console.log(name);
const validateName =  new Validation(name).init();


const email = document.querySelector('#email');
console.log(email);
const validateEmail =  new Validation(email).init();
console.log(validateEmail);

const project = document.querySelector('#project');
const validateProject = new Validation(project).init();

const message = document.querySelector('#message');
const validateMessage = new Validation(message).init();


const form = document.querySelector('#form');

console.log(form)

const formValidation = new Validation(form).init();






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
      btn.style.backgroundColor = 'var(--body-cor)';; // Cor de fundo padrão
      btn.style.color = 'var(--text-cor)';
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

/*==================== PORTFOLIO SWIPER ====================*/

 new Swiper('.portfolio-container', {
  direction: 'horizontal',
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // And if we need scrollbar
  hide: true,
});

/*==================== SCROLL SMOOTH ====================*/
const navLinks = document.querySelectorAll('[data-menu="smooth"] a[href^="#"]');

function scrollSmooth(e) {
  e.preventDefault(); // Evita o comportamento padrão de rolagem

  const href = this.getAttribute('href'); // Obtém o href do link clicado
  const section = document.querySelector(href);

  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', scrollSmooth);
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY || window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    const sectionId = section.getAttribute('id');

    const navLink = document.querySelector('[data-menu="smooth"] a[href="#' + sectionId + '"]');
    if (navLink) {
      scrollY > sectionTop && scrollY < sectionTop + sectionHeight 
        ? navLink.classList.add('active') 
        : navLink.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', scrollActive);


/*==================== ANIMA SCROLL ====================*/ 

const sectionsScroll = document.querySelectorAll('[data-anima="scroll"]');
const windowView = window.innerHeight * 0.5;
const active  = 'active';

// variavel pega valor do window html atraves da prorpriedade
// innerHeight multiplicado por 60% da tela.

function animaScroll () {
  sectionsScroll.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const isSectionVIsible = sectionTop - windowView <= 0;
  // concatena a variavel -[section] a o metodo que pega,

    if (isSectionVIsible) {
      // varifica se valor do scroll da pagina for maior que zero.
        section.classList.add(active);
    } else  {
      section.classList.remove(active);
    }
  });
}

if (sectionsScroll.length) {
  animaScroll();
  window.addEventListener('scroll', animaScroll);
}

/*==================== CHANGE BACKGROUND HEADER ====================*/ 

function scrollBackground() {
  const nav = document.querySelector('.header');
  // Adiciona a classe 'scroll-header' quando a rolagem é maior que 90% da altura da viewport

  window.scrollY >= 80 ? 
  nav.classList.add('scroll-header') 
  : nav.classList.remove('scroll-header');

  // Verifica se a largura da viewport é menor ou igual a 390px
  if (window.matchMedia('(max-width: 400px)').matches) {
    // Se estiver em dispositivos menores, a classe é sempre adicionada ao rolar qualquer valor
    if (window.scrollY >= 0) {
      nav.classList.add('scroll-header');
    } else {
      nav.classList.remove('scroll-header');
    }
  }
}
window.addEventListener('scroll', scrollBackground);

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp() {
  const scrollUp = document.querySelector('#scroll-up');
  this.scrollY >= 500 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.querySelector('#theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// selected topic ( if user selected)
const selecedThem = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

//currently theme that the interface has by validating the dark-theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

selecedThem ? document.body.classList[selecedThem === 'dark' ? 'add' : 'remove'](darkTheme) : themeButton.classList[selecedThem === 'uil-moon' ? 'add' : 'remove']

themeButton.addEventListener('click', () => {
  //add or remove the dark/ icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  //we save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
})

/*==================== TYPEWRITER ANIMATION ====================*/

const title = document.querySelector('.home-title');
const detail = document.querySelector('.detail')

function typeWrite(element) {
  const textArray = element.innerHTML.split('');
  const textDetail = element.innerHTML.split('');
  element.innerHTML = '';
  textArray.forEach((item, index) => {
    setTimeout(() => element.innerHTML += item, 140 * index );
  });

}

typeWrite(title);

initAnimationEfects()


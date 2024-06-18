
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







/*==================== PORTFOLIO SWIPER  ====================*/

const swiperPortifolio= new Swiper('.portfolio-container', {
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
/*==================== TESTIMONIAL ====================*/

//Availability Stars 
const starContainers = document.querySelectorAll('.star-content');

starContainers.forEach((starContainer) => {
  const stars = starContainer.querySelectorAll('.testimonial-icone-star');
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      

     const nextStar = index === 0 || stars[index - 1].classList.contains('active-star');   
    //Aqui, criamos uma variável booleana (true ou false) chamada nextStar. Ela será verdadeira se a  estrela clicada for a primeira (index === 0) ou se a estrela anterior (stars[index - 1]) tiver a classe ‘active-star’.

      if (nextStar) {
        star.classList.toggle('active-star')
      
        if (!star.classList.contains('active-star')){
          for (let i = index  + 1; i < stars.length; i++) {
          //Se a classe ‘active-star’ foi removida, usamos um loop for para iterar sobre todas as estrelas subsequentes à estrela clicada
            stars[i].classList.remove('active-star');
          }
        }
      }   
    })
  })
});


const testimonialContent = document.querySelectorAll('.testimonial-content');
const testimonialArea = document.querySelector('.testimonial-area');
const buttonTestimonial = document.querySelector('.button-send');

function toggleTestimonials() {
  // Alternar a classe 'active-testimonial' para a área e o conteúdo
  testimonialArea.classList.add('active-testimonial');
  if (testimonialArea.classList.contains('active-testimonial')) {
      testimonialArea.classList.add('active-testimonial');
    } else {
      testimonialArea.classList.remove('active-testimonial');
    }
  testimonialContent.forEach((content) => {
    if (testimonialArea.classList.contains('active-testimonial')) {
      content.classList.add('active-testimonial');
    } else {
      content.classList.remove('active-testimonial');
    }
  });
}


buttonTestimonial.addEventListener('click', toggleTestimonials);



// Código para o modal
const input = document.querySelector('.testimonial-modal-input');
const buttonModal = document.querySelector('.testimonial-area-button');
const buttonClose = document.querySelector('.testimonial-modal-close');
const modalTestimonial = document.querySelector('.testimonial-modal');
const buttonInit = document.querySelector('#sendButton');
const contentTestimonial = document.querySelector('.testimonial-content');


function showModal() {
  modalTestimonial.classList.add('active-testimonial-modal');
}

function closeModal() {
  modalTestimonial.classList.remove('active-testimonial-modal');

}

function openModal() {
  contentTestimonial.classList.add('hidden');
  // Código para abrir o modal
}

function message(event) {
  event.preventDefault(); 
  let text = input.value; // Pegar o valor do texto do campo de entrada
  const messageDisplay = document.querySelector('.testimonial-name');
  console.log(messageDisplay);
  messageDisplay.style.fontSize = '1.9rem';
  messageDisplay.style.color = 'var(--primary-color)'; // Selecionar a tag alvo
  messageDisplay.textContent = text; 
  input.value= '';
  console.log(text);
  modalTestimonial.classList.remove('active-testimonial-modal'); // Corrigido para usar 'modalTestimonial'
}

buttonInit.addEventListener('click', message);
buttonModal.addEventListener('click',
showModal)
buttonClose.addEventListener('click', closeModal);
buttonInit.addEventListener('click', closeModal);




var swiperTestimonial = new Swiper(".testimonial-container", {
  irection: 'horizontal',
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/


/*==================== CHANGE BACKGROUND HEADER ====================*/ 


/*==================== SHOW SCROLL UP ====================*/ 


/*==================== DARK LIGHT THEME ====================*/ 


initAnimationEfects()


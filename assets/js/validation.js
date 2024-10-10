export default class Validation {
  constructor(element) {
    this.button = document.querySelector('#send');
    this.element = element;
    this.init();
  }

  validateName(form) {
    const match = form.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/);
    return match && match[0] === form && form.length <= 50;
  }

  validateEmail(form) {
    const match = form.match(/^[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}$/);
    return match && match[0] === form;
  }

  validateMessage(form) {
    return form.length <= 2500 && form.trim() !== '';
  }


  showPopup(message, isSuccess) {
    
    // Verificar se o popup já existe
    const existingOverlay = document.querySelector('.popup-overlay');
    if (existingOverlay) {
      existingOverlay.remove(); // Remover o popup existente antes de criar um novo
    }

    // Criar o fundo do popup
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay'; // Adiciona uma classe para facilitar a seleção

    // Criar o conteúdo do popup
    const popup = document.createElement('div');
    popup.className = 'popup-content'; // Classe para o conteúdo do popup

    if (isSuccess) {
      popup.classList.add('success');
    } else {
      popup.classList.add('error');
    }

    // Adicionar a mensagem ao popup
    const popupMessage = document.createElement('h2');
    popupMessage.textContent = message;
    popup.appendChild(popupMessage);

    // Criar o botão de fechar
    const closeButton = document.createElement('span');
    closeButton.textContent = '✖';
    closeButton.className = 'services-modal-close popup-close';
    closeButton.style.cursor = 'pointer';

    closeButton.style.fontSize = '24px';

    // Evento para fechar o popup
    closeButton.addEventListener('click', () => {
      overlay.classList.remove('active'); 
      // Remove a classe que exibe o popup

      setTimeout(() => {
        overlay.remove();
      }, 300)

    });

    // Adicionar o botão de fechar ao popup
    popup.appendChild(closeButton);

    // Adicionar o popup ao fundo
    overlay.appendChild(popup);

    // Adicionar o fundo ao body
    document.body.appendChild(overlay);

    // Adicionar a classe 'active' para mostrar o popup
    requestAnimationFrame(() => {
      overlay.classList.add('active');
      // Usar requestAnimationFrame para garantir que a classe seja adicionada após o DOM ser atualizado
    });

    if (isSuccess) {
      setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
          overlay.remove();
        }, 1000);
      }, 3000);
    }
  }

  validateCheck() {
    const nameValue = document.getElementById('name').value; // Correção aqui
    const emailValue = document.querySelector('#email').value;
    const projectValue = document.querySelector('#project').value; 
    const messageValue = document.querySelector('#message').value; // Corrija o id se necessário

    // Adicione a validação para o campo projectValue
    if (!this.validateName(nameValue) || 
        !this.validateEmail(emailValue) || 
        !this.validateMessage(messageValue) || 
        !this.validateName(projectValue)) { // Adicione a validação do projeto aqui
      this.showPopup('Favor preencher todos os campos corretamente', false) ;
    } else {
      // Aqui você pode prosseguir com o envio do formulário
      this.showPopup('Formulário enviado com sucesso!', true);
    }

    
  }
  
  validateEvent(formElement) {
    const type = formElement.getAttribute('type');
    let isValid = false;

    if (type === 'text') {
      isValid = this.validateName(formElement.value);
    } else if (type === 'email') {
      isValid = this.validateEmail(formElement.value);
    }

    this.handleValidation(formElement, isValid);
  }

  handleValidation(formElement, isValid) {
    const errorSpan = formElement.parentElement.querySelector('.span-error');

    if (isValid) {
      formElement.classList.add('valid');
      formElement.classList.remove('error');
      formElement.nextElementSibling.classList.remove('active');
    
      if (errorSpan) {
        errorSpan.remove();
      } 
    } else {
      formElement.classList.add('error');
      formElement.classList.remove('valid');

      if (formElement.nextElementSibling) {
        formElement.nextElementSibling.classList.add('active');
      }
    }

    if (!errorSpan) {
      this.addError(formElement);
    }
  }

  addEvent() {
    this.element.addEventListener('change', () => {
      this.validateEvent(this.element);
    });
  }

  addError() {
    const error = document.createElement('span');
    error.classList.add('span-error');
    error.style.marginTop = '.5rem';
    error.style.fontSize = '.7.5rem';

    const fieldType = this.element.getAttribute('type'); 

    const errorMessages = {
      text: 'CAMPO INVÁLIDO, É VALIDO SOMENTE TEXTO, NO MAX. 50 CARACTERES!',
      email: 'CAMPO INVÁLIDO, exemplo: "nome@email.com" VÁLIDO',
      textarea: 'CAMPO INVÁLIDO, "SÓ PERMITE ATÉ 2500 CARACTERES!"',
    };

    const errorMessage = errorMessages[fieldType]; 
      
    if (errorMessage) {
      error.innerText = errorMessage;
      this.element.parentElement.insertBefore(error, this.element.nextElementSibling);
    }
  }

  init() {
    this.addEvent();
    this.addError();
    this.button.addEventListener('click', () => this.validateCheck());
  
    return this;
  }
}

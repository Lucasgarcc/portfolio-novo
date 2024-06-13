function initAnimationEffects() {
  const container = document.querySelector('.efeito');

  // cria o tamanho do quadrados aleatoriamente usando: Math.floor e Math.random
  function getRandomIntBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Usa o método de Box-Muller para gerar dois números aleatórios uniformemente distribuídos e calcula o valor gaussiano. 
  //resultado é usado para posicionar os quadrados aleatoriamente na tela.
  function randomGaussian(mean, stdDev) {
    let x1, x2, w;
    do {
      x1 = 2 * Math.random() - 1;
      x2 = 2 * Math.random() - 1;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1);

    w = Math.sqrt((-2 * Math.log(w)) / w);
    return mean + stdDev * x1 * w;
  }

  /* 
  Cria um elemento <div> para representar um quadrado.
  Define a posição (top e left) aleatoriamente usando a função randomGaussian.
  Define o tamanho do quadrado aleatoriamente.
  Define a cor do quadrado (primária ou secundária) e aplica um filtro de desfoque com base no tamanho.
  Insere o quadrado no contêiner (.efeito) de forma ordenada com base no tamanho.
*/

  function createSquare() {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.top = `${randomGaussian(50, 15)}%`;
    square.style.left = `${randomGaussian(50, 15)}%`;

    const size = getRandomIntBetween(5, 15);
    square.style.width = `${size}%`;
    square.style.height = `${size}%`;

    const color = Math.random() < 0.5 ? 'color-primary' : 'color-segund';
    square.classList.add(color);
    square.style.backgroundColor = color;
    square.style.filter = `blur(${Math.max(1 - size / 15, 0)})`;

    const squares = document.querySelectorAll('.square');
    let isSquareInserted = false;
    for (let i = 0; i < squares.length; i++) {
      if (size < parseInt(squares[i].style.getPropertyValue('width'))) {
        container.insertBefore(square, squares[i]);
        isSquareInserted = true;
        break;
      }
    }

    if (!isSquareInserted) {
      container.appendChild(square);
    }

    square.addEventListener('animationend', handleAppearAnimation, { once: true });
  }
   setInterval(createSquare, 125);

/* 
  Manipula o evento de animação de aparecimento quando um quadrado é criado.
  Calcula velocidades aleatórias para o movimento do quadrado.
  Cria uma animação infinita de deslocamento do quadrado usando translate.
  Após um intervalo de tempo, inicia uma animação de desaparecimento (escala para zero) e remove o quadrado. 
*/
  function handleAppearAnimation(e) {
    const square = e.target;

    const xvelocity = (Math.random() - 0.5) * 10;
    const yvelocity = (Math.random() - 0.5) * 10;

    square.animate(
      [
        { transform: 'translate(0, 0)' },
        { transform: `translate(${xvelocity}%, ${yvelocity}%)` },
      ],
      {
        duration: 1000,
        iterations: Infinity,
      }
    );

    setTimeout(() => {
      const { x, y } = getTranslateValues(square);
      square.animate(
        [
          { transform: `matrix(1, 0, 0, 1, ${x}, ${y})` },
          { transform: `matrix(0, 0, 0, 0, ${x}, ${y})` },
        ],
        {
          duration: 250,
        }
      ).finished.then(() => square.remove());
    }, 3125);
  }


  /*
  Obtém os valores de translação (x, y, z) de um elemento.
  Analisa a matriz de transformação CSS (obtida de window.getComputedStyle) para extrair os valores.
  Lida com matrizes 2D e 3D, retornando um objeto com as coordenadas x, y e z.
  */
  function getTranslateValues(element) {
    const style = window.getComputedStyle(element);
    const matrix = style.transform || style.webkitTransform || style.mozTransform;

    if (matrix === 'none' || typeof matrix === 'undefined') {
      return {
        x: 0,
        y: 0,
        z: 0,
      };
    }

    const matrixType = matrix.includes('3d') ? '3d' : '2d';
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
    if (matrixType === '2d') {
      return {
        x: parseFloat(matrixValues[4]),
        y: parseFloat(matrixValues[5]),
        z: 0,
      };
    }
    if (matrixType === '3d') {
      return {
        x: parseFloat(matrixValues[12]),
        y: parseFloat(matrixValues[13]),
        z: parseFloat(matrixValues[14]),
      };
    }
  }
}

export default initAnimationEffects;
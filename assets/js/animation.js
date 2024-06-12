function initAnimationEfects() {
  const container = document.querySelector('.efeito');

  function getRandomIntBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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

  const squareInterval = setInterval(() => {
    createSquare();
  }, 125);

  function handleAppearAnimation(e) {
    const square = e.target;

    const xvelocity = (Math.random() - 5.0) * 2;
    const yvelocity = (Math.random() - 5.0) * 2;

    const animation = square.animate(
      [
        { transform: 'translateX(0, 0)' },
        { transform: `translateX(${xvelocity * 1000}%, ${yvelocity * 1000}%)` },
      ],
      {
        duration: 1000,
        iterations: Infinity,
      }
    );

    setTimeout(() => {
      const { x, y } = getTranslateValues(square);
      const test = square.animate(
        [
          { transform: `matrix(1, 0, 0, 1, ${x}, ${y})` },
          { transform: `matrix(0, 0, 0, 0, ${x}, ${y})` },
        ],
        {
          duration: 250,
        }
      );
      test.finished.then(() => square.remove());
    }, 3125);
  }

  function getTranslateValues(element) {
    const style = window.getComputedStyle(element);
    const matrix = style['transform'] || style.webkitTransform || style.mozTransform;

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
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0,
      };
    }
    if (matrixType === '3d') {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14],
      };
    }
  }
}
export default initAnimationEfects;
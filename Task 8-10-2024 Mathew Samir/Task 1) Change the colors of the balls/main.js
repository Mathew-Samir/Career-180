
const balls = document.querySelectorAll('.ball');
const container = document.querySelector('.container');
let intervalId;
let isPaused = false;

balls.forEach((ball, index) => {
  ball.style.backgroundColor = index < 4 ? 'brown' : 'silver';
});

function changeColorsToSilver() {
  balls.forEach((ball, index) => {
    if (ball.style.backgroundColor === 'brown') {
      setTimeout(() => {
        if (!isPaused) ball.style.backgroundColor = 'silver';
      }, index * 500);
    }
  });
}

function changeColorsToBrown() {
  [...balls].reverse().forEach((ball, index) => {
    if (ball.style.backgroundColor === 'silver') {
      setTimeout(() => {
        if (!isPaused) ball.style.backgroundColor = 'brown';
      }, index * 500);
    }
  });
}

function animateColors() {
  if (!isPaused) {
    changeColorsToSilver();
    setTimeout(() => {
      if (!isPaused) changeColorsToBrown();
    }, balls.length * 500);
  }
}

function startAnimation() {
  intervalId = setInterval(animateColors, balls.length * 500);
}

function stopAnimation() {
  clearInterval(intervalId);
}

container.addEventListener('mouseover', () => {
  isPaused = true;
  stopAnimation();
});

container.addEventListener('mouseout', () => {
  isPaused = false;
  startAnimation();
});

startAnimation();



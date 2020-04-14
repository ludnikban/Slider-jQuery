
let slides = document.querySelectorAll('.slides__item');
let indicators = document.querySelectorAll('.indicators__item');
let indicator = document.querySelector('.indicators');
let pause = document.querySelector('.controls__pause');
let next = document.querySelector('.controls__next'); 
let previous = document.querySelector('.controls__prev');
let buttonImage = document.querySelectorAll('.controls__img');
let currentSlide = 0;
let prevInd = null;
let swipeStartX = null;
let swipeEndX = null;
let playing = true;
const KEY_LEFT_ARROW = 'ArrowLeft';
const KEY_RIGHT_ARROW = 'ArrowRight';
const KEY_SPACE = ' ';

indicators[0].style.backgroundColor = 'red';

let controls = document.querySelectorAll('.controls'); 
for (let i = 0; i < controls.length; i++){ controls[i].style.display = 'flex';
} 

function goToSlide(n) {
  slides[currentSlide].className = 'slides__item'; 
  indicators[currentSlide].className = 'indicators__item';
  indicators[currentSlide].removeAttribute('style');
  currentSlide = (n + slides.length) % slides.length; 
  slides[currentSlide].className = 'slides__item active';
  indicators[currentSlide].className = 'indicators__item active';
  indicators[currentSlide].style.backgroundColor = 'red';
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}
function previousSlide() {
  goToSlide(currentSlide - 1);
}
function pauseSlideShow() {
  playing = false;
  buttonImage[0].className = 'controls__img';
  buttonImage[1].className = 'controls__img active';
  clearInterval(slideInterval);
}

function playSlideShow() {
  playing = true;
  buttonImage[0].className = 'controls__img active';
  buttonImage[1].className = 'controls__img';
  slideInterval = setInterval(nextSlide, 2000);
}

function clickPause() {
  if (playing) pauseSlideShow();
  else playSlideShow();
};

function clickNext() {
  pauseSlideShow(); 
  nextSlide();
};

function clickPrevious() {
  pauseSlideShow(); 
  previousSlide();
};

function clickIndicator(e) {
  let target = e.target;
  if (target.classList.contains('indicators__item')) {
    pauseSlideShow(); 
    goToSlide(+target.getAttribute('data-slide-to'));
    target.style.backgroundColor = 'red';
    if (prevInd !== null) prevInd.removeAttribute('style');
    prevInd = target;
  }
}

function pressKey (e) {
  if (e.key === KEY_LEFT_ARROW) { pauseSlideShow(); previousSlide();}
  if (e.key === KEY_RIGHT_ARROW) { pauseSlideShow(); nextSlide();}
  if (e.key === KEY_SPACE)  pauseSlideShow(); 
}

function swipeStart(e) {
  swipeStartX = e.changedTouches[0].pageX;
}
function swipeEnd(e) {
  swipaEndX = e.changedTouches[0].pageX;
  swipeStartX - swipaEndX < 100 && clickPrevious(); 
  swipeStartX - swipaEndX > -100 && clickNext();  
}

pause.addEventListener('click', clickPause);
next.addEventListener('click', clickNext);
previous.addEventListener('click',  clickPrevious);
indicator.addEventListener('click',  clickIndicator);
document.addEventListener('keydown', pressKey);
carousel.addEventListener('touchstart', swipeStart);
carousel.addEventListener('touchend', swipeEnd);

let slideInterval = setInterval (nextSlide, 2000);

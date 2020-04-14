
let $slides = $('.slides__item');
let $indicators = $('.indicators__item');
let $indicator = $('.indicators');
let $pause = $('.controls__pause');
let $next = $('.controls__next'); 
let $previous = $('.controls__prev');
let $buttonImage = $('.controls__img');
let currentSlide = 0;
let prevInd = null;
let playing = true;

const KEY_LEFT_ARROW = 'ArrowLeft';
const KEY_RIGHT_ARROW = 'ArrowRight';
const KEY_SPACE = ' ';

$($indicators[0]).css('backgroundColor', 'red');
$('.controls').css('display', 'flex');

let goToSlide = (n)=> {
  $($slides[currentSlide]).toggleClass('active');
  $($indicators[currentSlide]).toggleClass('active').removeAttr('style');
  currentSlide = (n + $slides.length) % $slides.length; 
  $($slides[currentSlide]).toggleClass('active');
  $($indicators[currentSlide]).toggleClass('active').css('backgroundColor', 'red');
}

let nextSlide = () => goToSlide(currentSlide + 1);

let previousSlide = () => goToSlide(currentSlide - 1);

let pauseSlideShow = () => {
  if (playing) {
    $($buttonImage[0]).toggleClass('active');
    $($buttonImage[1]).toggleClass('active');
    playing = !playing;
    clearInterval(slideInterval);
  }
}

let playSlideShow = () => {
  $($buttonImage[0]).toggleClass('active');
  $($buttonImage[1]).toggleClass('active');
  playing = !playing;
  slideInterval = setInterval(nextSlide, 2000);
}

let clickPause = () => playing ? pauseSlideShow() : playSlideShow();

let clickNext = () => {
  pauseSlideShow(); 
  nextSlide();
};

let clickPrevious = () => {
  pauseSlideShow(); 
  previousSlide();
};

$pause.on('click', clickPause);
$next.on('click', clickNext);
$previous.on('click', clickPrevious);

let clickIndicator = (e) => {
    pauseSlideShow(); 
    goToSlide(+e.target.getAttribute('data-slide-to'));
    $(e.target).css('backgroundColor', 'red');
    if (prevInd !== null) $(prevInd).removeAttr('style');
    prevInd = e.target;
}

$indicator.on('click', '.indicators__item', clickIndicator);

let pressKey = (e) => {
  if (e.key === KEY_LEFT_ARROW) clickPrevious();
  if (e.key === KEY_RIGHT_ARROW) clickNext();
  if (e.key === KEY_SPACE)  clickPause(); 
}

$(document).on('keydown', pressKey);

let slideInterval = setInterval (nextSlide, 2000);
function createSlides(count) {
  slides = document.createElement('ul');
  slides.setAttribute('class','slides');
    
  for (let i = 0; i < count; i++) {

    let slideItem = document.createElement('li');
    let slideLink = document.createElement('a');
    let slideImg = document.createElement('img');

    slideItem.setAttribute(
      'class',
      i === 0 ? 'slides__item active' : 'slides__item'
    );
    const number = i + 1;
    slideImg.setAttribute('alt', 'slide');
    slideImg.setAttribute('src', ('img/' + number + '.jpg'));
    
    slideLink.setAttribute('href', '#');
    slideLink.appendChild(slideImg);
    slideItem.appendChild(slideLink);
    slides.appendChild(slideItem);
  }
  carousel.appendChild(slides);
}

function indicatorsItem(count) {
  let indicator = document.createElement('div');
  indicator.classList.add('indicators');
  carousel.appendChild(indicator);

  for (let i = 0; i < count; i++) {

  let item = document.createElement('span');

  i === 0 ? (item.classList.add('indicators__item'), item.classList.add('active'))
  : item.classList.add('indicators__item')
  item.setAttribute('data-slide-to',i);
  indicator.appendChild(item);
  }
}

function  controlsItem() {
  control = document.createElement('div');
  control.setAttribute('class', 'controls');

  for (i = 0; i < 3; i++) {
    
    let controlItem = document.createElement('div');
    let controlImg = document.createElement('img');
    let controlImg2 = document.createElement('img');

    switch (i) {
      case 0:

        controlItem.setAttribute('class', 'controls__item controls__prev');
        controlImg.setAttribute('alt', '#');
        controlImg.setAttribute('src', 'img/left.png');
        controlItem.appendChild(controlImg);
        break;
      case 1:
        controlItem.setAttribute('class', 'controls__item controls__next');
        controlImg.setAttribute('alt', '#');
        controlImg.setAttribute('src', 'img/right.png');
        controlItem.appendChild(controlImg);
        break;
      case 2:
        controlItem.setAttribute('class', 'controls__item controls__pause');
        controlImg.setAttribute('class', 'controls__img active');
        controlImg.setAttribute('alt', '#');
        controlImg.setAttribute('src', 'img/pause.png');
        controlItem.appendChild(controlImg);
        controlImg2.setAttribute('class', 'controls__img');
        controlImg2.setAttribute('alt', '#');
        controlImg2.setAttribute('src', 'img/play.png');
        controlItem.appendChild(controlImg2);
        break;
    }
    control.appendChild(controlItem);
  }
  carousel.appendChild(control);
}

function createStyle() {
  mystyle = document.createElement('style');
  mystyle.setAttribute('type','text/css');
  let styleContent = `
  * {  
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }  
  
  .slides {
    position: relative;
    list-style-type: none;
    width: 725px;
    height: 290px;
    border: 3px solid burlywood;
  }
  
  .controls {
    position: absolute;
    display: none;
    top: 370px; 
    left: 245px;
  
  }
  
  .controls__img,
  .slides__item {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    transition: opacity 1s;
  }
  
  .active {
    opacity: 1;
    z-index: 2;
  }
  
  .indicators { 
    position: absolute;  
    display: flex;
    z-index: 1;
    top: 310px;
    left: 210px;
  }
  .indicators__item {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid rgb(7, 128, 209);
    outline: none;
    background: none;
    margin: 0 7.5px;} `;

  mystyle.innerHTML = styleContent;
  carousel.appendChild(mystyle);    
}

function createCarousel(slidesCount = 3) {
  carousel = document.querySelector('#carousel');
  createSlides(slidesCount);
  indicatorsItem(slidesCount);
  controlsItem();
  createStyle();
}

createCarousel(6);

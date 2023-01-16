function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //slider
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          lSlideBtn = document.querySelector(prevArrow),
          rSlideBtn = document.querySelector(nextArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    total.textContent = (slides.length > 0 && slides.length < 10) ? `0${slides.length}` : slides.length;

    let slideIndex = 1;
    let offset = 0;

    slidesWrapper.style.overflow = 'hidden';
    
    slidesField.style.width = `${slides.length * 100}%`;
    slidesField.style.transition = `0.5s`;
    slidesField.style.display = 'flex';

    slides.forEach(slide => {
        slide.style.width = width;    
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);
    const dots = [];
    for(let i = 0; i < slides.length; ++i) {
        const dot = document.createElement('li');
        dot.classList.add('dot');

        indicators.append(dot);
        dots.push(dot);
    }

    function toNum(str) {
        return +str.replace(/\D/ig, '');
    }

    const parsedWidth = toNum(width);

    function translateSlides() {
        slideIndex = offset / parsedWidth + 1;
        current.textContent = (slideIndex > 0 && slideIndex < 10) ? `0${slideIndex}` : slideIndex;

        dots.forEach(el => el.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';

        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    translateSlides();

    lSlideBtn.addEventListener('click', () => {
        if(offset == 0) {
            offset = parsedWidth * (slides.length - 1);
        } else {
            offset -= parsedWidth;
        }
        translateSlides();
    });

    rSlideBtn.addEventListener('click', () => {
        if(offset == parsedWidth * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += parsedWidth;
        }
        translateSlides();
    });

    dots.forEach((el) => {
        el.addEventListener('click', () => {
            offset = (dots.indexOf(el) + 1)* parsedWidth - parsedWidth;
            translateSlides();
        });
    });
}

export default slider;
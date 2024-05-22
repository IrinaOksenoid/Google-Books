
import banners from "./constBanners.js"


    const imgBanner = document.querySelector('.slider__image');
    const dots = document.querySelectorAll('.slider__dot');
    let currentIndex = 0;


    function setBanner(index) {
        
        imgBanner.src = banners[index].url;
        imgBanner.alt = banners[index].alt;
        dots.forEach((dot, num) => {
            dot.classList.toggle('slider__dot-active', num === index);
        });
    }

    
    setBanner(currentIndex);

   
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentIndex = idx;
            setBanner(currentIndex);
        });
    });
function autoSlide() {
    currentIndex = (currentIndex + 1) % banners.length;
    setBanner(currentIndex);
    setTimeout(autoSlide, 5000);
}

    setTimeout(autoSlide, 5000);
;
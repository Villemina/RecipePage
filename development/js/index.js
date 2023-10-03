
let arrowLeft = document.querySelector('.arrow-angle-left');
let arrowRight = document.querySelector('.arrow-angle-right');
const carouselElements = document.querySelectorAll(".carousel__item")
console.log(carouselElements)



arrowRight.addEventListener("click", event => {
    let activeSlideElement = null;
    carouselElements.forEach((el, index) => {
        if (el.classList.contains("active")) {
            el.classList.remove("active")
            activeSlideElement = index + 1;
        }
        if (index === activeSlideElement) {
            el.classList.add("active")
        }
    })
    if (activeSlideElement === null || activeSlideElement >= carouselElements.length) {
        carouselElements[0].classList.add("active");
    }
})

arrowLeft.addEventListener("click", event => {
    let activeSlideElement = null;
    for (let i = carouselElements.length; i > 0; i--) {
        let realIndex = i - 1;
        const el = carouselElements[realIndex];
        if (el.classList.contains("active")) {
            el.classList.remove("active")
            activeSlideElement = realIndex -1 ;
        }
        if (realIndex === activeSlideElement) {
            el.classList.add("active")
        }
    }
    if (activeSlideElement === null || activeSlideElement < 0) {
        carouselElements[carouselElements.length - 1].classList.add("active");
    }
})
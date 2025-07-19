import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

function initBannerSwiper() {
    const bannerSlides = document.querySelectorAll('.banner__swiper-slide');
    let initialSlideIndex = 0;

    bannerSlides.forEach((slide, index) => {
        if (slide.querySelector('.banner__slide-stage-ongoing')) {
            initialSlideIndex = index;
        }
    });

    const bannerSwiperEl = document.querySelector('.banner__swiper');
    if (!bannerSwiperEl) return;

    new Swiper(bannerSwiperEl, {
        modules: [Navigation],
        centeredSlides: true,
        initialSlide: initialSlideIndex,
        navigation: {
            nextEl: ".banner__swiper-button-next",
            prevEl: ".banner__swiper-button-prev"
        },
        breakpoints: {
            320: {
                slidesPerView: 1.15,
                spaceBetween: 12,
            },
            768: {
                slidesPerView: 1.6,
                spaceBetween: 12,
            },
            992: {
                slidesPerView: 2.2,
                allowTouchMove: false,
                spaceBetween: 22,
            },
            1300: {
                slidesPerView: 3.2,
                spaceBetween: 22,
            }
        }
    });
}

function initCablewaySwiper() {
    const cablewaySwiperEl = document.querySelector('.cableway-info__swiper');
    if (!cablewaySwiperEl) return;

    new Swiper(cablewaySwiperEl, {
        loop: true,
        initialSlide: 2,
        breakpoints: {
            320: {
                slidesPerView: 1.1,
                slidesPerView: 1.1,
                spaceBetween: 12,
                centeredSlides: true,
                allowTouchMove: true,
            },
            992: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 12,
            },
            1280: {
                slidesPerView: 3,
                allowTouchMove: false,
                spaceBetween: 20,
            },
        }
    });
}

export function sliders() {
    initBannerSwiper();
    initCablewaySwiper();
}

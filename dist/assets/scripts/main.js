/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/accordion.js":
/*!*********************************************!*\
  !*** ./src/scripts/components/accordion.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accordion: () => (/* binding */ accordion)
/* harmony export */ });
function accordion() {
    document.querySelectorAll('.faq__accordion-trigger').forEach(button => {
        button.addEventListener('click', () => {
            const parentItem = button.closest('.faq__accordion-item');
            const isActive = parentItem.classList.contains('active');

            document.querySelectorAll('.faq__accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                parentItem.classList.add('active');
            }
        });
    });
}


/***/ }),

/***/ "./src/scripts/components/form-validation.js":
/*!***************************************************!*\
  !*** ./src/scripts/components/form-validation.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formValidation: () => (/* binding */ formValidation)
/* harmony export */ });
function formValidation() {
    const form = document.querySelector('.feedback__form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');
    const fileInput = document.querySelector('#file');
    const submitButton = document.querySelector('.feedback__button');
    const fileLabel = document.querySelector('.feedback__label--file');

    const nameRegex = /^[А-Яа-яA-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxFileSize = 5 * 1024 * 1024;

    function showFileInfo(file) {
        const svgIcon = `
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.9999 11.2001L1.7999 7.0001L0.399902 8.4001L5.9999 14.0001L17.9999 2.0001L16.5999 0.600098L5.9999 11.2001Z" fill="white"/>
            </svg>
        `;
        fileLabel.innerHTML = `<span class="file-info">${file.name}</span> ${svgIcon}`;
    }

    function clearFileInfo() {
        fileLabel.innerHTML = 'Загрузить файл';
    }

    function showError(input, message) {
        const field = input.parentElement;
        let error = field.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            field.appendChild(error);
        }
        error.textContent = message;
        input.style.borderColor = 'red';
    }

    function clearError(input) {
        const field = input.parentElement;
        const error = field.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.style.borderColor = '';
    }

    function validateName() {
        const value = nameInput.value.trim();
        if (value === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            return false;
        }
        if (!nameRegex.test(value)) {
            showError(nameInput, 'Имя может содержать только буквы и пробелы');
            return false;
        }
        clearError(nameInput);
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        if (value === '') {
            showError(emailInput, 'Пожалуйста, введите ваш email');
            return false;
        }
        if (!emailRegex.test(value)) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (value === '') {
            showError(messageInput, 'Пожалуйста, введите ваше сообщение');
            return false;
        }
        clearError(messageInput);
        return true;
    }

    function validateFile() {
        const file = fileInput.files[0];
        if (file) {
            if (!allowedFileTypes.includes(file.type)) {
                showError(fileInput, 'Допустимы только файлы JPEG, PNG или PDF');
                clearFileInfo();
                return false;
            }
            if (file.size > maxFileSize) {
                showError(fileInput, 'Файл не должен превышать 5MB');
                clearFileInfo();
                return false;
            }
            showFileInfo(file);
        } else {
            clearFileInfo();
        }
        clearError(fileInput);
        return true;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        const isFileValid = validateFile();

        if (isNameValid && isEmailValid && isMessageValid && isFileValid) {
            console.log('Форма успешно отправлена!');
            form.reset();
            clearFileInfo();
        }
    });

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    fileInput.addEventListener('change', validateFile);
}


/***/ }),

/***/ "./src/scripts/components/gallery.js":
/*!*******************************************!*\
  !*** ./src/scripts/components/gallery.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gallery: () => (/* binding */ gallery)
/* harmony export */ });
/* harmony import */ var _fancyapps_ui_dist_fancybox___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fancyapps/ui/dist/fancybox/ */ "./node_modules/@fancyapps/ui/dist/fancybox/index.js");


function initGalleryVideo() {
    _fancyapps_ui_dist_fancybox___WEBPACK_IMPORTED_MODULE_0__.Fancybox.bind('[data-fancybox="video"]', {
        type: "video",
        Youtube: {
            autoplay: true,
        },
    });
}


function initStationGalleryButtons() {
    document.querySelectorAll('.media-gallery__station-button').forEach(button => {
        button.addEventListener('click', function () {
            const galleryName = this.getAttribute('data-fancybox-trigger');
            const items = Array.from(document.querySelectorAll(`[data-fancybox="${galleryName}"]`)).map(link => ({
                src: link.getAttribute('href'),
                thumb: link.querySelector('img')?.getAttribute('src'),
                type: 'image',
            }));
            if (items.length) {
                _fancyapps_ui_dist_fancybox___WEBPACK_IMPORTED_MODULE_0__.Fancybox.show(items, {
                    Thumbs: {
                        autoStart: true,
                    },
                    Toolbar: {
                        display: [
                            "close",
                            "zoom",
                            "fullscreen",
                            "thumbs"
                        ],
                    },
                    Carousel: {
                        infinite: false,
                    },
                });
            }
        });
    });
}
function gallery() {
    initGalleryVideo();
    initStationGalleryButtons();
}


/***/ }),

/***/ "./src/scripts/components/header.js":
/*!******************************************!*\
  !*** ./src/scripts/components/header.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   header: () => (/* binding */ header)
/* harmony export */ });
function header() {
    const burger = document.querySelector('.header__burger');
    const mobileNav = document.querySelector('.header__nav-mobile');
    const closeBtn = document.querySelector('.header__nav-close');

    if (!burger || !mobileNav || !closeBtn) {
        console.warn('Header elements not found');
        return;
    }

    const openMobileMenu = () => {
        mobileNav.classList.add('active');
        document.body.classList.add('hidden');
    };

    const closeMobileMenu = () => {
        mobileNav.classList.remove('active');
        document.body.classList.remove('hidden');
    };

    burger.addEventListener('click', openMobileMenu);

    closeBtn.addEventListener('click', closeMobileMenu);

    document.addEventListener('click', (event) => {
        if (!mobileNav.classList.contains('active')) {
            return;
        }

        const isClickInsideNav = mobileNav.contains(event.target);
        const isClickOnBurger = burger.contains(event.target);

        if (!isClickInsideNav && !isClickOnBurger) {
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    const smoothScrollToAnchor = (event) => {
        const link = event.target.closest('a');

        if (!link) return;

        const href = link.getAttribute('href');

        if (href && href.startsWith('#') && href.length > 1) {
            event.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                if (mobileNav.classList.contains('active')) {
                    closeMobileMenu();
                }

                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;

                const elementPosition = targetElement.offsetTop;

                window.scrollTo({
                    top: elementPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
    };

    const headerLinks = document.querySelectorAll('.header__link');
    headerLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToAnchor);
    });
}


/***/ }),

/***/ "./src/scripts/components/sliders.js":
/*!*******************************************!*\
  !*** ./src/scripts/components/sliders.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sliders: () => (/* binding */ sliders)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.mjs");
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/modules */ "./node_modules/swiper/modules/index.mjs");



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

    new swiper__WEBPACK_IMPORTED_MODULE_0__["default"](bannerSwiperEl, {
        modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Navigation],
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

    new swiper__WEBPACK_IMPORTED_MODULE_0__["default"](cablewaySwiperEl, {
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

function sliders() {
    initBannerSwiper();
    initCablewaySwiper();
}


/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _components_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header.js */ "./src/scripts/components/header.js");
/* harmony import */ var _components_sliders_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/sliders.js */ "./src/scripts/components/sliders.js");
/* harmony import */ var _components_gallery_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/gallery.js */ "./src/scripts/components/gallery.js");
/* harmony import */ var _components_accordion_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/accordion.js */ "./src/scripts/components/accordion.js");
/* harmony import */ var _components_form_validation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/form-validation.js */ "./src/scripts/components/form-validation.js");









document.addEventListener("DOMContentLoaded", function () {
    (0,_components_header_js__WEBPACK_IMPORTED_MODULE_1__.header)();
    (0,_components_sliders_js__WEBPACK_IMPORTED_MODULE_2__.sliders)();
    (0,_components_gallery_js__WEBPACK_IMPORTED_MODULE_3__.gallery)();
    (0,_components_accordion_js__WEBPACK_IMPORTED_MODULE_4__.accordion)();
    (0,_components_form_validation_js__WEBPACK_IMPORTED_MODULE_5__.formValidation)();
})


/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkkdoka"] = self["webpackChunkkdoka"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["node-vendors"], () => (__webpack_require__("./src/scripts/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
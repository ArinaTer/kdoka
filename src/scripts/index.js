import '../styles/main.scss';

import { header } from "./components/header.js";
import { sliders } from "./components/sliders.js";
import { gallery } from "./components/gallery.js";
import { accordion } from "./components/accordion.js";
import { formValidation } from "./components/form-validation.js";


document.addEventListener("DOMContentLoaded", function () {
    header();
    sliders();
    gallery();
    accordion();
    formValidation();
})

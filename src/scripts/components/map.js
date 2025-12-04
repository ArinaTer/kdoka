export function map() {
    const elements = {
        map: document.querySelector(".map"),
        media: document.querySelector(".map__media"),
        draggable: document.querySelector(".map__draggable"),
        dotsDesk: document.querySelector(".map__dots-desk"),
        dotsMob: document.querySelector(".map__dots-mob"),
    };

    let dots = [];
    const imageAspectRatio = 1920 / 864;
    let currentIndex = 2;
    let dotCenters = [];
    let animationClassRemoved = false;
    let animationInterval = null;
    const initialWindowHeight = window.innerHeight;

    function getActiveDots() {
        return window.innerWidth > 1024 ? elements.dotsDesk : elements.dotsMob;
    }

    function updateDots() {
        const activeDotsContainer = getActiveDots();
        dots = Array.from(activeDotsContainer.querySelectorAll('.map__dot'));

    }

    function startDesktopDotAnimation() {
        if (window.innerWidth <= 1024) return;

        if (animationInterval) clearInterval(animationInterval);

        let index = 0;
        animationInterval = setInterval(() => {
            dots.forEach(dot => dot.classList.remove('map__dot--animated'));
            if (dots[index]) {
                dots[index].classList.add('map__dot--animated');
            }
            index = (index + 1) % dots.length;
        }, 2000);
    }


    function removeAnimationClassOnce() {
        if (!animationClassRemoved) {
            dots.forEach(dot => {
                dot.classList.remove('map__dot--animated');
            });
            animationClassRemoved = true;
        }
    }

    function updateAspectRatio() {
        const { innerWidth: width } = window;
        const height = initialWindowHeight;

        let aspectWidth = (imageAspectRatio * height / width) * 100;
        if (aspectWidth < 100) aspectWidth = 100;
        const aspectHeight = (1 / imageAspectRatio) * aspectWidth;

        document.documentElement.style.setProperty("--aspect-ratio", aspectHeight.toFixed(3));
        document.documentElement.style.setProperty("--aspect-ratio-width", aspectWidth.toFixed(3));
    }

    function positionDots() {
        dots.forEach(dot => {
            dot.style.top = '';
            dot.style.bottom = '';
            dot.style.left = '';
            dot.style.right = '';
            ['top', 'bottom', 'left', 'right'].forEach(side => {
                const value = dot.dataset[side] || dot.dataset[side + '-mob'];
                if (value !== undefined) {
                    dot.style[side] = value + '%';
                }
            });
        });
    }

    function updateDotCenters() {
        dotCenters = dots.map(dot => {
            const rect = dot.getBoundingClientRect();
            const mediaRect = elements.media.getBoundingClientRect();
            return rect.left - mediaRect.left + rect.width / 2;
        });
    }

    function setMapPosition(index, animate = true) {
        currentIndex = index;
        if (animate) {
            elements.media.style.transition = 'transform 1s cubic-bezier(.4,1.2,.2,1)';
        } else {
            elements.media.style.transition = 'none';
        }
        const center = dotCenters[index];
        const draggableRect = elements.draggable.getBoundingClientRect();
        const mediaRect = elements.media.getBoundingClientRect();
        let translate = draggableRect.width / 2 - center;
        const maxTranslate = 0;
        const minTranslate = draggableRect.width - mediaRect.width;
        if (translate > maxTranslate) translate = maxTranslate;
        if (translate < minTranslate) translate = minTranslate;
        elements.media.style.transform = `translateX(${translate}px)`;
    }

    let startX = null;
    let lastX = null;
    let dragging = false;
    let dragStartTime = null;

    function onDragStart(e) {
        dragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        lastX = startX;
        dragStartTime = Date.now();
        elements.media.style.transition = 'none';
    }

    function onDragMove(e) {
        if (!dragging) return;
        const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const dx = x - startX;
        lastX = x;
        if (e.type === 'touchmove') {
            e.preventDefault();
        }

        const draggableRect = elements.draggable.getBoundingClientRect();
        const mediaRect = elements.media.getBoundingClientRect();
        let translate = draggableRect.width / 2 - dotCenters[currentIndex] + dx;
        const maxTranslate = 0;
        const minTranslate = draggableRect.width - mediaRect.width;
        if (translate > maxTranslate) translate = maxTranslate;
        if (translate < minTranslate) translate = minTranslate;

        elements.media.style.transform = `translateX(${translate}px)`;
    }

    function onDragEnd() {
        if (!dragging) return;
        dragging = false;
        const dx = lastX - startX;
        const threshold = 50;
        const velocity = dx / (Date.now() - dragStartTime);
        const momentumThreshold = 0.5;

        if (Math.abs(velocity) > momentumThreshold) {
            if (velocity < 0 && currentIndex > 0) {
                setMapPosition(currentIndex - 1);
            } else if (velocity > 0 && currentIndex < dots.length - 1) {
                setMapPosition(currentIndex + 1);
            } else {
                setMapPosition(currentIndex);
            }
        } else {
            if (dx < -threshold && currentIndex > 0) {
                setMapPosition(currentIndex - 1);
            } else if (dx > threshold && currentIndex < dots.length - 1) {
                setMapPosition(currentIndex + 1);
            } else {
                setMapPosition(currentIndex);
            }
        }
    }

    elements.media.addEventListener('mousedown', onDragStart);
    elements.media.addEventListener('touchstart', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('touchmove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);

    function attachDotEvents() {
        dots.forEach((dot, i) => {
            dot.removeEventListener('mouseenter', handleMouseEnter);
            dot.removeEventListener('mouseleave', handleMouseLeave);
            dot.removeEventListener('click', handleClick);

            dot.addEventListener('mouseenter', handleMouseEnter);
            dot.addEventListener('mouseleave', handleMouseLeave);

            dot.addEventListener('click', handleClick);

            function handleMouseEnter() {
                if (window.innerWidth > 1024) {
                    dot.classList.add('map__dot--active');
                    dot.classList.remove('map__dot--close');
                    if (animationInterval) {
                        clearInterval(animationInterval);
                        animationInterval = null;
                        dots.forEach(d => d.classList.remove('map__dot--animated'));
                    }
                }
            }

            function handleMouseLeave() {
                if (window.innerWidth > 1024) {
                    dot.classList.remove('map__dot--active');
                    startDesktopDotAnimation();
                }
            }

            function handleClick(e) {
                removeAnimationClassOnce();
                if (window.innerWidth <= 1024.98) {
                    setMapPosition(i);
                    dots.forEach((d, idx) => {
                        if (idx === i) {
                            d.classList.add('map__dot--active');
                            d.classList.remove('map__dot--close');
                        } else {
                            d.classList.remove('map__dot--active');
                            d.classList.remove('map__dot--close');
                        }
                    });
                    e.stopPropagation();
                }
            }

            const closeBtn = dot.querySelector('.map__dot-btn-close');
            if (closeBtn) {
                closeBtn.removeEventListener('click', handleClose);
                closeBtn.addEventListener('click', handleClose);
                function handleClose(e) {
                    dot.classList.remove('map__dot--active');
                    dot.classList.add('map__dot--close');
                    e.stopPropagation();
                }
            }
        });
    }

    const instructions = document.querySelector('.map__draggable-instructions');
    const closeBtn = instructions?.querySelector('.map__draggable-instructions-btn');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            instructions.classList.add('map__draggable-instructions--hide');

            dots.forEach(dot => {
                dot.classList.add('map__dot--animated');
            });
        });
    }

    function recalcAndSet() {
        updateAspectRatio();
        updateDots();
        positionDots();
        updateDotCenters();
        setMapPosition(currentIndex, false);
        attachDotEvents();
    }

    recalcAndSet();
    startDesktopDotAnimation();
    setTimeout(() => {
        updateDotCenters();
        setMapPosition(2, false);
    }, 100);
    // window.addEventListener("resize", recalcAndSet, { passive: true });
}

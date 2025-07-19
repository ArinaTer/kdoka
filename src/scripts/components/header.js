export function header() {
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

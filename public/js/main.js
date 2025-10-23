document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('[data-component="nav"]');
    const navToggle = document.querySelector('[data-action="toggle-menu"]');
    const navLinksWrapper = document.getElementById('primary-navigation');
    const navLinks = document.querySelectorAll('.nav-links a[data-nav], .nav-logo[data-nav], .nav-cta[data-nav]');
    const pageLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    const revealItems = document.querySelectorAll('.reveal-on-scroll');
    const pageName = document.body.dataset.page;

    const closeMenu = () => {
        nav?.classList.remove('is-open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    };

    const handleScroll = () => {
        if (!nav) return;
        const isDesktop = window.matchMedia('(min-width: 1025px)').matches;
        if (isDesktop) {
            nav.classList.remove('is-scrolled');
            return;
        }
        const shouldCollapse = window.scrollY > 16;
        nav.classList.toggle('is-scrolled', shouldCollapse);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const setActiveNav = () => {
        if (!pageName) return;
        navLinks.forEach((link) => {
            const targetPage = link.dataset.nav;
            const isActive = targetPage === pageName;
            link.classList.toggle('is-active', Boolean(isActive));
        });
    };

    setActiveNav();

    if (navToggle && navLinksWrapper) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav?.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
            if (isOpen) {
                navLinksWrapper.querySelector('a')?.focus({ preventScroll: true });
            }
        });
    }

    pageLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            if (link.pathname !== window.location.pathname) return;
            const targetId = link.getAttribute('href')?.slice(1);
            if (!targetId) return;
            const targetNode = document.getElementById(targetId);
            if (!targetNode) return;

            event.preventDefault();
            targetNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMenu();
        });
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -10% 0px',
            }
        );

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear().toString();
    }
});

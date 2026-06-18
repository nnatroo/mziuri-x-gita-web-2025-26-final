document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');

    if (!burger || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.add('show');
        burger.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        mobileMenu.classList.remove('show');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }

    burger.addEventListener('click', openMenu);

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // Close the menu after tapping a navigation link
    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
});

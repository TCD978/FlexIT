/* Progressive enhancement only: content and links work without JavaScript. */
(() => {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    const mobile = window.matchMedia('(max-width: 800px)');
    const setOpen = open => {
        toggle.setAttribute('aria-expanded', String(open));
        nav.hidden = mobile.matches && !open;
    };
    const sync = () => {
        const hadFocus = nav.contains(document.activeElement);
        toggle.hidden = !mobile.matches;
        setOpen(false);
        if (mobile.matches && hadFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            toggle.focus();
        }
    });
    const openTarget = hash => {
        if (!hash || hash === '#') return null;
        const target = document.getElementById(hash.slice(1));
        const disclosure = target && target.closest('details');
        if (disclosure) disclosure.open = true;
        return target;
    };
    document.addEventListener('click', event => {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        const target = openTarget(link.hash);
        if (mobile.matches && nav.contains(link)) {
            setOpen(false);
            // Keep keyboard focus in the destination, not in a now-hidden menu.
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus({preventScroll: true});
            }
        }
    });
    window.addEventListener('hashchange', () => openTarget(location.hash));
    if (mobile.addEventListener) mobile.addEventListener('change', sync);
    else mobile.addListener(sync);
    sync();
    openTarget(location.hash);
})();

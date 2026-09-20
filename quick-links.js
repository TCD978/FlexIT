/* Native dialog supplies modal focus containment, Escape and background inertness. */
(() => {
    const dialog = document.getElementById('quickLinks');
    const trigger = document.getElementById('quickLinksToggle');
    const search = document.getElementById('quickLinksSearch');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const links = Array.from(dialog.querySelectorAll('.quick-link'));
    let returnFocus = trigger;
    let navigating = false;
    function filter() {
        const query = search.value.trim().toLowerCase();
        let matches = 0;
        links.forEach(link => {
            link.hidden = !(link.textContent + ' ' + link.dataset.keywords).toLowerCase().includes(query);
            if (!link.hidden) matches++;
        });
        document.getElementById('quickLinksEmpty').hidden = matches !== 0;
        document.getElementById('quickLinksCount').textContent = matches + (matches === 1 ? ' link found.' : ' links found.');
    }
    function open() {
        if (dialog.open) return;
        returnFocus = document.activeElement;
        navigating = false;
        search.value = '';
        filter();
        dialog.showModal();
        search.focus();
    }
    function close() { dialog.close(); }
    trigger.addEventListener('click', open);
    document.getElementById('quickLinksClose').addEventListener('click', close);
    search.addEventListener('input', filter);
    dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); close(); return; }
        const visible = links.filter(link => !link.hidden);
        if (event.key === 'Tab') {
            const first = document.getElementById('quickLinksClose');
            const last = visible[visible.length - 1] || search;
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            return;
        }
        if (!visible.length) return;
        const current = visible.indexOf(document.activeElement);
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const next = event.key === 'ArrowDown' ? (current + 1) % visible.length : (current <= 0 ? visible.length - 1 : current - 1);
            visible[next].focus();
        } else if (event.key === 'Enter' && document.activeElement === search) {
            event.preventDefault(); visible[0].click();
        }
    });
    dialog.addEventListener('click', event => {
        const link = event.target.closest('.quick-link');
        if (!link) return;
        const target = document.getElementById(link.hash.slice(1));
        if (!target) return;
        navigating = true;
        close();
        const details = target.closest('details');
        if (details) details.open = true;
        // Move focus after the native dialog finishes restoring its opener.
        requestAnimationFrame(() => {
            target.setAttribute('tabindex', '-1');
            target.focus({preventScroll: true});
        });
    });
    dialog.addEventListener('close', () => {
        if (!navigating && returnFocus && returnFocus.isConnected) returnFocus.focus({preventScroll:true});
    });
    document.addEventListener('keydown', event => {
        if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k') {
            const editing = event.target.closest('input,textarea,select,[contenteditable="true"]');
            if (editing && !dialog.open) return; // Keep editor/browser shortcuts while entering a message.
            event.preventDefault();
            if (dialog.open) close(); else open();
        }
    });
    trigger.hidden = false;
})();

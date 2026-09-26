/* Context is local to this page. Only the existing contact form sends messages. */
(function () {
    'use strict';
    function mergeRequest(current, previous, next) {
        if (previous && current.includes(previous)) return current.replace(previous, () => next);
        return current + (current.trim() ? '\n\n' : '') + next;
    }
    if (typeof module !== 'undefined' && module.exports) {module.exports = {mergeRequest}; return;}
    const contact = document.getElementById('contactForm');
    if (!contact) return;
    const message = document.getElementById('message');
    const notice = document.getElementById('serviceHandoff');
    const blocks = new Map();
    function prepare(source, summary) {
        if (contact.getAttribute('aria-busy') === 'true') return false;
        message.value = mergeRequest(message.value, blocks.get(source), summary);
        blocks.set(source, summary);
        notice.textContent = 'Your service request is ready below. Add your name and email, review the details, then choose Send Message.';
        notice.hidden = false;
        const status = document.getElementById('formStatus');
        status.textContent = '';
        status.removeAttribute('data-state');
        location.hash = 'contact';
        document.getElementById('name').focus({preventScroll:true});
        return true;
    }
    window.FlexContact = Object.freeze({prepare});
    contact.addEventListener('reset', () => {blocks.clear(); notice.hidden = true;});
    document.addEventListener('click', event => {
        const link = event.target.closest('a[data-inquiry]');
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (!prepare('service-link', 'SERVICE INQUIRY\nInterested in: '+link.dataset.inquiry+'\nPlease help me confirm the scope and next step.')) {
            notice.hidden = false;
            notice.textContent = 'Your previous message is still sending. Please wait before adding another request.';
            location.hash = 'contact';
        }
    });
    // Only accept known entry points; never echo arbitrary URL parameters.
    if (new URLSearchParams(location.search).get('inquiry') === 'website') {
        prepare('service-link', 'WEBSITE PROJECT INQUIRY\nI would like to discuss a website for my business.\nPlease help me confirm the scope and next step.');
        window.addEventListener('load', () => requestAnimationFrame(() => {
            // Fragment navigation can run after initialization. Do not interrupt typing.
            if (document.activeElement === document.body || document.activeElement.id === 'contact') {
                document.getElementById('name').focus({preventScroll:true});
            }
        }), {once:true});
    }
})();

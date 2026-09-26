/* Review intake only. No fetch, scan, score, local storage or automatic email. */
(() => {
    'use strict';
    const PRIORITIES = Object.freeze({
        overall:'Overall website review', mobile:'Mobile layout & ease of use',
        speed:'Loading speed', search:'Search titles & descriptions',
        accessibility:'Accessibility basics', links:'Links, forms & HTTPS'
    });
    function parseWebsite(value) {
        const text = String(value).trim();
        if (!text || text.length > 2048 || /[\u0000-\u001f\u007f]/.test(text)) return {error:'Enter a full website address, starting with https:// or http://.'};
        let url;
        try {url = new URL(text);} catch (_) {return {error:'Enter a full website address, such as https://yourbusiness.com.'};}
        if (!['https:','http:'].includes(url.protocol) || !url.hostname) return {error:'Use an https:// or http:// website address.'};
        if (url.username || url.password) return {error:'Use a public website address without a username or password in the link.'};
        return {url:url.href};
    }
    function reviewSummary({url,priority,goal}) {
        return ['WEBSITE REVIEW REQUEST', 'Website: '+url,
            'Priority: '+(PRIORITIES[priority] || PRIORITIES.overall),
            'What I want visitors to do: '+(goal.trim() || 'To discuss'),
            'Please confirm the review scope and any cost before work begins.',
            'This is a request for a personal review; no automated scan or score has been produced.'
        ].join('\n');
    }
    if (typeof module !== 'undefined' && module.exports) {module.exports = {parseWebsite,reviewSummary,PRIORITIES};return;}
    const form = document.getElementById('reviewForm');
    if (!form) return;
    const website = document.getElementById('reviewWebsite');
    const error = document.getElementById('reviewError');
    const notice = document.getElementById('reviewHandoff');
    const message = document.getElementById('message');
    let previousRequest = '';
    function clearError() {
        website.setCustomValidity('');
        website.removeAttribute('aria-invalid');
        error.textContent = '';
    }
    website.addEventListener('input',clearError);
    website.addEventListener('invalid',() => {
        website.setAttribute('aria-invalid','true');
        error.textContent = website.validationMessage;
    });
    form.addEventListener('submit',event => {
        event.preventDefault();
        clearError();
        if (document.getElementById('contactForm').getAttribute('aria-busy') === 'true') {
            error.textContent = 'Your previous contact message is still sending. Please wait before preparing another request.';
            return;
        }
        const parsed = parseWebsite(website.value);
        if (parsed.error) {
            website.setCustomValidity(parsed.error);
            website.reportValidity();
            website.focus();
            return;
        }
        if (!form.reportValidity()) return;
        const request = reviewSummary({url:parsed.url,priority:document.getElementById('reviewPriority').value,goal:document.getElementById('reviewGoal').value});
        if (previousRequest && message.value.includes(previousRequest)) message.value = message.value.replace(previousRequest,() => request);
        else message.value += (message.value.trim() ? '\n\n' : '') + request;
        previousRequest = request;
        const contactStatus = document.getElementById('formStatus');
        contactStatus.textContent = '';
        contactStatus.removeAttribute('data-state');
        notice.hidden = false;
        location.hash = 'contact';
        document.getElementById('name').focus({preventScroll:true});
    });
    document.getElementById('contactForm').addEventListener('reset',() => {
        previousRequest = '';
        notice.hidden = true;
    });
    form.addEventListener('reset',clearError);
    form.hidden = false;
    document.getElementById('reviewFallback').hidden = true;
})();

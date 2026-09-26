/* Published prices only. Custom work is deliberately excluded from estimates. */
(function () {
    'use strict';
    const PRICES = typeof module !== 'undefined' && module.exports ? require('./pricing-data.js') : window.FlexPrices;
    const money = amount => '$' + amount.toLocaleString('en-US');
    function recommend(input) {
        const pages = Number(input.pages);
        const extra = Math.max(0, pages - 5);
        const customPages = !Number.isInteger(pages) || pages < 1 || pages > 10;
        const build = customPages ? 'Custom website scope' : pages === 1 ? 'One-page website' : 'Small-business website';
        const low = pages === 1 ? PRICES.onePage : PRICES.business + extra * PRICES.extraLow;
        const high = pages === 1 ? low : PRICES.business + extra * PRICES.extraHigh;
        const buildPrice = customPages ? 'Custom quote' : low === high ? money(low) : money(low) + '–' + money(high);
        const notes = [];
        if (customPages) notes.push('Larger or undecided page counts need a confirmed scope and quote.');
        else if (pages === 1) notes.push('One page, up to 6 sections. You supply final text, images, and logo.');
        else notes.push('Includes up to 5 pages and a working contact form.' + (extra ? ' ' + extra + ' additional page(s) at $150–$250 each, using the agreed design and supplied content.' : ''));
        let plan = 'No managed plan selected', monthly = 'To discuss';
        if (input.care === 'managed') { plan = 'Flex Web Care'; monthly = money(PRICES.care) + '/month'; }
        if (input.care === 'self') { plan = 'Self-managed after launch'; monthly = 'No Flex IT monthly plan selected'; }
        const count = (input.tasks || []).length;
        const custom = input.automation === 'custom' || (input.tasks || []).includes('Custom automation');
        if (custom) { plan = 'ACTIAS LUNA™ custom implementation'; monthly = 'Custom quote'; }
        else if (input.automation === 'multiple' || (input.automation === 'one' && count > 1)) { plan = 'Flex Web Automation Pro'; monthly = money(PRICES.pro) + '/month'; }
        else if (input.automation === 'one') { plan = 'Flex Web Automation'; monthly = money(PRICES.automation) + '/month'; }
        if (input.automation !== 'none') {
            notes.push('ACTIAS LUNA initial implementation is quoted separately from the website build and monthly management.');
            if (input.automation === 'unsure') notes.push('Automation needs and the appropriate monthly plan will be discussed before quoting.');
            else if (input.care !== 'managed') notes.push('The automation recommendation includes managed technical care; we will confirm your hosting needs.');
        }
        if (plan === 'Flex Web Care') notes.push('Technical care only; content editing and ACTIAS LUNA automation are not included.');
        if (plan === 'Flex Web Automation') notes.push('One agreed automated feature; approximately 30 minutes/month of minor content edits. Unused time does not roll over.');
        if (plan === 'Flex Web Automation Pro') notes.push('Multiple agreed features or one more advanced automation; approximately 60 minutes/month of minor edits. Unused time does not roll over.');
        const quotes = (input.extras || []).slice();
        if (pages === 1 && input.contactForm) quotes.push('Working contact form for the one-page build');
        if (custom) quotes.push('Custom automation implementation and ongoing management');
        else if (input.automation !== 'none') quotes.push('Initial automation implementation');
        notes.push('Basic search metadata, domain connection, mobile layout, launch, and two revision rounds are included in standard builds.');
        notes.push('Domain registration/renewal, email subscriptions, booking or store platforms, paid APIs and other third-party costs are separate. No search ranking guarantee.');
        return {build, buildPrice, plan, monthly, notes, quotes};
    }
    if (typeof module !== 'undefined' && module.exports) { module.exports = {recommend, PRICES}; return; }
    const form = document.getElementById('buildForm');
    if (!form || !PRICES) return;
    const result = document.getElementById('buildResult');
    const automationFields = document.getElementById('automationFields');
    const selected = name => Array.from(form.querySelectorAll('[name="' + name + '"]:checked'), el => el.value);
    function read() {
        const automation = form.elements.automation.value;
        return {
            business: form.elements.business.value, pages: form.elements.pages.value,
            pageTypes: form.elements.pageTypes.value.trim(), care: form.elements.care.value,
            automation, tasks: automation === 'none' ? [] : selected('tasks'),
            goal: automation === 'none' ? '' : form.elements.automationGoal.value.trim(),
            extras: selected('extras'), contactForm: form.elements.contactForm.checked,
            domain: form.elements.domain.value
        };
    }
    const setText = (id, text) => { document.getElementById(id).textContent = text; };
    function list(id, items) {
        const target = document.getElementById(id);
        target.replaceChildren(...items.map(text => {
            const li = document.createElement('li'); li.textContent = text; return li;
        }));
    }
    function render(announce = false) {
        const data = read();
        const rec = recommend(data);
        automationFields.hidden = data.automation === 'none';
        automationFields.disabled = data.automation === 'none';
        setText('buildName', rec.build); setText('buildPrice', rec.buildPrice);
        setText('planName', rec.plan); setText('planPrice', rec.monthly);
        list('buildNotes', rec.notes);
        list('buildQuotes', rec.quotes.length ? rec.quotes : ['No additional features selected. Final scope still needs confirmation.']);
        if (announce) setText('buildUpdate', 'Recommendation updated: ' + rec.build + ', ' + rec.buildPrice + '. ' + rec.plan + ', ' + rec.monthly + '.');
        return {data, rec};
    }
    function summary(data, rec) {
        return ['WEBSITE BUILD REQUEST', 'Business type: ' + data.business,
            'Page count: ' + (data.pages === 'custom' ? '11+ / to discuss' : data.pages),
            'Pages / sections: ' + (data.pageTypes || 'To discuss'),
            'Contact form: ' + (data.contactForm ? 'Requested' : 'Not requested'),
            'Domain: ' + data.domain,
            'Hosting & maintenance preference: ' + form.elements.care.selectedOptions[0].textContent,
            'ACTIAS LUNA: ' + form.elements.automation.selectedOptions[0].textContent,
            'Automate: ' + (data.tasks.join(', ') || 'To discuss / none selected'),
            'Automation goal: ' + (data.goal || 'Not specified'),
            'Website build: ' + rec.build + ' — ' + rec.buildPrice + ' one-time (standard scope only)',
            'Managed recommendation: ' + rec.plan + ' — ' + rec.monthly,
            'Separately quoted requests: ' + (rec.quotes.join('; ') || 'None selected'),
            'Planning estimate only; custom setup and third-party fees are separate. Final scope and pricing require confirmation.'
        ].join('\n');
    }
    let previousRequest = '';
    document.getElementById('contactForm').addEventListener('reset', () => {
        previousRequest = '';
        document.getElementById('buildHandoff').hidden = true;
    });
    form.addEventListener('change', () => render(true));
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        if (document.getElementById('contactForm').getAttribute('aria-busy') === 'true') {
            setText('buildUpdate', 'Your previous message is still sending. Please wait before preparing another request.');
            return;
        }
        const contactStatus = document.getElementById('formStatus');
        contactStatus.textContent = '';
        contactStatus.removeAttribute('data-state');
        const {data, rec} = render();
        const message = document.getElementById('message');
        const request = summary(data, rec);
        // Replace only our exact previous block; preserve any customer-written text.
        if (previousRequest && message.value.includes(previousRequest)) message.value = message.value.replace(previousRequest, () => request);
        else message.value += (message.value.trim() ? '\n\n' : '') + request;
        previousRequest = request;
        document.getElementById('buildHandoff').hidden = false;
        location.hash = 'contact';
        document.getElementById('name').focus({preventScroll: true});
    });
    form.addEventListener('reset', () => { setTimeout(() => { render(true); }, 0); });
    render();
    form.hidden = false;
    result.hidden = false;
    document.getElementById('buildFallback').hidden = true;
})();

/* Fictional before/after preview; both examples remain available without JS. */
(() => {
    const controls = document.getElementById('comparisonControls');
    if (!controls) return;
    const buttons = Array.from(controls.querySelectorAll('button'));
    const before = document.getElementById('demoBefore');
    const after = document.getElementById('demoAfter');
    const grid = document.getElementById('comparisonGrid');
    controls.addEventListener('click', event => {
        const button = event.target.closest('button[data-view]');
        if (!button) return;
        const view = button.dataset.view;
        buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        before.hidden = view === 'after';
        after.hidden = view === 'before';
        grid.dataset.view = view;
        document.getElementById('comparisonStatus').textContent = view === 'both' ? 'Showing before and after.' : 'Showing the ' + view + ' example.';
    });
    controls.hidden = false;
    const themeSelect = document.getElementById('demoTheme');
    const canvas = document.getElementById('demoCanvas');
    themeSelect.addEventListener('change', () => {
        if (after.hidden) buttons.find(button => button.dataset.view === 'after').click();
        canvas.dataset.theme = themeSelect.value;
        document.getElementById('themeStatus').textContent = themeSelect.selectedOptions[0].textContent + ' applied to the fictional café preview.';
    });
    document.getElementById('themeControls').hidden = false;
})();

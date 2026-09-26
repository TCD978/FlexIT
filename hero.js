/* Decorative depth only. No continuous loop, network requests or status claims. */
(() => {
    const art = document.querySelector('.connection-art');
    if (!art) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    function reset() {
        cancelAnimationFrame(frame);
        art.style.removeProperty('--tilt-x');
        art.style.removeProperty('--tilt-y');
    }
    art.addEventListener('pointermove', event => {
        if (reduce.matches || !pointer.matches) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            const box = art.getBoundingClientRect();
            art.style.setProperty('--tilt-x', ((event.clientX-box.left)/box.width-.5)*8+'deg');
            art.style.setProperty('--tilt-y', ((event.clientY-box.top)/box.height-.5)*-8+'deg');
        });
    });
    art.addEventListener('pointerleave', reset);
    reduce.addEventListener('change', reset);
    window.addEventListener('pagehide', reset);
})();

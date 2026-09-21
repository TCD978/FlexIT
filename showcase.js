/* All schedule/build output below is explicitly illustrative, never a live job. */
(() => {
    'use strict';
    const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    function scheduleFor(day) {
        if (!Number.isInteger(day) || day < 0 || day > 6) throw new RangeError('Choose a weekday from 0 through 6.');
        if (day === 5 || day === 6) return {day:DAYS[day], headline:'The weekend special is here.', message:'Explore this weekend’s café special.', rule:'Friday or Saturday → show the approved weekend promotion.'};
        if (day === 0) return {day:DAYS[day], headline:'A new week is on the way.', message:'The weekend promotion has ended. Explore our regular menu.', rule:'Sunday → replace the expired promotion with the approved follow-up.'};
        return {day:DAYS[day], headline:'Your everyday favorites.', message:'Explore the regular café menu. Our weekend special returns Friday.', rule:'Monday through Thursday → show the regular menu message.'};
    }
    if (typeof module !== 'undefined' && module.exports) {module.exports = {scheduleFor}; return;}
    const day = document.getElementById('scheduleDay');
    if (!day) return;
    day.addEventListener('change', () => {
        const sample = scheduleFor(Number(day.value));
        for (const key of ['headline','message','rule']) document.getElementById('schedule'+key[0].toUpperCase()+key.slice(1)).textContent = sample[key];
        document.getElementById('scheduleLabel').textContent = sample.day.toUpperCase();
    });
    document.getElementById('scheduleControls').hidden = false;

    const walkthrough = document.getElementById('watch-build');
    const illustration = document.getElementById('buildIllustration');
    const stages = Array.from(document.querySelectorAll('#buildStages li'));
    const status = document.getElementById('buildStageStatus');
    const play = document.getElementById('buildPlay');
    const next = document.getElementById('buildNext');
    const replay = document.getElementById('buildReplay');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stage = 0, timer = null;
    function stop() {
        clearInterval(timer); timer = null;
        play.textContent = motion.matches ? 'Show completed view' : 'Play walkthrough';
    }
    function render() {
        illustration.dataset.stage = String(stage);
        stages.forEach((item,index) => {
            if (index === stage) item.setAttribute('aria-current','step');
            else item.removeAttribute('aria-current');
        });
        status.textContent = 'Step ' + (stage + 1) + ' of 6: ' + stages[stage].textContent + (stage === 5 ? ' Illustration complete; no website has been deployed.' : '');
        next.disabled = stage === 5;
    }
    function advance() {
        stage = Math.min(5,stage+1);
        if (stage === 5) stop();
        render();
    }
    function start() {
        stop();
        if (motion.matches) {stage = 5; render(); return;}
        if (stage === 5) stage = 0;
        render();
        play.textContent = 'Pause walkthrough';
        timer = setInterval(advance,2200);
    }
    play.addEventListener('click', () => {if (timer) stop(); else start();});
    next.addEventListener('click', () => {stop(); advance();});
    document.getElementById('buildSkip').addEventListener('click', () => {stop(); stage = 5; render();});
    replay.addEventListener('click', () => {stop(); stage = 0; if (motion.matches) render(); else start();});
    walkthrough.addEventListener('toggle', () => {if (!walkthrough.open) stop();});
    document.addEventListener('visibilitychange', () => {if (document.hidden) stop();});
    window.addEventListener('pagehide',stop);
    const onMotion = () => {stop(); if (motion.matches) stage = 5; render();};
    if (motion.addEventListener) motion.addEventListener('change',onMotion);
    else motion.addListener(onMotion);
    if (motion.matches) stage = 5;
    stop(); render();
    document.getElementById('walkthroughControls').hidden = false;
})();

/* Starfall (Hardwave Atmospheric Beat), 9JackJack8, Pixabay Content License.
   Local asset supplied separately by the site owner. See README for the record. */
(() => {
    const button = document.getElementById('audioToggle');
    const label = document.getElementById('audioState');
    const status = document.getElementById('audioStatus');
    if (!button) return;
    const key = 'flexit.actias.audio';
    const track = 'assets/audio/starfall-9jackjack8.mp3';
    const audio = new Audio();
    audio.preload = 'none';
    audio.loop = true;
    let context, gain, wanted = false, revision = 0, pauseTimer;
    const save = value => { try { localStorage.setItem(key, value); } catch (_) {} };
    const display = (live, message) => {
        button.setAttribute('aria-pressed', String(live));
        label.textContent = live ? 'LIVE' : 'OFF';
        status.textContent = message;
    };
    const ramp = (target, seconds) => {
        const now = context.currentTime;
        const current = gain.gain.value;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(current, now);
        gain.gain.linearRampToValueAtTime(target, now + seconds);
    };
    const failed = () => {
        wanted = false;
        revision++;
        clearTimeout(pauseTimer);
        if (gain) { gain.gain.cancelScheduledValues(context.currentTime); gain.gain.setValueAtTime(0, context.currentTime); }
        audio.pause();
        display(false, 'Soundtrack unavailable. You can try again.');
    };
    try {
        if (localStorage.getItem(key) === 'live') display(false, 'Soundtrack remembered · press to resume');
    } catch (_) {}
    document.getElementById('audioPanel').hidden = false;
    audio.addEventListener('error', failed);
    audio.addEventListener('pause', () => {
        if (wanted && audio.paused) { wanted = false; revision++; display(false, 'Playback paused · press to resume'); }
    });
    button.addEventListener('click', async () => {
        wanted = !wanted;
        const token = ++revision;
        clearTimeout(pauseTimer);
        save(wanted ? 'live' : 'off');
        if (!wanted) {
            display(false, 'Soundtrack off');
            if (gain && context.state === 'running') {
                ramp(0, 0.6);
                pauseTimer = setTimeout(() => { if (!wanted) audio.pause(); }, 650);
            } else audio.pause();
            return;
        }
        display(false, 'Starting soundtrack… press again to cancel');
        try {
            if (!context) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                context = new AudioContext();
                gain = context.createGain();
                gain.gain.value = 0;
                context.createMediaElementSource(audio).connect(gain);
                gain.connect(context.destination);
            }
            if (!audio.getAttribute('src') || audio.error) audio.src = track;
            // Both calls happen inside the explicit click; never auto-play from storage.
            await Promise.all([context.resume(), audio.play()]);
            if (token !== revision || !wanted) { if (!wanted) audio.pause(); return; }
            if (context.state !== 'running') throw new Error('Audio is unavailable');
            ramp(0.12, 1.2);
            display(true, 'Starfall · quiet background soundtrack');
        } catch (_) {
            if (token === revision) failed();
        }
    });
    window.addEventListener('pagehide', () => {
        wanted = false; revision++; clearTimeout(pauseTimer);
        if (gain) { gain.gain.cancelScheduledValues(context.currentTime); gain.gain.setValueAtTime(0, context.currentTime); }
        audio.pause();
        display(false, 'Soundtrack paused · press to resume');
    });
})();

/* Actual browser rule evaluations. Never represents server jobs or uptime. */
(function () {
    'use strict';
    const ZONE = 'America/New_York';
    const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const FEATURES = Object.freeze([
        {title:'A little guidance goes a long way.',copy:'Patient, one-to-one coaching for your everyday technology questions.',href:'#service-coaching',rule:'Sunday → feature technology coaching.'},
        {title:'Start with a connected workplace.',copy:'Bring your office network and existing equipment together with a clearly scoped setup.',href:'#service-office-network',rule:'Monday → feature office networking.'},
        {title:'Give your business a useful website.',copy:'Explain your services, help customers find you, and make the next step clear.',href:'#websites',rule:'Tuesday → feature website development.'},
        {title:'Get your devices ready to work.',copy:'Computer configuration, updates, account sign-in, and the basics that make daily use easier.',href:'#service-computer',rule:'Wednesday → feature computer setup.'},
        {title:'Keep your website working.',copy:'Explore managed technical care, with clearly defined scope and a familiar point of contact.',href:'#service-care',rule:'Thursday → feature website care.'},
        {title:'Less routine website work.',copy:'Explore a scheduled special, featured service, or another useful action through ACTIAS LUNA.',href:'#actiasTitle',rule:'Friday → feature website automation.'},
        {title:'A better-connected home.',copy:'Get help setting up your existing router and connecting your everyday devices.',href:'#service-wifi',rule:'Saturday → feature home Wi-Fi.'}
    ]);
    function featuredFor(day) {
        if (!Number.isInteger(day) || day<0 || day>6) throw new RangeError('Invalid weekday');
        return FEATURES[day];
    }
    function dayInDracut(date) {
        const name = new Intl.DateTimeFormat('en-US',{weekday:'long',timeZone:ZONE}).format(date);
        return DAYS.indexOf(name);
    }
    function nextCheck(date) {return new Date(Math.floor(date.getTime()/60000)*60000+60000);}
    if (typeof module !== 'undefined' && module.exports) {module.exports={featuredFor,dayInDracut,nextCheck,ZONE};return;}
    const root = document.getElementById('actias-live');
    if (!root) return;
    const byId = id => document.getElementById(id);
    const choice = byId('liveDay');
    let paused = false, timer = null, lastDay = null;
    const clock = date => new Intl.DateTimeFormat('en-US',{timeZone:ZONE,hour:'numeric',minute:'2-digit',second:'2-digit',timeZoneName:'short'}).format(date);
    // The renderer consumes a snapshot; a future verified backend adapter can replace
    // the browser source only when it supplies provenance and actual publication evidence.
    function renderSnapshot(snapshot) {
        const feature=featuredFor(snapshot.day);
        byId('liveMode').textContent=snapshot.preview?'PREVIEW / SIMULATED DAY':'LIVE / BROWSER DEMONSTRATION';
        byId('liveEngine').textContent=snapshot.preview?'Day preview · automatic checks suspended':paused?'Paused by you':'Browser rule active';
        byId('liveAction').textContent=snapshot.preview?'Preview selected: '+DAYS[snapshot.day]:lastDay===snapshot.day?'Rule checked; featured service unchanged':'Selected '+DAYS[snapshot.day]+'’s featured service';
        byId('liveEvaluated').textContent=clock(snapshot.evaluatedAt)+' · this session';
        byId('liveNext').textContent=snapshot.preview||paused?'Automatic checks paused':clock(snapshot.nextAt)+' · while visible';
        byId('liveFeatureLabel').textContent=(snapshot.preview?'SIMULATED ':'FEATURED TODAY / ')+DAYS[snapshot.day].toUpperCase();
        byId('liveFeatureTitle').textContent=feature.title;
        byId('liveFeatureCopy').textContent=feature.copy;
        byId('liveFeatureLink').href=feature.href;
        byId('liveRule').textContent=feature.rule;
        lastDay=snapshot.day;
    }
    function update() {
        clearTimeout(timer);timer=null;
        if (document.hidden) return;
        const now=new Date(), preview=choice.value!=='today';
        renderSnapshot({day:preview?Number(choice.value):dayInDracut(now),preview,evaluatedAt:now,nextAt:nextCheck(now)});
        if (!paused&&!preview) timer=setTimeout(update,nextCheck(now).getTime()-now.getTime()+20);
    }
    choice.addEventListener('change',() => {
        lastDay=null;update();
        byId('liveStatus').textContent=choice.value==='today'?'Showing today’s rule in Dracut.':'Preview only: '+DAYS[Number(choice.value)]+'. Nothing has been published.';
        byId('livePause').hidden=choice.value!=='today';
    });
    byId('livePause').addEventListener('click',() => {
        paused=!paused;
        byId('livePause').textContent=paused?'Resume automatic checks':'Pause automatic checks';
        update();
        byId('liveStatus').textContent=paused?'Automatic checks paused. The current service stays visible.':'Automatic checks resumed while this page is visible.';
    });
    document.addEventListener('visibilitychange',() => {
        if (document.hidden) {clearTimeout(timer);timer=null;}
        else if (!paused) update();
    });
    window.addEventListener('pagehide',() => {clearTimeout(timer);timer=null;});
    window.addEventListener('pageshow',() => {if (!paused) update();});
    try {update();byId('liveControls').hidden=false;}
    catch (_) {byId('liveEngine').textContent='Browser clock unavailable · default service shown';}
})();

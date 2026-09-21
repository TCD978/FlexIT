const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {scheduleFor} = require('./showcase.js');
for (const day of [1,2,3,4]) assert.equal(scheduleFor(day).headline,'Your everyday favorites.');
for (const day of [5,6]) assert.equal(scheduleFor(day).headline,'The weekend special is here.');
assert.ok(scheduleFor(0).message.includes('has ended'));
for (const day of [-1,7,1.5,NaN,'5']) assert.throws(()=>scheduleFor(day),RangeError);

function harness(reduced=false) {
    const make = () => ({textContent:'',hidden:false,disabled:false,dataset:{},listeners:{},attrs:{},
        addEventListener(type,fn){this.listeners[type]=fn;},
        setAttribute(key,value){this.attrs[key]=value;},removeAttribute(key){delete this.attrs[key];}});
    const elements = Object.fromEntries(['scheduleDay','scheduleControls','scheduleHeadline','scheduleMessage','scheduleRule','scheduleLabel','watch-build','buildIllustration','buildStageStatus','buildPlay','buildNext','buildReplay','buildSkip','walkthroughControls'].map(id=>[id,make()]));
    const stages = Array.from({length:6},(_,i)=>({...make(),textContent:'Stage '+i}));
    const media = {...make(),matches:reduced};
    const document = {...make(),getElementById:id=>elements[id],querySelectorAll:()=>stages};
    const window = {...make(),matchMedia:()=>media};
    const timers = new Map();let id=0;
    vm.runInNewContext(fs.readFileSync(__dirname+'/showcase.js','utf8'),{document,window,setInterval:fn=>{timers.set(++id,fn);return id;},clearInterval:key=>timers.delete(key)});
    return {elements,stages,media,document,window,timers,click:key=>elements[key].listeners.click(),tick:()=>[...timers.values()].forEach(fn=>fn())};
}
let h=harness();
assert.equal(h.timers.size,0); // Never autoplay on load.
assert.equal(h.elements.buildIllustration.dataset.stage,'0');
h.click('buildPlay');assert.equal(h.timers.size,1);h.tick();assert.equal(h.elements.buildIllustration.dataset.stage,'1');
h.click('buildPlay');assert.equal(h.timers.size,0); // Pause.
h.click('buildNext');assert.equal(h.elements.buildIllustration.dataset.stage,'2');
h.click('buildPlay');h.click('buildSkip');assert.equal(h.timers.size,0);assert.equal(h.elements.buildIllustration.dataset.stage,'5');assert.equal(h.elements.buildNext.disabled,true);
h.click('buildReplay');assert.equal(h.elements.buildIllustration.dataset.stage,'0');assert.equal(h.timers.size,1);
for(let i=0;i<5;i++)h.tick();assert.equal(h.timers.size,0);assert.equal(h.stages.filter(el=>el.attrs['aria-current']==='step').length,1);
h.click('buildReplay');h.elements['watch-build'].open=false;h.elements['watch-build'].listeners.toggle();assert.equal(h.timers.size,0);
h.click('buildPlay');h.document.hidden=true;h.document.listeners.visibilitychange();assert.equal(h.timers.size,0);
h.click('buildPlay');h.media.matches=true;h.media.listeners.change();assert.equal(h.timers.size,0);assert.equal(h.elements.buildIllustration.dataset.stage,'5');
h=harness(true);assert.equal(h.timers.size,0);assert.equal(h.elements.buildIllustration.dataset.stage,'5');h.click('buildReplay');assert.equal(h.elements.buildIllustration.dataset.stage,'0');assert.equal(h.timers.size,0);h.click('buildNext');assert.equal(h.elements.buildIllustration.dataset.stage,'1');h.click('buildPlay');assert.equal(h.elements.buildIllustration.dataset.stage,'5');assert.equal(h.timers.size,0);
h.elements.scheduleDay.value='0';h.elements.scheduleDay.listeners.change();assert.equal(h.elements.scheduleLabel.textContent,'SUNDAY');
console.log('PASS: all schedule branches, input bounds, no autoplay, play/pause/next/replay/skip, timer cleanup, focus-independent stage state and reduced-motion behavior');

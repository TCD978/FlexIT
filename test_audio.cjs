const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync(__dirname+'/audio.js','utf8');
function setup(saved,blocked=false,storageBlocked=false){
 const els=Object.fromEntries(['audioToggle','audioState','audioStatus','audioPanel'].map(k=>[k,{attrs:{},textContent:'',addEventListener(t,f){this[t]=f},setAttribute(k,v){this.attrs[k]=v}}]));
 let a,g,plays=0; const timers=new Map(); let tid=0;
 const store={value:saved,setItem(k,v){if(storageBlocked)throw Error();this.value=v},getItem(){if(storageBlocked)throw Error();return this.value}};
 class Audio {constructor(){a=this;this.paused=true;this.events={}}getAttribute(){return this.src}addEventListener(k,v){this.events[k]=v}play(){plays++;if(blocked)return Promise.reject(Error());this.paused=false;return Promise.resolve()}pause(){this.paused=true;this.events.pause?.()}}
 class AC {constructor(){this.currentTime=0;this.state='running'}createGain(){g={gain:{value:0,cancelScheduledValues(){},setValueAtTime(v){this.value=v},linearRampToValueAtTime(v,t){this.target=v;this.time=t}},connect(){}};return g}createMediaElementSource(){return {connect(){}}}resume(){return Promise.resolve()}}
 const w={AudioContext:AC,addEventListener(k,f){this[k]=f}};
 vm.runInNewContext(code,{document:{getElementById:k=>els[k]},Audio,window:w,localStorage:store,setTimeout:f=>{timers.set(++tid,f);return tid},clearTimeout:i=>timers.delete(i)});
 return {els,a,store,w,click:()=>els.audioToggle.click(),gain:()=>g,plays:()=>plays,flush:()=>{for(const f of timers.values())f();timers.clear()}};
}
(async()=>{
 let s=setup();assert.equal(s.plays(),0);assert.equal(s.a.src,undefined);assert.equal(s.a.preload,'none');assert.equal(s.a.loop,true);
 await s.click();assert.equal(s.els.audioState.textContent,'LIVE');assert.equal(s.gain().gain.target,.12);assert.equal(s.gain().gain.time,1.2);
 await s.click();assert.equal(s.els.audioState.textContent,'OFF');assert.equal(s.gain().gain.target,0);assert.equal(s.a.paused,false);s.flush();assert.equal(s.a.paused,true);assert.equal(s.store.value,'off');
 s=setup('live');assert.equal(s.plays(),0);assert.match(s.els.audioStatus.textContent,/remembered/);
 s=setup(null,true);await s.click();assert.equal(s.els.audioState.textContent,'OFF');assert.match(s.els.audioStatus.textContent,/unavailable/);
 s=setup();const p=s.click();const q=s.click();await Promise.all([p,q]);s.flush();assert.equal(s.a.paused,true);assert.equal(s.els.audioState.textContent,'OFF');
 s=setup();await s.click();await s.click();await s.click();s.flush();assert.equal(s.a.paused,false);assert.equal(s.els.audioState.textContent,'LIVE');s.a.events.error();assert.equal(s.a.paused,true);assert.equal(s.els.audioState.textContent,'OFF');
 s=setup(null,false,true);await s.click();assert.equal(s.els.audioState.textContent,'LIVE');s.w.pagehide();assert.equal(s.a.paused,true);
 console.log('PASS: initial silence, lazy source, loop, gain fades, preferences, rejected play, rapid toggles, missing media, denied storage, page departure.');
})().catch(e=>{console.error(e);process.exitCode=1});

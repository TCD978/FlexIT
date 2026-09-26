const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function setup(query='') {
    const nodes={},handlers={},windowHandlers={};
    for (const id of ['contactForm','message','serviceHandoff','formStatus','name']) nodes[id]={value:'',hidden:true,textContent:'',attrs:{},events:{},addEventListener(t,f){this.events[t]=f;},getAttribute(k){return this.attrs[k];},removeAttribute(k){delete this.attrs[k];},focus(){document.activeElement=this;},id};
    const document={activeElement:{id:''},body:{},getElementById:id=>nodes[id],addEventListener:(t,f)=>handlers[t]=f};
    const location={search:query},window={addEventListener:(t,f)=>windowHandlers[t]=f};
    vm.runInNewContext(fs.readFileSync('contact-context.js','utf8'),{document,window,location,URLSearchParams,requestAnimationFrame:f=>f()});
    return {nodes,document,window,location,handlers};
}
const env=setup(),{nodes,window,document}=env;
nodes.message.value='My notes.';
assert.equal(window.FlexContact.prepare('finder','FIRST'),true);
assert.equal(document.activeElement.id,'name');assert.equal(env.location.hash,'contact');
window.FlexContact.prepare('finder','SECOND');assert.equal(nodes.message.value,'My notes.\n\nSECOND');
window.FlexContact.prepare('service-link','THIRD');assert.ok(nodes.message.value.includes('SECOND\n\nTHIRD'));
nodes.contactForm.attrs['aria-busy']='true';const saved=nodes.message.value;
assert.equal(window.FlexContact.prepare('finder','blocked'),false);assert.equal(nodes.message.value,saved);
delete nodes.contactForm.attrs['aria-busy'];nodes.contactForm.events.reset();assert.equal(nodes.serviceHandoff.hidden,true);
nodes.message.value='';window.FlexContact.prepare('finder','SECOND');assert.equal(nodes.message.value,'SECOND');
assert.equal(setup('?inquiry=untrusted').nodes.message.value,'');
assert.match(setup('?inquiry=website').nodes.message.value,/WEBSITE PROJECT INQUIRY/);
const html=fs.readFileSync('index.html','utf8');
assert.ok(html.includes('data-inquiry="Website plan: Automation Pro">Discuss Automation Pro'));
console.log('PASS: shared contact focus, repeat replacement, independent contexts, busy-send isolation, reset and allowlisted entry points');

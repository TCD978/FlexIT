// Exercise the existing contact handler without sending email.
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = readFileSync(join(__dirname, 'script.js'), 'utf8');
async function test(mode) {
  let handler, sent = 0, reset = false;
  const button = {textContent:'Send Message',disabled:false};
  const status = {textContent:'',dataset:{}};
  const fields = { name:{value:'Test'}, email:{value:'test@example.com'}, message:{value:'Test message'} };
  const form = {querySelector:()=>button,addEventListener:(_,fn)=>handler=fn,reportValidity:()=>true,setAttribute(){},removeAttribute(){},reset(){reset=true;}};
  const window = mode==='unavailable' ? {} : {emailjs:{init(){},async send(){sent++;if(mode==='failure')throw new Error('offline');}}};
  vm.runInNewContext(source,{window,document:{getElementById:id=>({contactForm:form,formStatus:status,...fields}[id])}});
  if(mode==='blank')fields.name.value='  ';
  await handler({preventDefault(){}});
  assert.equal(button.disabled,false);
  if(mode==='success'){assert.equal(sent,1);assert.equal(reset,true);assert.equal(status.dataset.state,'success');}
  else {assert.equal(reset,false);assert.equal(status.dataset.state,'error');assert.equal(fields.message.value,'Test message');}
}
(async()=>{for(const mode of ['success','failure','unavailable','blank'])await test(mode);console.log('PASS: contact success, failure, unavailable provider, whitespace validation; no email transmitted');})().catch(error=>{console.error(error);process.exitCode=1;});

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {parseWebsite,reviewSummary} = require('./website-review.js');
assert.equal(parseWebsite(' https://example.com/about ').url,'https://example.com/about');
assert.equal(parseWebsite('http://example.com').url,'http://example.com/');
assert.equal(parseWebsite('https://example.com/?page=2#contact').url,'https://example.com/?page=2#contact');
for (const input of ['', 'example.com', 'not a url', 'javascript:alert(1)', 'file:///tmp/test', 'ftp://example.com', 'https://user:password@example.com', 'https://user@example.com', 'https://exa\nmple.com', 'https://example.com/'+ 'x'.repeat(2048)]) assert.ok(parseWebsite(input).error,input);
const summary = reviewSummary({url:'https://example.com/',priority:'speed',goal:'Get more appointment requests'});
assert.ok(summary.includes('Loading speed'));assert.ok(summary.includes('any cost'));assert.ok(summary.includes('no automated scan'));

function element() {return {value:'',textContent:'',hidden:true,listeners:{},attrs:{},
    addEventListener(type,fn){this.listeners[type]=fn;},setCustomValidity(text){this.validationMessage=text;},
    setAttribute(key,value){this.attrs[key]=value;},getAttribute(key){return this.attrs[key];},removeAttribute(key){delete this.attrs[key];},
    reportValidity(){if(this.validationMessage)this.listeners.invalid?.();return !this.validationMessage;},focus(){this.focused=true;}};}
const nodes = Object.fromEntries(['reviewForm','reviewWebsite','reviewError','reviewHandoff','reviewPriority','reviewGoal','message','name','contactForm','reviewFallback','formStatus'].map(id=>[id,element()]));
const location = {};
vm.runInNewContext(fs.readFileSync(__dirname+'/website-review.js','utf8'),{document:{getElementById:id=>nodes[id]},location,URL});
const submit = () => nodes.reviewForm.listeners.submit({preventDefault(){}});
assert.equal(nodes.reviewForm.hidden,false);assert.equal(nodes.reviewFallback.hidden,true);
nodes.reviewWebsite.value='https://example.com';nodes.reviewPriority.value='mobile';nodes.reviewGoal.value='<b>Existing visitor goal</b>';
nodes.message.value='Keep this note.\nWEBSITE BUILD REQUEST\nExisting build details.';
nodes.formStatus.textContent='Message sent successfully!';
submit();assert.equal(location.hash,'contact');assert.equal(nodes.name.focused,true);assert.equal(nodes.reviewHandoff.hidden,false);
assert.equal(nodes.formStatus.textContent,'');
assert.ok(nodes.message.value.startsWith('Keep this note.'));assert.ok(nodes.message.value.includes('Existing build details.'));
assert.ok(nodes.message.value.includes('<b>Existing visitor goal</b>')); // Stored as plain textarea text.
nodes.reviewPriority.value='search';submit();assert.equal(nodes.message.value.split('WEBSITE REVIEW REQUEST').length-1,1);assert.ok(nodes.message.value.includes('Search titles'));
const saved=nodes.message.value;
nodes.contactForm.attrs['aria-busy']='true';nodes.reviewPriority.value='speed';submit();assert.equal(nodes.message.value,saved);assert.ok(nodes.reviewError.textContent.includes('still sending'));delete nodes.contactForm.attrs['aria-busy'];
nodes.reviewWebsite.value='https://user:secret@example.com';submit();assert.equal(nodes.message.value,saved);assert.ok(nodes.reviewError.textContent.includes('without a username'));assert.equal(nodes.reviewWebsite.attrs['aria-invalid'],'true');
nodes.reviewWebsite.listeners.input();assert.equal(nodes.reviewError.textContent,'');assert.equal(nodes.reviewWebsite.attrs['aria-invalid'],undefined);
nodes.contactForm.listeners.reset();assert.equal(nodes.reviewHandoff.hidden,true);
nodes.message.value='';nodes.reviewWebsite.value='https://example.com';submit();assert.equal(nodes.message.value.split('WEBSITE REVIEW REQUEST').length-1,1);
console.log('PASS: URL syntax/schemes/credentials, plain-text summary, customer and build-note preservation, repeat requests, invalid-input isolation, focus and reset; no network or email');

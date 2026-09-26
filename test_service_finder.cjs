const assert = require('node:assert/strict');
const fs = require('node:fs');
const {TOPICS,CUSTOM,topicsFor,choicesFor,validChoice,requestSummary} = require('./service-finder.js');
const {mergeRequest} = require('./contact-context.js');
const html = fs.readFileSync('index.html','utf8');
let routes=0;
for (const audience of ['home','business']) for (const [topic] of topicsFor(audience)) for (const [choice] of choicesFor(audience,topic)) {
    assert.ok(validChoice(audience,topic,choice));
    if (!CUSTOM[choice]) assert.ok(html.includes('id="service-'+choice+'"'),choice);
    const summary=requestSummary({audience,topic,choice},{title:'Verified row',price:'Published amount',description:'Scope',terms:'Terms'});
    assert.ok(summary.includes(TOPICS[topic].label));
    routes++;
}
assert.ok(!validChoice('business','smart','smart'));
assert.ok(!validChoice('other','wifi','wifi'));
assert.ok(!validChoice('home','wifi','automation'));
assert.throws(() => requestSummary({audience:'home',topic:'wifi',choice:'bad'},{}));
assert.equal(mergeRequest('My notes\n\nold','old','new'),'My notes\n\nnew');
assert.equal(mergeRequest('My edited request','old','new'),'My edited request\n\nnew');
assert.equal(mergeRequest('old','old','$& literal'),'$& literal');
assert.equal(mergeRequest('','', 'request'),'request');
assert.equal(mergeRequest('request','request','request'),'request');
console.log('PASS: '+routes+' supported service paths, pricing anchors, invalid combinations, note preservation, repeated requests and literal input');

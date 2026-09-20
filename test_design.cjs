const assert = require('node:assert/strict');
const fs = require('node:fs');
const css = fs.readFileSync(__dirname+'/design-demo.css','utf8');
const defaults = Object.fromEntries([...css.matchAll(/--demo-([a-z]+):(#[0-9a-f]{6})/g)].slice(0,5).map(m=>[m[1],m[2]]));
function luminance(hex) {
    const values = hex.slice(1).match(/../g).map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);
    return .2126*values[0]+.7152*values[1]+.0722*values[2];
}
function ratio(a,b) {const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
const themes = {default:defaults};
for (const match of css.matchAll(/\.demo-modern\[data-theme=(\w+)\]\s*\{([^}]+)\}/g)) {
    const colors = Object.fromEntries([...match[2].matchAll(/--demo-([a-z]+):(#[0-9a-f]{6})/g)].map(m=>[m[1],m[2]]));
    if (Object.keys(colors).length) themes[match[1]]={...defaults,...colors};
}
assert.equal(Object.keys(themes).length,5);
for (const [name,c] of Object.entries(themes)) {
    for (const [fg,bg] of [['text','bg'],['muted','bg'],['ink','accent']]) assert.ok(ratio(c[fg],c[bg])>=4.5,`${name}: ${fg}/${bg} contrast`);
}
console.log('PASS: all five preview themes meet 4.5:1 text, secondary text and CTA color contrast');

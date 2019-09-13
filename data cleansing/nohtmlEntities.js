//ES5
function reg(o,n){return o ? o[n] : ''}
function reChar(s) {	return typeof s == 'string' && s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(function(el){return [el, String.fromCharCode(reg(/&#(.+?);/.exec(el),1))]}).map(function(m) {return s = s.replace(new RegExp(m[0], 'i'), m[1])}).pop() : s;}
//ES6
var reChar = (s) => typeof s == 'string' && s.match(/&#\d+;/g) && s.match(/&#\d+;/g).length > 0 ? s.match(/&#\d+;/g).map(el => [el, String.fromCharCode(reg(/(?<=&#).+?(?=;)/.exec(el),0))]).map(m => s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;
var noHtmlEntities = (s) => typeof s == 'string' ? s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ') : s;

var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var reChar = (s) => s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el => [el, String.fromCharCode(/d+/.exec(el)[0])]).map(m => s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;

function createContainer(obj, parent) {
  if(obj.attr && obj.attr.id) if(gi(document,obj.attr.id)) gi(document,obj.attr.id).outerHTML = '';
  var cont = ele(obj.tag);
  obj.attr ? Object.entries(obj.attr).forEach(el => attr(cont, el[0], el[1]) ) : '';
  obj.styles ? Object.entries(obj.styles).forEach(el => cont.style[el[0]] = el[1] ) : '';
  parent.appendChild(cont);
  obj.text ? cont.innerText = obj.text : '';
  obj.innerHTML ? cont.innerHTML = obj.innerHTML : '';
}

var contProps = {
  tag: 'div',
  attr: {
    id: 'test-item',
    datatype: 'this is a test'
  },
  styles: {
    position: 'fixed',
	padding: '11px',
    top: '10%',
    width: '50%',
    background: '#1c1c1c',
    zIndex: '12211',
    transition: 'all 2s ease',
	color: '#fff'
  },
  text: 'test three'
}

createContainer(contProps, document.body)

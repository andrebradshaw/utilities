function domplate() {
  var output = `var reg = (o, n) => o ? o[n] : '';\nvar cn = (o, s) => o ? o.getElementsByClassName(s) : null;\nvar tn = (o, s) => o ? o.getElementsByTagName(s) : null;\nvar gi = (o, s) => o ? o.getElementById(s) : null;\nvar rando = (n) => Math.round(Math.random() * n);\nvar unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);\nvar delay = (ms) => new Promise(res => setTimeout(res, ms));\nvar ele = (t) => document.createElement(t);\nvar attr = (o, k, v) => o.setAttribute(k, v);\nvar a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));\nvar reChar = (s) => s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el => [el, String.fromCharCode(/d+/.exec(el)[0])]).map(m => s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;`;
  var el = document.createElement('textarea');
  document.body.appendChild(el);
  el.value = output;
  el.select();
  document.execCommand('copy');
  el.outerHTML = '';
}
domplate()

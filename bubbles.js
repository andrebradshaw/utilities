var rando = (n) => Math.round(Math.random() * n);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);

function genColor(n) {
  var s = '';
  var chars = '1e043579bd';
  for (var i = 0; i <= n; i++) {
    s += chars[rando(9)];
  }
  return s;
}

function randomBalls() {
  var circles = ``;
  for (var i = 0; i < 550; i++) {
    var startPos = 100;
    var startRad = rando(10) / 10;
    var endRad = rando(25) / 10;
    var x = rando(180);
    var y = rando(160);
    var color = `#${genColor(5)}`;
    var time = (rando(20) / 10);
    circles += `<circle cx="${x}" cy="${y}" r="${endRad}" fill="${color}">
    <animate attributeName="cy" values="${startPos}; ${y-(y/10)}; ${y}; ${y};" begin="0s" dur="${time}s" repeatCount="0" />
    <animate attributeName="r" values="${startRad}; ${endRad}; ${endRad-(endRad/10)}; ${startRad};" begin="0s" dur="${time}s" repeatCount="indefinite" />
    <animate attributeName="cx" values="${startPos}; ${x-(x/10)}; ${x}; ${x};" begin="0s" dur="${time}s" repeatCount="0" />
  </circle>`;
  }
  return circles;
}

function killthis(){
  var rad = parseFloat(this.getAttribute('r'));
  parseFloat(this.getAttribute('r')) < 5 ? this.setAttribute('r', rad*3) : this.setAttribute('r', '1');
//   this.outerHTML = '';
}

function resetPos(elm){
  var circles = Array.from(tn(elm,'cirlce'));
  for(var c=0; c<circles.length; c++){
    var y = circles[c].getAttribute('cy');
    var x = circles[c].getAttribute('cx');
    circles[c].setAttribute('cy','100');
    circles[c].setAttribute('cx','100');
    circles[c].innerHTML = `<animate attributeName="cy" values="${y}; 100" begin="0s" dur="0.5s" repeatCount="0" />
    <animate attributeName="cx" values="${x}; 100;" begin="0s" dur="0.5s" repeatCount="0" />`
  }
}
async function celebrate() {
    var balls = randomBalls();
    var sv = ele('div');
    attr(sv,'style','position: fixed; z-index: 11111; top: 20%; left: 20%; width: 50%; height: 50%; clip-path: circle(50%);');
    document.body.appendChild(sv);
    sv.innerHTML = `<svg viewBox="0 0 200 200">${balls}</svg>`;
    await delay(5900);
resetPos(sv);
//     sv.outerHTML = ''
}
celebrate()

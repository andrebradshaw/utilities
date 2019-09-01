var rando = (n) => Math.round(Math.random() * n);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

function genColor(n) {
  var s = '';
  var chars = '1e043579bd';
  for (var i = 0; i <= n; i++) {
    s += chars[rando(9)];
  }
  return s;
}

function randomBalls() {
  var circles = `<circle cx="70" cy="70" r="1" fill="#000"><animate attributeName="r" values="1; 120; 1;" begin="0s" dur="1.8s" repeatCount="0" /></circle>`;
  for (var i = 0; i < 30; i++) {
    var startPos = 70;
    var startRad = rando(10) / 10;
    var endRad = rando(25) / 10;
    var x = rando(120);
    var z = rando(120);
    var color = `#${genColor(5)}`;
    var time = (rando(20) / 10);
    circles += `<circle cx="${startPos}" cy="${startPos}" r="${startRad}" fill="${color}">
    <animate attributeName="cy" values="${startPos}; ${z}; ${startPos};" begin="0s" dur="${time}s" repeatCount="0" />
    <animate attributeName="r" values="${startRad}; ${endRad}; ${startRad};" begin="0s" dur="${time}s" repeatCount="0" />
    <animate attributeName="cx" values="${startPos}; ${x}; ${startPos};" begin="0s" dur="${time}s" repeatCount="0" />
  </circle>`;
  }
  return circles;
}

async function celebrate() {
  for (var i = 0; i < 5; i++) {
    var balls = randomBalls();
    var sv = ele('div');
    attr(sv,'style','width: 300px; height: 300px;');
    document.body.appendChild(sv);
    sv.innerHTML = `<svg>${balls}</svg>`;
    await delay(1900);
    sv.outerHTML = '';
  }
}
celebrate()

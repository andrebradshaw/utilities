var rando = (n) => Math.round(Math.random() * n);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);

function genColor(n) {
  var s = '';
  var chars = '1e043579bd';
  for (var i = 0; i <= n; i++) {
    s += chars[rando(9)];
  }
  return s;
}

function randomBalls() {
  var circles = '';
  for (var i = 0; i < 30; i++) {
    var startPos = 30;
    var startRad = rando(10) / 10;
    var endRad = rando(25) / 10;
    var x = rando(60);
    var z = rando(100);
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
  var balls = randomBalls();
  var sv = ele('div');
  document.body.appendChild(sv);
  sv.innerHTML = `<svg>${balls}</svg>`;
  await delay(2000);
  sv.outerHTML = '';
}
celebrate()

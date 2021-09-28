function createSnakeGame() {
  const ele = (t) => document.createElement(t);
  const attr = (o, k, v) => o.setAttribute(k, v);
  const reChar = (s) => typeof s == 'string' && s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el => [el, String.fromCharCode(/d+/.exec(el)[0])]).map(m => s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;
  const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
  if(document.getElementById('snake_game_canvas')) document.getElementById('snake_game_canvas').outerHTML = '';
  function topZIndexer() {
    let n = new Date().getTime() / 1000000;
    let r = (n - Math.floor(n)) * 100000;
    return (Math.ceil(n + r) * 10);
  }

  function inlineStyler(elm, css) {
    Object.entries(JSON.parse(
      css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g, '"')
      .replace(/(?<=:\s*.+?);/g, '",')
      .replace(/[a-zA-Z-]+(?=:)/g, k => k.replace(/^\b/, '"').replace(/\b$/, '"'))
      .replace(/\s*,\s*}/g, '}')
    )).forEach(kv => {
      elm.style[kv[0]] = kv[1]
    });
  }
  var canvax = Math.floor(window.innerHeight * 0.8);
  var canvas = ele('canvas');
  a(canvas, [
    ['id', 'snake_game_canvas'],
    ['height', `${canvax}px`],
    ['width', `${canvax}px`]
  ]);
  inlineStyler(canvas, `{position: fixed; top: 10px; left: 10px; z-index: ${topZIndexer()};}`);
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var interval_unit = 200;
  var refreshIntervalId = setInterval(()=> {startGame();}, interval_unit);
  document.onkeydown = steering;
console.log(Math.floor(canvax/30))
  var grid = Math.floor(canvax/30),
    tile = Math.floor(canvax/30),
    posy = 10,
    posx = 10,
    ysv = 0,
    xsv = 0,
    fruitx = 15,
    fruity = 15,
    tail = 5;
  var trailing = [];

  function placeNewFruit() {
    let next_x = Math.floor(Math.random() * tile)
    let next_y = Math.floor(Math.random() * tile)
  }

  function startGame() {
    posx += xsv;
    posy += ysv;
    if (posx < 0) {      posx = tile - 1    }
    if (posx > tile - 1) {      posx = 0    }
    if (posy < 0) {      posy = tile - 1    }
    if (posy > tile - 1) {      posy = 0    }
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'yellow';
    for (let i = 0; i < trailing.length; i++) {
      ctx.fillRect((trailing[i].x * grid), (trailing[i].y * grid), (grid - 2), (grid - 2));
      if (trailing[i].x == posx && posy == trailing[i].y) { tail = 5; interval_unit = 200; }
    }
    trailing.push({        x: posx,        y: posy      });
    while (trailing.length > tail) {        trailing.shift();      }
    delayedFruitMove();
  }
  var delay = (ms) => new Promise(res => setTimeout(res, ms));

  async function delayedFruitMove(){
      if (fruitx == posx && posy == fruity) {
        await delay(interval_unit)
        tail++;
        clearInterval(refreshIntervalId);
        interval_unit = interval_unit > 40 && tail > 5 ? interval_unit - tail : tail == 5 ? 200 : interval_unit;
        /* fruit = placeNewApple() */
        console.log(interval_unit)
        refreshIntervalId = setInterval(()=> {startGame();}, interval_unit);
        fruitx = Math.floor(Math.random() * tile);
        fruity = Math.floor(Math.random() * tile);
      }
      ctx.fillStyle = 'red';
      ctx.fillRect(fruitx * grid, fruity * grid, grid - 2, grid - 2);
  }
  function steering(e) {
    let k = e.keyCode;
    if (k == 37) {      xsv = -1;      ysv = 0    }
    if (k == 38) {      xsv = 0;      ysv = -1    }
    if (k == 39) {      xsv = 1;      ysv = 0    }
    if (k == 40) {      xsv = 0;      ysv = 1    }
  }
}
createSnakeGame()

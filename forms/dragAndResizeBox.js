var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : null;
var tn = (o, s) => o ? o.getElementsByTagName(s) : null;
var gi = (o, s) => o ? o.getElementById(s) : null;
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

function dragElement() {
  var el = this.parentElement;

  var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;

  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
    el.style.opacity = "0.85";
    el.style.transition = "opacity 700ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }
}

function adjustHorizontal(){
  var el = this.parentElement.parentElement;
  var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
  var width = parseFloat(el.style.width.replace(/px/,''));
  console.log(width);
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;


  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {

    var ref = gi(document,'main_body_');
    el.style.width = width - (pos3 - e.clientX) + 'px';
    ref.style.width = width - (pos3 - e.clientX) + 'px';
    var rect = ref.getBoundingClientRect();
    var edge = 1;
    a(ref,[['style',`display: grid; grid-template-columns: ${edge}px ${(rect.width - (edge*2))}px ${edge}px;`]]);
    el.style.opacity = "0.85";
    el.style.transition = "opacity 700ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }

  function updateGrid(ref){


  }
}



var svgs = {
    close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
}; 

function testHTML(){
  if(gi(document,'test_container')) gi(document,'test_container').outerHTML = '';

  var cont = ele('div');
  a(cont,[['id','test_container'],['style', `position: fixed; top: 100px; left: 100px; z-index: ${new Date().getTime()}; width: 500px; border: 1px solid #0a1114; border-radius: 0.45em; background: #FFF;`]]);
  document.body.appendChild(cont);

  var head = ele('div');
  a(head, [['style', `display: grid; grid-template-columns: 1fr 29px; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var txt = ele('div');
  a(txt, [['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; color: #fff; text-align: center;`]]);
  head.appendChild(txt);
  txt.innerText = 'Test Header';

  var cls = ele('div');
  a(cls, [['style', `width: 27px; height: 27px; cursor: pointer;`]]);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onclick = () => cont.outerHTML = '';

  var cont_rect = cont.getBoundingClientRect();
  var edge = 1;

  var mainbod = ele('div');
  a(mainbod,[['id','main_body_'],['style',`display: grid; grid-template-columns: ${edge}px ${(cont_rect.width - (edge*2))}px ${edge}px;`]]);
  cont.appendChild(mainbod);

  var leftedge = ele('div');
  a(leftedge,[['style',`background: #43de6d; cursor: e-resize;`]]);
  mainbod.appendChild(leftedge);
  leftedge.onmouseover = adjustHorizontal;
  
  var cbod = ele('div');
  a(cbod,[['style',`background: #c1c1d1;`]]);
  mainbod.appendChild(cbod);
  cbod.innerHTML = `TESTING<br>one<br>two<br>three<br>four`;

  var rightedge = ele('div');
  a(rightedge,[['style',`background: #43de6d; cursor: e-resize;`]]);
  mainbod.appendChild(rightedge);
  rightedge.onmouseover = adjustHorizontal;
  
  
}

testHTML()

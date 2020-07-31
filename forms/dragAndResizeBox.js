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

function adjustElementSize(){
  var cont = this.parentElement.parentElement.parentElement;
  var main = this.parentElement.parentElement;
  var cbod = gi(document,'content_body_');
  var foot = this.parentElement;
  var head_height = cont.firstChild.getBoundingClientRect().height;
  var foot_height = foot.getBoundingClientRect().height;

  var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
  var width = parseFloat(cont.style.width.replace(/px/,''));
  var height = parseFloat(cont.getBoundingClientRect().height);
  
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;


  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    cont.style.width = width - (pos3 - e.clientX) + 'px';
    main.style.width = width - (pos3 - e.clientX) + 'px';

    cont.style.height = height - (pos4 - e.clientY) + 'px';
    main.style.height = height - (pos4 - e.clientY) + 'px';
    cbod.style.height = (height - (pos4 - e.clientY))-(head_height+foot_height) + 'px';

    var rect = main.getBoundingClientRect();
    var edge = 15;
    cbod.style.height = `${(height - (pos4 - e.clientY))-(head_height+foot_height)}px`;
    cbod.style.width = `${(width - (pos3 - e.clientX))-(head_height+foot_height)}px;`;

    a(foot, [['style', `display: grid; grid-template-columns: ${(rect.width - (edge+3))}px ${edge}px; background: #0a1114; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; height: ${edge+4}px;`]]);
    cont.style.opacity = "0.85";
    cont.style.transition = "opacity 700ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    cont.style.opacity = "1";
  }

}



var svgs = {
    close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
    resize: `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000.000000 1000.000000" version="1.0">
<g stroke="none" fill="#43de6d" transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
<path d="M9235 9969 c-31 -17 -9164 -9151 -9181 -9181 -8 -15 -14 -49 -14 -76 0 -38 6 -57 29 -88 34 -46 535 -544 571 -568 28 -18 110 -22 143 -5 31 16 9165 9148 9183 9181 8 15 14 49 14 76 0 38 -6 57 -29 88 -34 46 -535 544 -571 568 -28 18 -114 21 -145 5z"/>
<path d="M5923 4093 c-1911 -1908 -3479 -3476 -3484 -3485 -5 -9 -9 -38 -9 -64 l0 -48 228 -228 228 -228 53 0 53 0 3478 3472 c1914 1909 3482 3478 3485 3485 3 8 5 35 5 61 l0 46 -228 228 -228 228 -53 0 -53 0 -3475 -3467z"/>
<path d="M7042 2957 l-2442 -2442 0 -45 0 -45 213 -213 212 -212 45 0 45 0 2443 2443 2442 2442 0 45 0 45 -213 213 -212 212 -45 0 -45 0 -2443 -2443z"/>
<path d="M8088 1922 l-1478 -1477 0 -45 c0 -44 1 -45 178 -222 177 -178 178 -178 222 -178 l45 0 1472 1473 1473 1472 0 55 0 56 -173 172 c-172 171 -174 172 -218 172 l-44 0 -1477 -1478z"/>
</g>
</svg>`,
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
  a(cls, [['style', `width: 29px; height: 29px; cursor: pointer;`]]);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onclick = () => cont.outerHTML = '';

  var cont_rect = cont.getBoundingClientRect();
  var edge = 15;

  var mainbod = ele('div');
  a(mainbod,[['id','main_body_']]);
  cont.appendChild(mainbod);

  var cbod = ele('div');
  a(cbod,[['id','content_body_'],['style',`background: #c1c1d1; padding: 8px;`]]);
  mainbod.appendChild(cbod);
  cbod.innerHTML = `This element would be where you would house the entirety of your content. <br>Changing any other elements would cause the resizing to break.`;
  
  var footer = ele('div');
  a(footer, [['style', `display: grid; grid-template-columns: ${(cont_rect.width - (edge+3))}px ${edge}px; background: #0a1114; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; height: ${edge+4}px;`]]);
  mainbod.appendChild(footer);
  
  var footertext = ele('div');
  footer.appendChild(footertext);
  
  var resizer = ele('div');
  a(resizer, [['style', `background: transparent; cursor: nw-resize; text-align: left; border-radius: 0.4em;`]]);
  footer.appendChild(resizer);
  resizer.innerHTML = svgs.resize;
  resizer.onmouseover = adjustElementSize;
}

testHTML()

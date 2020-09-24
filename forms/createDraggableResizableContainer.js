var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : null;
var tn = (o, s) => o ? o.getElementsByTagName(s) : null;
var gi = (o, s) => o ? o.getElementById(s) : null;
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 533ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 333ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 133ms";
}

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
  var cbod = main.firstChild;
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
    cbod.style.height = width - (pos3 - e.clientX) + 'px';
    cont.style.height = height - (pos4 - e.clientY) + 'px';
    main.style.height = height - (pos4 - e.clientY) + 'px';
    cbod.style.height = (height - (pos4 - e.clientY)) - (head_height+foot_height) + 'px';
    var rect = main.getBoundingClientRect();
    var edge = 15;
    cbod.style.height = `${(height - (pos4 - e.clientY))-(head_height+foot_height)}px`;
    cbod.style.width = `${(width - (pos3 - e.clientX))-(head_height+foot_height)}px;`;
    a(foot, [['style', `display: grid; grid-template-columns: ${(rect.width - (edge+4))}px ${edge}px; background: #0a1114; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; height: ${edge+4}px;`]]);
    cont.style.opacity = '0.75';
    cont.style.transition = 'opacity 200ms';
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    cont.style.opacity = '1';
  }

}



var svgs = {
    close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
    resize: `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000.000000 1000.000000" version="1.0">
<g stroke="none" fill="#43de6d" transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
<path d="M9235 9969 c-31 -17 -9164 -9151 -9181 -9181 -8 -15 -14 -49 -14 -76 0 -38 6 -57 29 -88 34 -46 535 -544 571 -568 28 -18 110 -22 143 -5 31 16 9165 9148 9183 9181 8 15 14 49 14 76 0 38 -6 57 -29 88 -34 46 -535 544 -571 568 -28 18 -114 21 -145 5z"/>
<path d="M5923 4093 c-1911 -1908 -3479 -3476 -3484 -3485 -5 -9 -9 -38 -9 -64 l0 -48 228 -228 228 -228 53 0 53 0 3478 3472 c1914 1909 3482 3478 3485 3485 3 8 5 35 5 61 l0 46 -228 228 -228 228 -53 0 -53 0 -3475 -3467z"/>
<path d="M7042 2957 l-2442 -2442 0 -45 0 -45 213 -213 212 -212 45 0 45 0 2443 2443 2442 2442 0 45 0 45 -213 213 -212 212 -45 0 -45 0 -2443 -2443z"/>
<path d="M8088 1922 l-1478 -1477 0 -45 c0 -44 1 -45 178 -222 177 -178 178 -178 222 -178 l45 0 1472 1473 1473 1472 0 55 0 56 -173 172 c-172 171 -174 172 -218 172 l-44 0 -1477 -1478z"/>
</g>
</svg>`,
    resize_hover: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)" fill="#43de6d" stroke="none">
<path d="M5318 4622 l-3798 -3797 0 -59 0 -60 312 -314 c172 -172 325 -320 340 -328 15 -8 49 -14 75 -14 l48 0 3797 3798 3798 3797 0 59 0 60 -312 314 c-172 172 -325 320 -340 328 -15 8 -49 14 -75 14 l-48 0 -3797 -3798z"/>
<path d="M6763 3147 l-2483 -2482 0 -50 0 -49 268 -268 268 -268 49 0 50 0 2482 2483 2483 2482 0 50 0 49 -268 268 -268 268 -49 0 -50 0 -2482 -2483z"/>
<path d="M8058 1902 l-1268 -1267 0 -50 0 -50 248 -247 247 -248 50 0 50 0 1267 1268 1268 1267 0 50 0 50 -248 247 -247 248 -50 0 -50 0 -1267 -1268z"/>
</g>
</svg>`,
}; 

function createDraggableResizableContainer(edit) {
    const {
      main_cont_id,
      cbod_bg_color,
      head_text,
      width,
      left,
      top,
      height,
    } = edit;
    if (gi(document, main_cont_id)) gi(document, main_cont_id).outerHTML = '';

    let cont = ele('div');
    a(cont, [
      ['dragme', 'true'],
      ['id', main_cont_id],
      ['style', `position: fixed; top: ${top}px; left: ${left}px; z-index: ${new Date().getTime()}; max-height: ${height}px; width: ${width}px; border: 1px solid #0a1114; border-radius: 0.45em; background: #0a1114; font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;`]
    ]); //"Lucida Console", Monaco, monospace
    document.body.appendChild(cont);
  
    let head = ele('div');
    a(head, [
      ['id',main_cont_id+'_head'],['style', `display: grid; grid-template-columns: 1fr 29px; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]
    ]);
    cont.appendChild(head);
    head.onmouseover = dragElement;
  
    let txt = ele('div');
    a(txt, [
      ['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; color: #fff; text-align: center;`]
    ]);
    head.appendChild(txt);
    txt.innerText = head_text;
  
    let cls = ele('div');
    a(cls, [
      ['style', `cursor: pointer;`]
    ]);
    head.appendChild(cls);
    cls.innerHTML = svgs.close;
    cls.onclick = () => cont.outerHTML = '';
    cls.onmouseenter = aninCloseBtn;
    cls.onmouseleave = anoutCloseBtn;
  
    let cont_rect = cont.getBoundingClientRect();
    let edge = 15;
  
    let mainbod = ele('div');
    cont.appendChild(mainbod);
  
    let cbod = ele('div');
    a(cbod, [
      ['id',main_cont_id+'_body'],['style', `background: ${cbod_bg_color}; padding: 8px; overflow-y: auto;`]
    ]);
    mainbod.appendChild(cbod);
  
    let footer = ele('div');
    a(footer, [
      ['dragme', 'true'],
      ['style', `display: grid; grid-template-columns: ${(cont_rect.width - (edge+4))}px ${edge}px; background: #0a1114; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; height: ${edge+4}px;`]
    ]);
    mainbod.appendChild(footer);
  
    let footertext = ele('div');
    footer.appendChild(footertext);
  
    let resizer = ele('div');
    a(resizer, [
      ['style', `background: transparent; cursor: nw-resize; text-align: left; border-radius: 0.4em;`]
    ]);
    footer.appendChild(resizer);
    resizer.innerHTML = svgs.resize_hover;
    resizer.onmouseover = adjustElementSize;
    return cbod;
  }
  
 
  function createForm(){
    let cont_obj = {
      main_cont_id: 'ID_HERE',
      cbod_bg_color: '#f5f5f2',
      head_text: 'HEADER TEXT HERE',
      width: window.innerWidth > 799 ? window.innerWidth * 0.6 : window.innerWidth * 0.8,
      left: (window.innerWidth - (window.innerWidth > 799 ? window.innerWidth * 0.6 : window.innerWidth * 0.8)) * 0.5,
      top: 80,
      height: (window.innerHeight * 0.8),
    };
    let ref = createDraggableResizableContainer(cont_obj);
  }
createForm()

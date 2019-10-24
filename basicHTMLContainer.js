var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

  function dragElement() {
    var el = this;
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    this.onmousedown = dragMouseDown;

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

  function aninCloseBtn() {
    var l1 = tn(this, 'path')[0];
    var l2 = tn(this, 'path')[1];
    l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
    l1.style.transition = "all 233ms";
    l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
    l2.style.transition = "all 233ms";
  }

  function anoutCloseBtn() {
    var l1 = tn(this, 'path')[0];
    var l2 = tn(this, 'path')[1];
    l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
    l1.style.transition = "all 233ms";
    l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
    l2.style.transition = "all 233ms";
  }

function createHTMLContainer(cont_id,parent,rect){
    if (gi(document, cont_id)) gi(document, cont_id).outerHTML = '';
    var cont = ele('div');
    attr(cont, 'id', cont_id);
    attr(cont, 'style', `position: fixed; top: 60px; left: 60px; width: ${rect.width * 0.8}px; ${rect.height * 0.8}px; z-index: ${new Date().getTime()};`);
    parent.appendChild(cont);

    var head = ele('div');
    attr(head, 'id', cont_id+'_head');
    attr(head, 'style', `display: grid; grid-template-columns: ${(rect.width * 0.8) - 45}px 45px ; background: rgb(0, 119, 181); border: 1px solid #283e4a; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`);
    cont.appendChild(head);
    head.onmouseover = dragElement;

    var htext = ele('div');
    attr(htext, 'style', `grid-area: 1/1; padding: 1px; color: #fff;`);
    htext.innerText = 'loading profile...';
    head.appendChild(htext);

    var cls = ele('div');
    attr(cls, 'style', `grid-area: 1/2; width: 45px; height: 45px; cursor: pointer;`);
    cls.innerHTML = `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`;
    head.appendChild(cls);
    cls.onmouseenter = aninCloseBtn;
    cls.onmouseleave = anoutCloseBtn;
    cls.onclick = () => {
      gi(document, cont_id).outerHTML = '';
    };

    var cbod = ele('div');
    attr(cbod, 'style', `background: #fff; border: 1px solid #283e4a; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; padding: 1px; overflow-y: auto; padding: 20px;`);
    cont.appendChild(cbod);
}

createHTMLContainer('test_test',document.body,{width: 600, height: 600, top: 0, left: 0});

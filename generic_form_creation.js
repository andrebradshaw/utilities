var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : [];
var tn = (o, s) => o ? o.getElementsByTagName(s) : [];
var gi = (o, s) => o ? o.getElementById(s) : null;

var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

function dragElement() {
  var el = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
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


var svgs = {
  close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
};

function createHTMLBox(){
  if(gi(document,'test_box_container')) gi(document,'test_box_container').outerHTML = '';

  var cont = ele('div');
  document.body.appendChild(cont);
  a(cont, [['id','test_box_container'],['style',`position: fixed; top: 10px; left: 10px; z-index: ${new Date().getTime()}; width: 400px; height: 300px;`]]);

  var head = ele('div');
  cont.appendChild(head);
  a(head,[['style',`display: grid; grid-template-columns: 1fr 32px; grid-gap: 5px; background-color: #1c1c1c; color: #fff; cursor: move; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; `]]);
  head.onmouseenter = dragElement;
 
  var txt = ele('div');
  head.appendChild(txt);
  a(txt,[['style', 'padding: 8px;']]);
  txt.innerText = 'Test Container';

  var cls = ele('div');
  head.appendChild(cls);
  a(cls, [['style',`cursor: pointer;`]]);
  cls.innerHTML = svgs.close;
  cls.onclick = ()=> {cont.outerHTML = ''};  
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;

  var cbod = ele('div');
  cont.appendChild(cbod);
  a(cbod, [['style',`display: grid; grid-templete-rows: auto; grid-gap: 4px; background-color: #7c7c7c; padding: 8px;`]]);
  addHTMLinputFields(cbod);
  
  var send = ele('div');
  a(send,[['style',`background-color: #004471; color: #fff; padding: 8px; text-align: center; border-radius: 0.4em; width: 100px; transform: translate(${(((400-16)-100) *0.5)}px, 0px); cursor: pointer;`]]);
  cbod.appendChild(send);
  send.innerText = 'Send Form';
  send.onclick = sendFormData;
}
createHTMLBox()

function addHTMLinputFields(ref){
  var inputs = ['First Name', 'Last Name', 'Phone Number', 'Email'];
  inputs.forEach(i=> {
    var inp = ele('input');
    ref.appendChild(inp);
    a(inp, [['class','form_inputs'],['placeholder',i],['style',`width: 100%; display: grid; grid-templete-rows: auto; grid-gap: 4px; border: 1px solid #7c7c7c; border-radius: 0.4em; padding: 8px;`]]);
  });
}

function sendFormData(){
  var inputs = Array.from(cn(document,'form_inputs')).map(v=> {return [v.getAttribute('placeholder'), v.value]});
  var phone = inputs.filter(r=> r[0] == 'Phone Number')[0];
  var email = inputs.filter(r=> r[0] == 'Email')[0];

  var px = /\b[2-9]\d{2}\){0,1}\W{0,1}\d{3}\W{0,1}\d{4}\b/;
  var ex = /\b[\w\.\-\+]+@[\w\-]+\.[a-zA-Z]{2,13}(\.[a-zA-Z]{2,13}|\b)/;

  if(px.test(phone[1])){
    console.log('saving phone');
  }else{
    alert('yo dawg. please enter a valid phone number.')
  }
  
  if(ex.test(email[1])){
    console.log('saving email');
  }else{
    alert('yo dawg. please enter a valid email.')
  }
  
}

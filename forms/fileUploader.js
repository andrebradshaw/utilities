
    var reg = (o, n) => o ? o[n] : '';
    var cn = (o, s) => o ? o.getElementsByClassName(s) : null;
    var tn = (o, s) => o ? o.getElementsByTagName(s) : null;
    var gi = (o, s) => o ? o.getElementById(s) : null;
    var rando = (n) => Math.round(Math.random() * n);
    var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
    var delay = (ms) => new Promise(res => setTimeout(res, ms));
    var ele = (t) => document.createElement(t);
    var attr = (o, k, v) => o.setAttribute(k, v);
    var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
    
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


var svgs = {
    close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
}; 

function createUploadHTML(){
  if(gi(document,'test_container')) gi(document,'test_container').outerHTML = '';

  var cont = ele('div');
  a(cont,[['id','test_container'],['style', `position: fixed; top: 100px; left: 100px; z-index: ${new Date().getTime()}; width: 500px; border: 1px solid #0a1114; border-radius: 0.45em; background: #FFF;`]]);
  document.body.appendChild(cont);

  var head = ele('div');
  a(head, [['style', `display: grid; grid-template-columns: 1fr 29px; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]  ]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var txt = ele('div');
  a(txt, [['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; color: #fff; text-align: center;`]]);
  head.appendChild(txt);
  txt.innerText = 'Upload Up to 20 Resumes';

  var cls = ele('div');
  a(cls, [['style', `width: 27px; height: 27px; cursor: pointer;`]]);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onclick = () => cont.outerHTML = '';

  var cbod = ele('div');
  a(cbod,[['style',`max-height: 440px; overflow-y: auto;`]]);
  cont.appendChild(cbod);
     var uploadElm = ele('input');
    a(uploadElm, [['id', 'customFileInput'],['type', 'file'],['name', 'file[]']]);
    attr(uploadElm, "multiple", "true");
    popCont.appendChild(uploadElm);
//    uploadElm.style.transform = 'scale(1.1, 1.1) translate(5%, 80%)';
    uploadElm.addEventListener("change", handleFiles);

}


//   function createUploadHTML() {
//     if (gi(document, 'pop_FileUploader')) gi(document, 'pop_FileUploader').outerHTML = '';
//     //var rect = this.getBoundingClientRect();
//     var rect = {top: 100, bottom: 110, left: 100};
//     var popCont = ele('div');
//     document.body.appendChild(popCont);
//     a(popCont, [['id', 'pop_FileUploader'],['style', `position: fixed; top: ${rect.bottom}px; left: ${rect.left}; width: 280px; height: 100px; background: #f1f1f1; border: 1px solid #616161; border-radius: 0.4em; padding: 6px; z-index: ${new Date().getTime()};`]]);

//     var closeBtn = ele('div');
//     a(closeBtn, [['id', 'note_btn_close'],['style', `background: transparent; width: 30px; height: 30px; border-radius: 1em; cursor: pointer; float: right;`]]);
//     popCont.appendChild(closeBtn);
//     closeBtn.innerHTML = '<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>';
//     closeBtn.onclick = ()=> popCont.outerHTML = '';
//     closeBtn.onmouseenter = aninCloseBtn;
//     closeBtn.onmouseleave = anoutCloseBtn;

//     var uploadElm = ele('input');
//     a(uploadElm, [['id', 'customFileInput'],['type', 'file'],['name', 'file[]']]);
//     attr(uploadElm, "multiple", "true");
//     popCont.appendChild(uploadElm);
// //    uploadElm.style.transform = 'scale(1.1, 1.1) translate(5%, 80%)';
//     uploadElm.addEventListener("change", handleFiles);

//   }

async function parseURI(d){
  var reader = new FileReader();
  reader.readAsDataURL(d);
  return new Promise(res=> reader.onload = (e) => res(e.target.result))
} 

async function handleFiles(){
  var files = this.files;
  var blob_arr = [];
  for(var i=0; i<files.length; i++){
    var uri = await parseURI(files[i]);
    blob_arr.push(uri);
  }
  console.log(blob_arr)
}
//     function createUploadResumeHTML(){
    
//     }

createUploadHTML()

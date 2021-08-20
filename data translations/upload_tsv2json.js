//   function tsv2JSON(){
//       const tsvfile = this.parentElement.getElementsByTagName('textarea')[0].value.trim();
//       const tsvTo2dArr = (tsv) => tsv.split(/[\r\n]+/).map(itm => itm.split(/\t/));
//       const table = tsvTo2dArr(tsvfile);
//       table.forEach(el=> {
//           let ob = {};
//           for(var i=0; i<table[0].length; i++){
//               let key = table[0][i]; //.toLowerCase().replace(/\W+/g,'_');
//               ob[key] = el[i];
//               header_keys.push(key);
//           }
//           json_arr.push(ob);
//       });
//       json_arr.shift();
//       identifyTargetKeysForEnrichment(header_keys,this.parentElement);
//   }//tsv2JSON

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
function createLoadingLines(len){
  var html_ = `<svg version="1.1" x="0px" y="0px" width="500px" height="200px" style="enable-background:new 0 0 50 50;">`;
  for(var i=0; i<len; i=i+0.14){
    html_ = html_ + `<rect x="${(i*120)}" y="18" width="16" height="80" fill="rgb(0, ${Math.ceil(181-(i*80))}, 112)" opacity="0.0">
      <animate attributeName="opacity" values="0.0; 0.3; 1; 0.3; 0.0" begin="${i}s" dur="0.96s" repeatCount="indefinite" />
      <animate attributeName="height" values="80; 106; 80" begin="${i}s" dur="0.96s" repeatCount="indefinite" />
      <animate attributeName="y" values="18; 5; 18" begin="${i}s" dur="0.96s" repeatCount="indefinite" />
      <animate attributeName="fill" values="rgb(0, ${Math.ceil(181-(i*80))}, 112); rgb(0, 181, 112); rgb(0, ${Math.ceil(181-(i*80))}, 112);" begin="0s" dur="0.96s" repeatCount="indefinite" />
    </rect>`
  }
  return html_ + '</svg>';
}
function loadingElm(ref) {
  if(document.getElementById('loading_element')) document.getElementById('loading_element').outerHTML = '';
  var rect = ref.getBoundingClientRect();
  var loaD = ele('div');
  a(loaD,[['id', 'loading_element'],['style',`position: fixed;  top: ${rect.top+25}px; left: ${rect.left+5}px; z-index: ${new Date().getTime()};`]]);
  document.body.appendChild(loaD);
  loaD.innerHTML = createLoadingLines(1);
}
function killLoader(){if(document.getElementById('loading_element')) document.getElementById('loading_element').outerHTML = '';}

function createUploadHTML(){
  var cont_id = 'upload_container';
  if(gi(document,cont_id)) gi(document,cont_id).outerHTML = '';
  var cont = ele('div');
  a(cont,[['id',cont_id],['style', `position: fixed; top: 200px; left: 120px; z-index: ${new Date().getTime()}; width: 300px; border: 1px solid #0a1114; border-radius: 0.45em; background: #FFF;`]]);
  document.body.appendChild(cont);

  var head = ele('div');
  a(head, [['style', `display: grid; grid-template-columns: 1fr 29px; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]  ]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var txt = ele('div');
  a(txt, [['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; color: #fff; text-align: center;`]]);
  head.appendChild(txt);
  txt.innerText = 'Upload CSV or TSV';

  var cls = ele('div');
  a(cls, [['style', `width: 27px; height: 27px; cursor: pointer;`]]);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = () => cont.outerHTML = '';

  var cbod = ele('div');
  a(cbod,[['style',`max-height: 440px; overflow-y: auto;`]]);
  cont.appendChild(cbod);

  var upload = ele('input');
  a(upload, [['id', 'customFileInput'],['type', 'file'],['name', 'file[]'],['multiple', 'true']]);
  cbod.appendChild(upload);
  upload.addEventListener("change", handleFiles);

}

function processTable(text,type){
    let x = type == 'tsv' ? /\t/ : /[,](?=(?:[^\"]|\"[^\"]*\")*$)/;
    let table = text.split(/[\r\n]+/).map(r=> r.split(x));
    var json_arr = [];
    table.forEach(el=> {
        let ob = {};
        for(var i=0; i<table[0].length; i++){
            var key = table[0][i].toLowerCase().replace(/\W+/g,'_');
            ob[key] = el[i];
        }
        json_arr.push(ob);
    });
    json_arr.shift();
    return json_arr;
}

async function handleFiles(){
  var files = this.files;
  var tables = [];
  for(var i=0; i<files.length; i++){
    let type = /\.tsv$/.test(files[i].name) ? 'tsv' : /\.csv$/.test(files[i].name) ? 'csv' : false;
    if(type){
        let t = await getAsText(files[i]);
        let arr = processTable(t,type);
        tables.push(arr);
    }else {
        console.log('file type not supported');
    }
    
  }
  console.log(tables[0])
}

async function getAsText(f) {
  var reader = new FileReader();
  reader.readAsText(f);
  let text_table = '';
  if(/\.tsv$|\.csv$/i.test(f.name)) return new Promise((res,rej)=> reader.onload = (e) => res(e.target.result) );
}


createUploadHTML()

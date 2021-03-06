var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var firstName = (s) => reg(/^\S+/.exec(s.replace(/\s*\(.+?\)\s*/g,'').trim()),0);
var lastName = (s) => reg(/\S+$/.exec(s.replace(/\s*\(.+?\)\s*/g,'').replace(/\W+$/,'').trim()),0);
var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

var unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));
function styleFromJson(jcss,elm){
  var styleArr = Object.entries(jcss);
  styleArr.forEach(s=> {
    var key = s[0].replace(/_\w/g, s=> s.charAt(1).toUpperCase());
    elm.style[key] = s[1];
  });
}

var svgs = {
    close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
};

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
  if(this.id == 'resume_head_dragable'){
    var el = this.parentElement.parentElement;
  }else{
    var el = this.parentElement;
  }
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

var cont_id = `pop_upload_container`;
function createUploadHTML(){

  if(gi(document,cont_id)) gi(document,cont_id).outerHTML = '';
  var rect = document.body.getBoundingClientRect();
  var cont = ele('div');
  a(cont,[['id',cont_id],['style', `padding: 0; position: fixed; top: ${rect.top+50}px; left: ${rect.left+1}px; z-index: ${new Date().getTime()}; width: 330px; border: 1px solid #004471; border-radius: 0.4em; background: #052533;`]]);
  document.body.appendChild(cont);

  var head = ele('div');
  a(head, [['style', `display: grid; grid-template-columns: 1fr 29px; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var txt = ele('div');
  a(txt, [['id',cont_id+'_headertext'],['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; padding: 4px;`]]);
  head.appendChild(txt);
  txt.innerText = 'Upload Files';

  var cls = ele('div');
  a(cls, [['style', `width: 27px; height: 27px; cursor: pointer;`]]);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = () => cont.outerHTML = '';

  var cbod = ele('div');
  a(cbod,[['id',cont_id+'_cbod'],['style',`max-height: ${window.innerHeight*.9}px; overflow-y: auto; color: #f1f1f1; padding: 8px;`]]);
  cont.appendChild(cbod);

  var uploadElm = ele("input");
  a(uploadElm, [['id', 'customFileInput'],['type', 'file'],['name','file[]'],['multiple','true']])
  cbod.appendChild(uploadElm);
  uploadElm.addEventListener("change", handleFiles);

}

createUploadHTML();

var fileArray = [];
var textFile = '';
var jsonArr = [];
var tableArr = [];

function tsv2JSON(tsvfile,obj){
  var tsvTo2dArr = (tsv) => tsv.split(/[\r\n]+/).map(itm => itm.split(/\t/));
  var table = tsvTo2dArr(tsvfile);
  table.forEach(el=> {
    var ob = {};
    for(var i=0; i<table[0].length; i++){
      var key = table[0][i].toLowerCase().replace(/^\W+/g,'').replace(/\W+/g,'_');
      ob[key] = el[i];
    }
    jsonArr.push(ob);
  });
  jsonArr.shift();
  console.log(jsonArr);
  if(obj.iteration == (obj.total-1)){
    createTableView(obj);
  }
}

var loadHandleJson = (e) => Array.isArray(JSON.parse(e.target.result)) ? JSON.parse(e.target.result).forEach(i=> fileArray.push(i)) : fileArray.push(JSON.parse(e.target.result));

var loadHandleTsv = (e) => tsv2JSON(e.target.result);

async function handleFiles() {
  var files = this.files;
  for(var i=0; i<files.length; i++){
    await getAsText(files[i],i,files.length);
  }
//   gi(document,cont_id).outerHTML = '';
}

async function getAsText(f,iteration,total) {
  var reader = new FileReader();
  reader.readAsText(f);
  if(/\.json/i.test(f.name))
    reader.onload = loadHandleJson;
  if(/\.tsv/i.test(f.name))
    reader.onload = (e) => {
      tsv2JSON(e.target.result,{iteration: iteration,total: total, filename: f.name});
    };
  return true;
}

function createTableView(obj){
  var header = unqHsh(jsonArr.map(r=> Object.entries(r).map(kv=> kv[0])).flat(),{});
  console.log(header);
  var cont = gi(document,cont_id);
  cont.style.width = `${window.innerWidth * .99}px`;
  gi(document,cont_id+'_headertext').innerText = obj.filename;
 
  var cbod = gi(document,cont_id+'_cbod');
  cbod.innerHTML = '';
  styleFromJson({display: 'grid', grid_template_columns: '1fr 1fr', grid_gap: '10px'},cbod);
  
  var searchPanel = ele('div');
  a(searchPanel,[['search_panel'],['style',`display: grid; grid-template-rows: auto; grid-gap: 10px;`]]);
  cbod.appendChild(searchPanel);
  
//   var left_p = ele('div')
  header.forEach(h=> {
    var itm = ele('div');
    a(itm,[['class','search_item'],['style',`display: grid; grid-template-columns: 22px 22px 1fr; grid-gap: 4px;`]]);
    searchPanel.appendChild(itm);
    
    var x1 = ele('div');
    x1.innerText = '-';
    itm.appendChild(x1);

    var x2 = ele('div');
    x2.innerText = '+';
    itm.appendChild(x2);

    var xinp = ele('input');
    a(xinp,[['placeholder',h],['style',`padding: 6px; border: 1px solid transparent; border-radius: 0.4em; `]]);
    itm.appendChild(xinp);

    
  })
}

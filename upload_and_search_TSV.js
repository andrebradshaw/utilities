var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);

var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

var matchAllregXarr = (t, x) => x.every(r => r.test(t));


var doc = document;

var popCont = ele("div");
doc.body.appendChild(popCont);
attr(popCont, 'style', `display: inline-block; width: 300px; height: 400px; position: fixed; top: 20%; left: 50%; background: transparent; border-radius: .15em; padding: 3px; z-index: 10000;`)

var head = ele('div');
popCont.appendChild(head);
doc.body.appendChild(popCont);
attr(head, 'style', `display: inline-block; width: 100%; background: lightgrey; border-radius: .15em; padding: 3px; z-index: 10000;`)

var closeBtn = ele("button");
attr(closeBtn, "id", "note_btn_close");
head.appendChild(closeBtn);
attr(closeBtn,'style',`background: transparent; display: inline-block; width: 22px; height: 22px; border-radius: 50%; transition: all 366ms; transition-timing-function: cubic-bezier(1,-1.12,.18,1.93); padding: 0px; boxShadow: 0px; border: 0px; cursor: pointer; userSelect: none; font-weight: bold; border: 3px solid Crimson;`);
closeBtn.addEventListener("click", close);

var uploadElm = ele("input");
attr( uploadElm, "id", "customFileInput" );
attr( uploadElm, "type", "file" );
popCont.appendChild(uploadElm);
uploadElm.style.transform = "scale(1.1, 1.1) translate(5%, 80%)";
uploadElm.addEventListener("change", handleFiles);

function close() {
  popCont.outerHTML = '';
}

var jdat_file = '';


function handleFiles() {
  window.FileReader ? getAsText(this.files[0]) : alert('FileReader are not supported in this browser.');
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  reader.readAsText(fileToRead);
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

function loadHandler(event) {
  jdat_file = JSON.parse(event.target.result);
  close();
}

function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") alert("Canno't read file !");
}


var matchAllregXarr = (t, x) => x.every(r => r.test(t));
var parseIfNum = (s)=> /^[\d+|$|\.|,|-]+$/.test(s) && /\d-\d/.test(s) === false ? parseFloat(s.replace(/\$|\,/)) : s;

function parseAsRegexArr(bool) {
  var checkSimpleOR = (s) => /\bor\b/i.test(s) && /\(/.test(s) === false;
  if (checkSimpleOR(bool)) {
    var x = new RegExp(bool.replace(/\s+OR\s+|\s*\|\s*/g, '|').replace(/\//g, '\\/').replace(/"/g, '\\b').replace(/\s+/g, '.{0,14}'), 'i');
    var xArr = [x];
    return xArr;
  } else {
    var orx = "\\(.+?\\)|(\\(\\w+\\s{0,1}OR\\s|\\w+\\s{0,1}OR\\s)+((\\w+\s)+?|(\\w+)\\)+)+?";
    var rxReady = (s) => s ? s.replace(/"/g, '\\b').trim().replace(/\)/g, '').replace(/\(/g, '').replace(/\s+/g, '.{0,14}').replace(/\//g, '\\/').replace(/\+/g, '\\+') : s;
    var orMatch = bool ? bool.match(new RegExp(orx, 'g')) : [];
    var orArr = orMatch ? orMatch.map(b => rxReady(b.replace(/\s+OR\s+|\s*\|\s*/gi, '|'))) : [];
    var noOrs = bool ? bool.replace(new RegExp(orx, 'g'), '').split(/\s+[AND\s+]+/i) : bool;
    var ands = noOrs ? noOrs.map(a => rxReady(a)) : [];
    var xArr = ands.concat(orArr).filter(i => i != '').map(x => new RegExp(x, 'i'));
    return xArr;
  }
}

function tsv2array(){
  var rows = jdat_file.split(/\n/);
  var table = rows.map(i=> i.split(/\t/).map(n=> parseIfNum(n)));
  return table;
}

var filterTableByCol = (t,n,x) => t.filter(el=> matchAllregXarr(el[n],x));

function runFilters(targ, search){
  var table = tsv2array();
  var header = table[0];
  var temp = [];
  temp.push(header);
  var targI = header.indexOf(targ);
  
  var x = parseAsRegexArr(search);

  var res = filterTableByCol(table,targI,x);
  res.forEach(el=> temp.push(el));

  console.log(temp);

}

// runFilters('University 1', 'UCLA Extension OR Santa Barbara');

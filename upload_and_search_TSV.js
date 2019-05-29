var el = (tag) => document.createElement(tag);
var ap2 = (p,c) => p.appendChild(c);
var attr = (elm,arr) => elm.setAttribute(arr[0], arr[1]);
var doc = document;


var popCont = el("div");
ap2(doc.body,popCont);
attr( popCont, ["id", "pop_FileUploader"] );

popCont.style.display = "inline-block";
popCont.style.position = "fixed";
popCont.style.top = "20%";
popCont.style.left = "50%";
popCont.style.width = "20%";
popCont.style.height = "11%";
popCont.style.background = "lightgrey";
popCont.style.borderRadius = "1em";
popCont.style.padding = "3px";
popCont.style.zIndex = "10000";
popCont.style.fontFamily = '"Courier New", monospace';

var closeBtn = el("button");
attr( closeBtn, ["id", "note_btn_close"] );
ap2( popCont, closeBtn );
closeBtn.innerText = "+";
closeBtn.style.position = "absolute";
closeBtn.style.background = "transparent";
closeBtn.style.display = "inline-block";
closeBtn.style.width = "1%";
closeBtn.style.height = "2%";
closeBtn.style.transform = "scale(4.5, 4.5) translate(3px, -6px) rotate(45deg)";
closeBtn.style.borderRadius = "1em";
closeBtn.style.transition = "all 366ms";
closeBtn.style.transitionTimingFunction = "cubic-bezier(1,-1.12,.18,1.93)";
closeBtn.style.padding = "0px";
closeBtn.style.boxShadow = "0px";
closeBtn.style.border = "0px";
closeBtn.style.cursor = "pointer";
closeBtn.style.userSelect = "none";
closeBtn.style.fontFamily = '"Courier New", monospace';
closeBtn.style.fontWeight = "bold";
closeBtn.style.color = "Crimson";
closeBtn.addEventListener("click", close);

var uploadElm = el("input");
attr( uploadElm, ["id", "customFileInput"] );
attr( uploadElm, ["type", "file"] );
ap2(popCont,uploadElm);
uploadElm.style.transform = "scale(1.1, 1.1) translate(5%, 80%)";
uploadElm.addEventListener("change", handleFiles);

function close() {
  document.body.removeChild(popCont);
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
  jdat_file = event.target.result;
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

runFilters('University 1', 'UCLA Extension OR Santa Barbara');

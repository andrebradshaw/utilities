var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);

var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

var matchAllregXarr = (t, x) => x.every(r => r.test(t));

var doc = document;

var jdat_file = '';

function createUploadHTML(){
  if(gi(doc,'uploader_container')) gi(doc,'uploader_container').outerHTML = '';

  var popCont = ele("div");
  doc.body.appendChild(popCont);
  attr(popCont,'id','uploader_container');
  attr(popCont, 'style', `display: inline-block; width: 300px; height: 400px; position: fixed; top: 20%; left: 50%; background: transparent; border-radius: .15em; padding: 3px; z-index: 10000;`);

  var head = ele('div');
  popCont.appendChild(head);
  doc.body.appendChild(popCont);
  attr(head, 'id', 'tsv_main_top_header');
  attr(head, 'style', `display: inline-block; width: 100%; background: #004471; border-radius: .15em; padding: 3px;`);
  
  var closeBtn = ele("button");
  attr(closeBtn, "id", "note_btn_close");
  head.appendChild(closeBtn);
  attr(closeBtn,'style',`background: transparent; display: inline-block; width: 22px; height: 22px; border-radius: 50%; transition: all 366ms; transition-timing-function: cubic-bezier(1,-1.12,.18,1.93); padding: 0px; border: 0px; cursor: pointer; user-select: none; font-weight: bold; border: 3px solid Crimson;`);
  closeBtn.addEventListener("click", close);

  var cont = ele('div');
  popCont.appendChild(cont);
  attr(cont, 'id', 'tsv_contBody');
  attr(cont, 'style', `display: inline-block; width: 100%; height: 40%; background: #fff; border: 1px dotted #004471; order-radius: .15em; padding: 3px;`);

  var uploadElm = ele("input");
  attr( uploadElm, "id", "customFileInput" );
  attr( uploadElm, "type", "file" );
  cont.appendChild(uploadElm);
  uploadElm.style.transform = "scale(1.1, 1.1) translate(5%, 80%)";
  uploadElm.addEventListener("change", handleFiles);

}

function close() {
  gi(doc,'uploader_container').outerHTML = '';
}

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
  createSearchView();
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
var colByIndex = (t,i) => t.map(el=> el[i]);

function runFilters(table, targ, search){
  var header = table[0];
  var temp = [];
  temp.push(header);
  var targI = header.indexOf(targ);
  
  var x = parseAsRegexArr(search);

  var res = filterTableByCol(table,targI,x);
  res.forEach(el=> temp.push(el));
  console.log(temp);
  return temp;
}

createUploadHTML()


// runFilters('University 1', 'UCLA Extension OR Santa Barbara');

function createSearchView(){
  var table = tsv2array();
  var header = table[0];

  var par = gi(doc,'uploader_container');
  attr(par, 'style', `display: inline-block; max-width: 80%; max-height: 90%; position: fixed; top: 1%; left: 1%; background: transparent; border-radius: .15em; padding: 3px; z-index: 10000;`);

  var bod = gi(doc,'tsv_contBody');
  if(bod) bod.outerHTML = '';

  var head = gi(doc, 'tsv_main_top_header');
  var sBtn = ele('div');
  attr(sBtn, 'style',`padding: 4px; float: right; background: #fff; color: #004471; border: 3px solid #004471; border-radius: .15em; cursor: pointer;`);
  head.appendChild(sBtn);
  sBtn.innerText = 'Search';
  sBtn.addEventListener('click', runTSVSearch);

  var tab = ele('div');
  attr(tab,'id','tsv_search_body');
  attr(tab, 'style', `display: inline-block; width: 100%; height: 90%; background: #fff; border: 1px solid #004471; border-radius: .15em; padding: 3px;`);
  par.appendChild(tab);
  for(var r=0; r<header.length; r++){
    var colIsNum = colByIndex(table,r).some(el=> Number.isInteger(el));
    var p_type = colIsNum ? '2.8 - 18' : 'boolean search'; 
    var isBool = colIsNum ? 'number' : 'string';
    var tr = ele('div');
    tab.appendChild(tr);    
    
    var t_lab = ele('div');
    tr.appendChild(t_lab);
    t_lab.innerText = header[r];

    var t_val = ele('input');
    tr.appendChild(t_val);
    attr(t_val,'placeholder',p_type);
    attr(t_val,'csv_data_ref_id',header[r]);
    attr(t_val,'csv_data_ref_bool',isBool);
    attr(t_val,'style',`padding: 4px; border: 1px solid #004471; border-radius: .15em;`);

    var t_cls = ele('div');
    tr.appendChild(t_cls);
    t_cls.innerText = 'X';
    attr(t_cls,'style',`padding: 1px; color: Crimson; float: right; cursor: pointer;`);
    t_cls.addEventListener('click', hidebooler);      
  }
}

function runTSVSearch(){
  var paramValArr = Array.from(tn(gi(doc, 'tsv_search_body'),'input')).filter(i=> i.value).map(i=> [i.value,i.getAttribute('csv_data_ref_bool'),i.getAttribute('csv_data_ref_id')]);
  var mainTable = tsv2array();
  var mainHeader = mainTable[0];
  var boolParams = paramValArr.filter(el=> el[1] == 'string');
//   var matches_dupeTable = [];
//   for(var i=0; i<boolParams.length; i++){
//     var targI = mainHeader.indexOf(boolParams[i][2]);
//     var bstring = parseAsRegexArr(boolParams[i][0]);
//     var filtered = filterTableByCol(mainTable,targI,bstring);
//     matches_dupeTable.push(filtered);
//   }

  var filteredTable = mainTable.filter(el=> {
    boolParams.every(i=> {
      var targI = mainHeader.indexOf(i[2]);
      var bstring = parseAsRegexArr(i[0]);
      return matchAllregXarr(el[targI],bstring);
//       var filtered = filterTableByCol(mainTable,targI,bstring);
    });
  });
createTableView(filteredTable);
//   var filterTableByCol = (t,n,x) => t.filter(el=> matchAllregXarr(el[n],x));
}

function hidebooler(){
  this.parentElement.outerHTML = '';
}

function createTableView(table){
  var par = gi(doc,'uploader_container');
  attr(par, 'style', `display: inline-block; width: 80%; height: 90%; position: fixed; top: 1%; left: 1%; background: transparent; border-radius: .15em; padding: 3px; z-index: 10000;`);

  var bod = gi(doc,'tsv_contBody');
  if(bod) bod.outerHTML = '';
  
  var tab = ele('table');
  attr(tab,'id','tsv_table_body');
  attr(tab, 'style', `display: inline-block; width: 100%; height: 100%; background: #fff; border: 1px solid #004471; order-radius: .15em; padding: 3px; overflow-y: scroll; overflow-x: scroll;`);
  par.appendChild(tab);

  for(var r=0; r<table.length; r++){
    var tr = ele('tr');
    tab.appendChild(tr);
    attr(tr,'style',`padding: 4px; width: 98%; border: 1px dotted #004471;`);
    for(var d=0; d<table[r].length; d++){
      var td = ele('td');
      attr(td,'style',`padding: 4px; width: 98%; border: 1px dotted #004471;`);
      td.innerText = table[r][d];
      tr.appendChild(td);
    }
  }

}

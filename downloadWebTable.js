var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);

var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

var matchAllregXarr = (t, x) => x.every(r => r.test(t));

var doc = document;

function hoverSwitch() {
  var b = this.style.background;
  var c = this.style.color;
  var bs = this.style.border;
  this.style.background = c;
  this.style.color = b;
  this.style.border = bs.replace(/#\w+/, c);
  this.style.transition = "all 173ms";
}

function downloadr(arr2D, filename) {
  if (/\.tsv$|\.csv$/.test(filename) === true) {
    var data = '';
    arr2D.forEach(row => {
      var arrRow = '';
      row.forEach(col => {
        col ? arrRow = arrRow + col.toString() + '\t' : arrRow = arrRow + ' \t';
      });
      data = data + arrRow + '\r';
    });
  }

  if (/\.json$|.js$/.test(filename) === true) {
    var data = JSON.stringify(arr2D);
    var type = 'data:application/json;charset=utf-8,';
  } else {
    var type = 'data:text/plain;charset=utf-8,';
  }
  var file = new Blob([data], {
    type: type
  });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 10);
  }
}

var table = tn(doc,'table');

var siteTables = [];

for(var i=0; i<table.length; i++){
  var rows = Array.from(tn(table[i],'tr')).map(tr=> Array.from(tn(tr,'td')).map(td=> td.innerText.replace(/\n/g,' '))).filter(el=> el.length > 0);
  var head = Array.from(tn(table[i],'tr')).map(tr=> Array.from(tn(tr,'th')).map(td=> td.innerText.replace(/\n/g,' '))).filter(el=> el.length > 0);
  var tbod = head.concat(rows);
  createDlBtns(table[i],i);
  siteTables.push(tbod);
}

function clickDownload(){
  var i = parseInt(this.getAttribute('table_data_index'));
  downloadr(siteTables[i], reg(/\w+$/.exec(window.location.href),0)+siteTables[i][0][0].replace(/\W+/g,'')+'.tsv');
}

async function createDlBtns(p,d){
  await Array.from(cn(doc, 'data_table_btn')).forEach(el=> el.outerHTML = '');
  var n = ele('div');
  attr(n,'table_data_index', d);
  attr(n, 'class','data_table_btn');
  attr(n,'style',`padding: 4px; color: #004471; background: #fff; border: 1px solid #004471; border-radius: 0.25em; font-size: 0.7; cursor: pointer`);
  n.innerText = 'Download';
  p.insertBefore(n,p.firstChild);
  n.addEventListener('mouseover', hoverSwitch);
  n.addEventListener('mouseout', hoverSwitch);
  n.addEventListener('mousedown', hoverSwitch);
  n.addEventListener('mouseup', hoverSwitch);
  n.addEventListener('click',clickDownload);
}

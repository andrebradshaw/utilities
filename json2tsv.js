var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var firstLevel = fileArray.map(el=> Object.entries(el));
var lens = Math.max(...firstLevel.map(el=> el.length));
var header = unq(firstLevel.map(el=> el.map(itm=> itm[0])).flat());
var table = [header];

var str = (o) => typeof o == 'object' ? JSON.stringify(o).replace(/\n|\r/g, ' ') : o.toString().replace(/\n|\r/g, ' ');


for(var i=0; i<firstLevel.length; i++){
  var arr = [];
  var row = [];
  for(var s=0; s<firstLevel[i].length; s++){
    var place = header.indexOf(firstLevel[i][s][0]);
	arr[place] = firstLevel[i][s][1];
  }
  for(var a=0; a<arr.length; a++){
    if(arr[a]) row.push(arr[a]);
	else row.push('');
  }
  table.push(row);
}

function downloadr(arr2D, filename) {
  var data = /\.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el=> el.reduce((a,b) => a+'\t'+b )).reduce((a,b) => a+'\r'+b);
  var type = /\.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
  var file = new Blob([data], {    type: type  });
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
var output = table.map(el=> el.map(itm=> str(itm)));
downloadr(output,'test.tsv');

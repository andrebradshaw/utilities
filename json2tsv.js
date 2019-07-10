var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));

function createUploadHTML(){

if(gi(document,'pop_FileUploader')) gi(document,'pop_FileUploader').outerHTML = '';

var popCont = ele("div");
document.body.appendChild(popCont);
attr(popCont, "id", "pop_FileUploader");
attr(popCont, 'style','position: fixed; top: 20%; left: 50%; width: 280px; height: 100px; background: lightgrey; border: 1px solid #616161; border-radius: .5em; padding: 6px; z-index: 12000;');

var closeBtn = ele("div");
attr(closeBtn, "id", "note_btn_close");
attr(closeBtn, 'style','background: transparent; width: 15px; height: 15px; transform: scale(1.8, 1.2); border-radius: 1em; padding: 0px; color: Crimson; cursor: pointer');
popCont.appendChild(closeBtn);
closeBtn.innerText = "X";
closeBtn.addEventListener("click", close);

var uploadElm = ele("input");
attr(uploadElm, "id", "customFileInput");
attr(uploadElm, "type", "file");
attr(uploadElm, "name", "file[]");
attr(uploadElm, "multiple", "true");
popCont.appendChild(uploadElm);
uploadElm.style.transform = "scale(1.1, 1.1) translate(5%, 80%)";
uploadElm.addEventListener("change", handleFiles);

function close() {
  document.body.removeChild(popCont);
}
}

createUploadHTML();

var fileArray = [];
var textFile = '';

var loadHandleJson = (e) => Array.isArray(JSON.parse(e.target.result)) ? JSON.parse(e.target.result).forEach(i=> fileArray.push(i)) : fileArray.push(JSON.parse(e.target.result));
var loadHandleText = (e) => textFile = textFile + e.target.result;

async function handleFiles() {
  var files = this.files;
  for(var i=0; i<files.length; i++){
    await getAsText(files[i]);
  }
  gi(document,'pop_FileUploader').outerHTML = '';
  await delay(1000);
  convertToTSV();
}

function getAsText(f) {
  var reader = new FileReader();
  reader.readAsText(f);
  if(/\.json/i.test(f.name))
    reader.onload = loadHandleJson;
  else
    reader.onload = loadHandleText;
}

function convertToTSV(){
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
downloadr(output,'converted_file.tsv');
}

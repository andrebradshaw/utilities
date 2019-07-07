/*
Merges  JSON, CSV, TSV and TXT file formats. 
Script figures out what formats match, so you can upload multiple file types at once. 
*/

var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var reg = (o, n) => o ? o[n] : '';
var delay = (ms) => new Promise(res => setTimeout(res, ms));

function downloadr(arr2D, filename) {
  var data = /\.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D;
  var type = /\.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
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

async function createUploadHTML() {
  if (gi(document, 'pop_FileUploader')) gi(document, 'pop_FileUploader').outerHTML = '';
  var popCont = ele("div");
  document.body.appendChild(popCont);
  attr(popCont, "id", "pop_FileUploader");
  attr(popCont, 'style', 'position: fixed; top: 20%; left: 50%; width: 280px; height: 100px; background: lightgrey; border: 1px solid #616161; border-radius: .5em; padding: 6px; z-index: 12000;');

  var closeBtn = ele("div");
  attr(closeBtn, "id", "note_btn_close");
  attr(closeBtn, 'style', 'background: transparent; width: 15px; height: 15px; transform: scale(1.8, 1.2); border-radius: 1em; padding: 0px; color: Crimson; cursor: pointer');
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
  uploadElm.addEventListener("change", await handleFiles);

  function close() {
    document.body.removeChild(popCont);
  }
}


async function handleFiles() {
  var fileArray = [];
  var csvFile = '';
  var tsvFile = '';
  var textFile = '';

  var loadHandleJson = (e) => Array.isArray(JSON.parse(e.target.result)) ? JSON.parse(e.target.result).forEach(i => fileArray.push(i)) : fileArray.push(JSON.parse(e.target.result));
  var loadHandleCsv = (e) => csvFile = csvFile + '\r' + e.target.result;
  var loadHandleTsv = (e) => tsvFile = tsvFile + '\r' + e.target.result;
  var loadHandleTxt = (e) => textFile = textFile + '\n' + e.target.result;

  function getAsText(f) {
    var reader = new FileReader();
    reader.readAsText(f);
    if (/\.json/i.test(f.name)) reader.onload = loadHandleJson;
    if (/\.csv/i.test(f.name)) reader.onload = loadHandleCsv;
    if (/\.tsv/i.test(f.name)) reader.onload = loadHandleTsv;
    if (/\.txt/i.test(f.name)) reader.onload = loadHandleTxt;
  }
  var files = this.files;
  for (var i = 0; i < files.length; i++) {
    await getAsText(files[i]);
  }
  var filetypes = await unq(Array.from(this.files).map(f=> reg(/(?<=\.)\w+$/.exec(f.name),0)));
  gi(document, 'pop_FileUploader').outerHTML = '';
  await delay(1111);
  await createDownloadBtns(filetypes,fileArray,[csvFile,tsvFile,textFile]);
}



async function createDownloadBtns(filetypes,arr,tarr) {
  if(gi(document, 'download_cont')) gi(document, 'download_cont').outerHTML = '';

  var csv = tarr[0];
  var tsv = tarr[1];
  var text = tarr[2];

  var jsonTypes = filetypes.filter(el=> /json/i.test(el)).toString();
  var tsvTypes = filetypes.filter(el=> /tsv/i.test(el)).toString();
  var csvTypes = filetypes.filter(el=> /csv/i.test(el)).toString();
  var textTypes = filetypes.filter(el=> /txt/i.test(el)).toString();


  var cont = ele("div");
  document.body.appendChild(cont);
  attr(cont, "id", "download_cont");
  attr(cont, 'style', 'position: fixed; top: 20%; left: 50%; width: 360px; height: 360px; background: transparent; z-index: 12000;');

  var head = ele("div");
  attr(head, "id", "download_header");
  attr(head, 'style', 'background: #004471; height: 9%; border: 1.5px solid #004471; border-top-right-radius: 0.25em; border-top-left-radius: 0.25em; padding: 0px; cursor: move;');
  cont.appendChild(head);
  head.addEventListener("mouseover", dragElement);


  var closeBtn = ele("div");
  attr(closeBtn, "id", "search_btn_close");
  attr(closeBtn, 'style', 'background: transparent; width: 15px; height: 15px; transform: scale(1.8, 1.2) translate(4px, 2px); border-radius: 1em; padding: 0px; color: Crimson; cursor: pointer');
  head.appendChild(closeBtn);
  closeBtn.innerText = "X";
  closeBtn.addEventListener("click", close);

  var body = ele("div");
  attr(body, "id", "download_body");
  attr(body, 'style', 'background: #fff; height: 90%; border: 1.5px solid #004471; border-bottom-right-radius: 0.25em; border-bottom-left-radius: 0.25em; padding: 6px;');
  cont.appendChild(body);

  if(arr.length > 0) createDownloadCont(jsonTypes);
  if(tsv) createDownloadCont(tsvTypes);
  if(csv) createDownloadCont(csvTypes);
  if(text) createDownloadCont(textTypes);

  function createDownloadCont(types){
    var dbody = ele("div");
    attr(dbody, "class", "download_body_type");
    attr(dbody, 'style', 'background: #fff; border-radius: 0.25em; padding: 6px;');
    body.appendChild(dbody);

    var label = ele('div');
    label.innerText = 'Merged '+types+' files';
    dbody.appendChild(label);

    var hinput = ele("input");
    attr(hinput, "class", "download_namer_text");
    attr(hinput, "placeholder", "new_filename."+types);
    attr(hinput, 'style', 'background: #fff; color: #004471; border-radius: 0.25em; border: 1px solid #004471; padding: 6px; cursor: text;');
    dbody.appendChild(hinput);

    var dlBtn = ele("button");
    attr(dlBtn, "class", "downloadr_btn");
    attr(dlBtn, 'style', 'background: #fff; color: #004471; border-radius: 0.25em; padding: 6px; cursor: pointer;');
    dbody.appendChild(dlBtn);
    dlBtn.innerText = 'download';
    dlBtn.onclick = downloadFileByType;
  }

  function downloadFileByType(){
    var filename = this.parentElement.firstChild.value;
    if(/\.json/.test(filename)) downloadr(arr,filename);
    else downloadr(text,filename);
  }
  function close() {
    document.body.removeChild(cont);
  }

}

createUploadHTML();

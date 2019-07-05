/*
Will take a group of files and merge them:
  into an array named fileArray if they are json files 
  into a string named textFile if they are any other type of text files
    accounts for multiple file types and routes them accordingly 
*/
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

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
}

function getAsText(f) {
  var reader = new FileReader();
  reader.readAsText(f);
  if(/\.json/i.test(f.name))
    reader.onload = loadHandleJson;
  else
    reader.onload = loadHandleText;
}

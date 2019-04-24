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
attr( uploadElm, ["name", "file[]"] );
attr( uploadElm, ["multiple", "true"] );
ap2(popCont,uploadElm);
uploadElm.style.transform = "scale(1.1, 1.1) translate(5%, 80%)";
uploadElm.addEventListener("change", handleFiles);

function close() {
  document.body.removeChild(popCont);
}

var jdat_file = [];


async function handleFiles() {
  var files = this.files;
  for(var i=0; i<files.length; i++){
    await getAsText(files[i]);
  }
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  reader.readAsText(fileToRead);
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

function loadHandler(event) {
  var dat = JSON.parse(event.target.result);
  dat.forEach(i=> jdat_file.push(i));
}

function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") alert("Canno't read file !");
}

var popContainer = document.createElement("div");
document.body.appendChild(popContainer);
popContainer.setAttribute("id", "pop_FileUploader");
popContainer.style.display = "inline-block";
popContainer.style.position = "fixed";
popContainer.style.top = "20%";
popContainer.style.left = "50%";
popContainer.style.width = "20%";
popContainer.style.height = "11%";
popContainer.style.background = "lightgrey";
popContainer.style.borderRadius = "1em";
popContainer.style.padding = "3px";
popContainer.style.zIndex = "10000";
popContainer.style.fontFamily = '"Courier New", monospace';

var closeBtn = document.createElement("button");
closeBtn.setAttribute("id", "note_btn_close");
document.getElementById("pop_FileUploader").appendChild(closeBtn);
document.getElementById("note_btn_close").innerText = "+";

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

var uploadElm = document.createElement("input");
uploadElm.setAttribute("id", "customFileInput");
uploadElm.setAttribute("type", "file");
uploadElm.style.transform = "scale(1.1, 1.1) translate(5%, 80%)";
document.getElementById("pop_FileUploader").appendChild(uploadElm);


var jdat_file = '';

function close() {
  document.body.removeChild(document.getElementById("pop_FileUploader"));
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
  jdat_file = JSON.parse(event.target.result);
  close();
}

function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") alert("Canno't read file !");
}
uploadElm.addEventListener("change", handleFiles);
document.getElementById("note_btn_close").addEventListener("click", close);

var popContainer = document.createElement("div");
document.body.appendChild(popContainer);
popContainer.setAttribute("id", "pop_container");
popContainer.style.display = "inline-block";
popContainer.style.position = "fixed";
popContainer.style.top = "20%";
popContainer.style.left = "50%";
popContainer.style.width = "20%";
popContainer.style.height = "33%";
popContainer.style.background = "lightgrey";
popContainer.style.borderRadius = "2em";
popContainer.style.padding = "3px";
popContainer.style.zIndex = "10000";
popContainer.style.fontFamily = '"Courier New", monospace';

var closeBtn = document.createElement("button");
closeBtn.setAttribute("id", "note_btn_close");
document.getElementById("pop_container").appendChild(closeBtn);
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
uploadElm.setAttribute("id", "csvFileInput");
uploadElm.setAttribute("type", "file");
uploadElm.setAttribute("onchange", "handleFiles(this.files)");
uploadElm.style.transform = "scale(1.1, 1.1) translate(5%, 80%)"
document.getElementById("pop_container").appendChild(uploadElm);

  var saveBtn = document.createElement("button");
  document.getElementById("pop_container").appendChild(saveBtn);
  saveBtn.setAttribute("id", "savebtn_box");
  document.getElementById("savebtn_box").innerText = "download as json";
  saveBtn.style.background = "DarkCyan";
  saveBtn.style.border = "1px solid DarkSlateGrey";
  saveBtn.style.width = "100%";
  saveBtn.style.height = "20%";
  saveBtn.style.borderRadius = "1em";
  saveBtn.style.cursor = "pointer";
  saveBtn.style.color = "white";
  saveBtn.style.fontFamily = '"Courier New", monospace';


function close() {
  document.body.removeChild(document.getElementById("pop_container"));
}



  
//document.getElementById('csvFileInput').find(   file.name   ).append(evt.target.result)



var objArr = [];

  function dl() {
	var outJson = JSON.stringify(objArr);
	var pmpt = prompt('name your file');
    var elmi = document.createElement('a');
    elmi.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(outJson));
    elmi.setAttribute('download', pmpt+'.json');
    elmi.style.display = 'none';
    document.body.appendChild(elmi);
    elmi.click();
    document.body.removeChild(elmi);
  }

function handleFiles(files) {
  if (window.FileReader) {
    getAsText(files[0]);
  } else {
    alert('FileReader are not supported in this browser.');
  }
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  reader.readAsText(fileToRead);
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

function loadHandler(event) {
  var csv = event.target.result;
  processData(csv);
}

function processData(csv) {
  var allTextLines = csv.split(/\r\n|\n/);
  var lines = [];
  for (i = 0; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(',');
    var tarr = [];
    for (j = 0; j < data.length; j++) {
      tarr.push(data[j]);
    }
    lines.push(tarr);
  }
  var headKeys = lines[0].map(itm => {
    return itm.toLowerCase().replace(/\s+/g, '_')
  });
  for (n = 1; n < lines.length; n++) {
    let tob = {};
    for (c = 0; c < lines[n].length; c++) {
      Object.defineProperty(tob, headKeys[c], {
        value: lines[n][c],
        writable: true
      });
    }
    objArr.push(tob);
  }
}

function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") {
    alert("Canno't read file !");
  }
}
document.getElementById("savebtn_box").addEventListener("click", dl);
document.getElementById("note_btn_close").addEventListener("click", close);

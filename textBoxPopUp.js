var reg = (elm, n) => elm != null ? elm[n] : '';
var cn = (ob, nm) => ob ? ob.getElementsByClassName(nm) : console.log(ob);
var tn = (ob, nm) => ob ? ob.getElementsByTagName(nm) : console.log(ob);
var gi = (ob, nm) => ob ? ob.getElementById(nm) : console.log(ob);
// var noHTML = (str) => str.replace(/<.+?>/g, '').replace(/\s+/g, ' ').replace(/&.+?;/g, '');
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var cleanName = (s) => s.replace(/(?<=^.+?)\s+-\s+.+|(?<=^.+?)\s*[sSJj][Rr].+|(?<=^.+?)\s*(III|IV|II).*|(?<=^.+?)\b,.*|(?<=^.+?)\s*\(.*/, '');
var fixCase = (s) => s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
var timer = new Date().getTime().toString().replace(/\d{4}$/, '0000');
var rando = (n) => Math.round(Math.random()*n);

var tsvTo2dArr = (tsv) => tsv.split(/\r|\n/)
.map(itm=> itm.split(/(?<=^|\t)/));

var jsonKeys = (str) => tsvTo2dArr(str)[0].map(col=>col.toLowerCase().trim().replace(/\W+/g, '_'));
//   <path d="M0,1 10,1 M9,1 9,10 M0,9 10,9 M1,9 1,1" />
function d2arrToJSON(str){
  var temp = [];
  var keys = jsonKeys(str);
  var d2arr = tsvTo2dArr(str);
  d2arr.shift();
  d2arr.forEach(row=>{
  var tempObj = '{';
    for(var i=0; i<keys.length; i++){
	  var val = row[i] ? row[i].replace(/"/g, '\"') : '';
      tempObj = tempObj + '"' + keys[i] + '":"' + val.trim() + '",';
    }
    temp.push(JSON.parse(tempObj.replace(/,$/, '')+'}'));
  });
 return temp;
}

function dragElement() {
  this.style.border = "1px solid #5E9ED6";
  this.style.background = "#111111";
  this.style.transition = "all 166ms";
  var elmnt = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) {
    document.getElementById(this.id).onmousedown = dragMouseDown;
  } else {
    this.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
//     e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
//     e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.opacity = "0.85";
    elmnt.style.transition = "opacity 1000ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.opacity = "1";
  }
}


function createPopTextArea(id){
if(document.getElementById(id)) document.getElementById(id).outerHTML = "";

var cd = document.createElement("div");
cd.setAttribute("id", id);
cd.style.display = "inline-block";
cd.style.position = "fixed";
cd.style.top = "10%";
cd.style.left = "50%";
cd.style.width = "29%";
cd.style.height = "43%";
cd.style.background = "transparent";
cd.style.borderRadius = ".15em";
cd.style.padding = "2px";
cd.style.zIndex = "10000";
document.body.appendChild(cd);

var cb = document.createElement("button");
cb.setAttribute("id", id+"_close");
cb.setAttribute("colorid", "Crimson")
cb.style.float = "left";
cb.style.background = "#000";
cb.style.height = "20px";
cb.style.width = "20px";
cb.style.borderRadius = "50%";
cb.style.boxShadow = "0px";
cb.style.border = "3px solid Crimson";
cb.style.textAlign = "center";
cb.style.cursor = "pointer";
cb.style.userSelect = "none";
cb.style.fontSize = "1em";
cb.style.color = "Crimson";
cb.style.transform = "scale(1, 1) translate(3.5px, 3.5px) rotate(0deg)"; 
cb.addEventListener("click", killParent);
cb.addEventListener("mousedown", hoverO);
cb.addEventListener("mouseover", hoverI);
cb.addEventListener("mouseout", hoverO);
cd.appendChild(cb);

var ev = document.createElement("button");
ev.setAttribute("id", id+"_eval");
ev.setAttribute("colorid", "#2E8B57")
ev.style.float = "left";
ev.style.background = "#000";
ev.style.height = "20px";
ev.style.width = "20px";
ev.style.borderRadius = "50%";
ev.style.boxShadow = "0px";
ev.style.border = "3px solid #2E8B57";
ev.style.textAlign = "center";
ev.style.cursor = "pointer";
ev.style.userSelect = "none";
ev.style.fontSize = "1em";
ev.style.color = "Crimson";
ev.style.transform = "scale(1, 1) translate(3.5px, 3.5px)";
ev.addEventListener("click", doJavscript);
ev.addEventListener("mousedown", hoverO);
ev.addEventListener("mouseover", hoverI);
ev.addEventListener("mouseout", hoverO);
// ev.innerText = "eval";
cd.appendChild(ev);


var hd = document.createElement("div");
hd.setAttribute("id", id+"_mover");
// hd.style.width = "99%";
hd.style.height = "8%";
hd.style.border = "1px solid #000"     
hd.style.backgroundColor = "#000000";
hd.style.borderTopLeftRadius = ".15em";
hd.style.borderTopRightRadius = ".15em";
hd.style.padding = "6px";
hd.style.cursor = 'move';
hd.style.boxShadow = "1px 1px 1px 0px #888888";
hd.addEventListener("mouseover", dragElement);
hd.addEventListener("mouseout", nodrag);
cd.appendChild(hd);


var tf = document.createElement("div");
tf.setAttribute("id", id+"_textfile");
tf.setAttribute("textholder", "filename.txt");
tf.setAttribute("contenteditable", "true");
tf.setAttribute("colorid", "#c4c4c4");
tf.innerText = 'filename.txt';
tf.style.width = "36%";
tf.style.padding = "6px";
tf.style.cursor = "text";
tf.style.borderRadius = "1%";
tf.style.border = "3px solid #c4c4c4";
tf.style.background = "#0f0f0f";
tf.style.color = "#c4c4c4";
tf.style.fontSize = "1em";
tf.style.userSelect = "none";
tf.style.float = "right";
tf.addEventListener("keydown", (event) => { if (event.key == "Enter") dlBox(); });
tf.addEventListener("focus", hoverEv);
tf.addEventListener("blur", outEv);
tf.addEventListener("click", rmvPlaceholder);
tf.addEventListener("focus", rmvPlaceholder);
tf.addEventListener("blur", addPlaceholder);
hd.appendChild(tf);


var tb = document.createElement("div");
tb.setAttribute("id", id+"_textarea");
tb.setAttribute("textholder", '"text area"');
tb.setAttribute("contenteditable", "true");
tb.innerText = '"text area"';
// tb.style.width = "99%";
tb.style.height = "92%";
tb.style.padding = "3px";
tb.style.border = "1px solid #000000";
tb.style.color = "#474747";
tb.style.fontSize = "1em";
tb.style.userSelect = "none";
tb.style.boxShadow = "1px 1px 1px 0px #888888";
tb.addEventListener("click", rmvPlaceholder);
tb.addEventListener("focus", rmvPlaceholder);
tb.addEventListener("blur", addPlaceholder);
// tb.addEventListener('keyup', syntaxer);
// tb.addEventListener('keyup', setCursorToEnd);
cd.appendChild(tb);
tb.style.backgroundColor = "#282828";


}

async function killParent() {
  this.style.background = "Crimson";
  this.style.transform = "scale(.001, .001) translate(3px, 3px)  rotate(495deg)"; 
  this.style.transition = "all 106ms cubic-bezier(.9,.37,.66,.96)";
  await delay(206);
  this.parentElement.outerHTML = "";
}
async function killElm(){
  this.outerHTML = "";
}


async function hoverEv(){
var colorid = this.getAttribute("colorid");
  this.style.border = "2px solid "+colorid;
  await delay(30);
  this.style.border = "1px solid "+colorid;
  await delay(20);
  this.style.border = "3px solid #000";
  await delay(10);
  this.style.background = colorid;
  this.style.color = "#000";
  this.style.transition = "all 186ms ";
}
async function outEv(){
var colorid = this.getAttribute("colorid");
  this.style.background = "#000";
  this.style.border = "1px solid "+colorid;
  await delay(66);
  this.style.border = "3px solid "+colorid;
  this.style.color = colorid;
  this.style.transition = "all 186ms ";
}

async function hoverI(){
  var colorid = this.getAttribute("colorid");
  this.style.border = "2px solid ";
  await delay(30);
  this.style.border = "1px solid "+colorid;
  await delay(20);
  this.style.border = "1px solid #000";
  await delay(10);
  this.style.background = colorid;
  this.style.color = "#000";
  this.style.transition = "all 186ms cubic-bezier(.9,.37,.66,.96)";
}
async function hoverO(){
var colorid = this.getAttribute("colorid");
  this.style.background = "#000";
  this.style.border = "1px solid "+colorid;
  await delay(66);
  this.style.border = "3px solid "+colorid;
  this.style.color = "#41f49d";
  this.style.transition = "all 186ms cubic-bezier(.9,.37,.66,.96)";
}

function nodrag(){
  this.style.border = "0px solid #5E9ED6";
  this.style.background = "#000000";
  this.style.transition = "all 166ms";
}

function rmvPlaceholder(){
  var txt = this.getAttribute("textholder");
  if(new RegExp(txt.replace(/"/g, '"{0,1}')).test(this.innerText)){
    this.innerText = "";
    this.style.color = "#c4c4c4";
  }
}
function addPlaceholder(){
  if(/^.{0}$/.test(this.innerText)){
    this.innerText = this.getAttribute("textholder");
    this.style.color = "#474747";
  }
}
async function doJavscript(){
  var outputEval = await eval(gi(document,'popup_textarea').innerText);
  gi(document,'popup_textarea').innerText = outputEval;
}


function dlBox(){
  var filename = gi(document,"popup_textfile").value;
  var userinput = gi(document,"popup_textarea").innerText;
  var string2write = d2arrToJSON(userinput);
  downloadr(string2write,filename)
}

async function downloadr(str, name) {
  var type = "data:text/plain;charset=utf-8,";
  var strDL = str;
  if(/\.json$/.test(name)){
   var type = "data:application/json;charset=utf-8,";
   var strDL = JSON.stringify(str);
  }
  var file = new Blob([strDL], { type: type });
  var a = document.createElement("a"),
      url = URL.createObjectURL(file);
  a.href = url;
  a.download = /\..{2,4}$/.test(name) ? name : name+"_def.txt";
  document.body.appendChild(a);
  a.click();
  await delay(10);
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
// downloadr(containArrCSV, 'CEI_IndeedReviews.csv');
// downloadr(containArr, 'CEI_IndeedReviews.json');

/*
function btnAction() {
this.style.background = "rgb(40, 40, 40);
this.style.transform = "scale(1, 1) translate(0px, 0px)";
this.style.transition = "all 173ms";
}
*/
function setCursorToEnd(){
  var contentEditable = gi(document, "popup_textarea");
  var clen = tn(contentEditable,"span").length-1;
  var lastItem = tn(contentEditable,"span").item(clen);

  var selectElementText = (el, win) => {
    win = win || window;
    var doc = win.document, sel, range;
    if (win.getSelection && doc.createRange) {                    
      range = doc.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      sel = win.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    else 
    if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElementText(el);
      range.select();
    }
  }
  contentEditable.focus();
  selectElementText(lastItem);
}

function syntaxer(){
  var str = this.innerHTML;
  var purpXend = /(?<=var|await|function)\b/g;
  var purpXstart = /\b(?=var|await|function)/g;
//   var objXstart = /(?<=\.\b)(?=\w)/g;
//   var objXend = /(?<=\.\b\w+)\b/g;
//   var periodX = /\b\.\b/g;
//   var quoX = /".+?"/g;
//   var varX = /(?<=\bvar\b\s+)\w+\s*\=|(?<=\bfunction\b\s+)\w+/g;
// if(objXstart.test(str)){
if(purpXstart.test(str)){
  var output = str
	.replace(purpXstart, '<span style="color: #6c1b9b;">')
	.replace(purpXend, '</span>')
	.replace();
  this.innerHTML = output;
  setCursorToEnd()
}
// }
}

createPopTextArea("popup");

function alterBoxDimensions(){
  var cd = gi(document, "popup");
  var td = gi(document, "popup_textarea");
  var rowLen = tn(td,"div").length;
  if(rowLen > 12 && rowLen < 40){
	cd.style.height = Math.round(rowLen * 2) +"%";
  }
  if(rowLen > 39){
	cd.style.height = "80%";
  }
}
// alterBoxDimensions()

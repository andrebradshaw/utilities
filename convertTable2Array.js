function reg(e, n){  if(e != null){    return e[n];  }else{    return '';  }}
function unq(arrgh){	return arrgh.filter((elm,pos,arr) =>{	return arr.indexOf(elm) == pos;});}

function dragElement() {
	this.style.background = 'CadetBlue';
	this.style.transition = 'all 566ms';
	var elmnt = this.parentElement;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(this.id)) {
    document.getElementById(this.id).onmousedown = dragMouseDown;
  } else {
    this.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.opacity = "0.85";
    elmnt.style.background = "DarkSlateGrey";
    elmnt.style.transition = "opacity 1300ms"
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.opacity = "1";
    elmnt.style.background = "DarkSlateGrey";
  }
}

function close() {
  document.body.removeChild(document.getElementById("pop_container"));
}

function nodrag(){
	this.style.background = 'DarkCyan';
	this.style.transition = 'all 566ms';
}

function tabIs(){
    if(/\)\s{0,1}\{\}/.test(this.value)){
        this.value = this.value.replace(/\)\s{0,1}\{\}/, ") {\n   \n}");   
        this.selectionStart = this.selectionStart-2;
        this.selectionEnd = this.selectionEnd-2;
        this.focus();
    }
}

function saveme(){
  if(code.length > 0){
	var code = document.getElementById("textbox_code").value; 	
	window.open('https://script.google.com/macros/s/AKfycbyipjm86wNduqfZzXFQiAjpA6BV63wNbDL0PppW3O8rXd58qUg/exec?t='+encodeURIComponent(code));
  }
}
function execute(){
  var code = document.getElementById("textbox_code").value;
  if(code.length > 0){
	eval(code);
  }
}

var cDiv = document.createElement("div");
cDiv.setAttribute("id", "pop_container");
document.body.appendChild(cDiv);
cDiv.style.display = "inline-block";
cDiv.style.position = "fixed";
cDiv.style.top = "300px";
cDiv.style.left = "50%";
cDiv.style.width = "35%";
cDiv.style.height = "43%";
cDiv.style.border = "1px solid DarkSlateGrey ";
cDiv.style.background = "DarkSlateGrey";
cDiv.style.borderRadius = "1em";
cDiv.style.padding = "3px";
cDiv.style.zIndex = "10000";
cDiv.style.fontFamily = '"Courier New", monospace';

var clsBtn = document.createElement("button");
document.getElementById("pop_container").appendChild(clsBtn);
clsBtn.setAttribute("id", "btn_close");
document.getElementById("btn_close").innerText = "+";
clsBtn.style.position = "absolute";
clsBtn.style.background = "transparent";
clsBtn.style.height = "0px";
clsBtn.style.width = "0px";
clsBtn.style.display = "inline-block";
clsBtn.style.transform = "scale(3.9, 3.9) translate(7px, -5px) rotate(45deg)";
clsBtn.style.borderRadius = "1em";
clsBtn.style.padding = "0px";
clsBtn.style.boxShadow = "0px";
clsBtn.style.border = "0px";
clsBtn.style.cursor = "pointer";
clsBtn.style.userSelect = "none";
clsBtn.style.fontFamily = '"Courier New", monospace';
clsBtn.style.fontWeight = "bold";
clsBtn.style.color = "Crimson";

var mDiv = document.createElement("div");
mDiv.setAttribute("id", "mover_div");
document.getElementById("pop_container").appendChild(mDiv);
mDiv.style.width = "100%";
mDiv.style.height = "7%";
mDiv.style.border = "1px solid DarkCyan ";
mDiv.style.backgroundColor = 'DarkCyan';
mDiv.style.borderTopLeftRadius = "1em";
mDiv.style.borderTopRightRadius = "1em";
mDiv.style.padding = "3px";
mDiv.style.fontFamily = '"Courier New", monospace';
mDiv.style.cursor = 'move';


var textbox_1 = document.createElement("TEXTAREA");
textbox_1.setAttribute("id", "textbox_code");
document.getElementById("pop_container").appendChild(textbox_1);
textbox_1.style.width = "100%";
textbox_1.style.height = "83%";
textbox_1.style.padding = "6px";
textbox_1.style.border = "1px solid DarkSlateGrey";
textbox_1.style.background = "FloralWhite";
textbox_1.style.borderBottomLeftRadius = "1em";
textbox_1.style.borderBottomRightRadius = "1em";
textbox_1.style.display = "block";
textbox_1.style.fontSize = "1.2em";
textbox_1.style.userSelect = "none";
textbox_1.style.fontFamily = '"Courier New", monospace';

var evalBtn = document.createElement("button");
document.getElementById("pop_container").appendChild(evalBtn);
evalBtn.setAttribute("id", "btn_box");
document.getElementById("btn_box").innerText = "Execute";
evalBtn.style.background = "DarkCyan";
evalBtn.style.border = "1px solid DarkSlateGrey";
evalBtn.style.width = "48%";
evalBtn.style.height = "10%";
evalBtn.style.borderRadius = "1em";
evalBtn.style.cursor = "pointer";
evalBtn.style.color = "white";

var saveBtn = document.createElement("button");
document.getElementById("pop_container").appendChild(saveBtn);
saveBtn.setAttribute("id", "btn_save");
document.getElementById("btn_save").innerText = "Save";
saveBtn.style.alignSelf = "left";
saveBtn.style.background = "DarkCyan";
saveBtn.style.border = "1px solid DarkSlateGrey";
saveBtn.style.width = "48%";
saveBtn.style.height = "10%";
saveBtn.style.borderRadius = "1em";
saveBtn.style.cursor = "pointer";
saveBtn.style.color = "white";


mDiv.addEventListener('mouseout', nodrag);
mDiv.addEventListener('mouseover', dragElement);
evalBtn.addEventListener("click", execute);
saveBtn.addEventListener("click", saveme);
clsBtn.addEventListener("click", close);
textbox_1.addEventListener('keyup', tabIs);
window.addEventListener('scroll', ()=>{cDiv.style.opacity = ".77";});


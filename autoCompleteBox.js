var cDiv = document.createElement("div");
cDiv.setAttribute("id", "pop_container");
document.body.appendChild(cDiv);
cDiv.style.display = "inline-block";
cDiv.style.position = "fixed";
cDiv.style.top = "300px";
cDiv.style.left = "50%";
cDiv.style.width = "25%";
cDiv.style.height = "43%";
cDiv.style.border = "1px solid Transparent";
cDiv.style.background = "Transparent";
cDiv.style.borderRadius = "1em";
cDiv.style.padding = "3px";
cDiv.style.zIndex = "10000";
cDiv.style.fontFamily = '"Courier New", monospace';

var textbox_1 = document.createElement("TEXTAREA");
textbox_1.setAttribute("id", "textbox_code");
document.getElementById("pop_container").appendChild(textbox_1);
textbox_1.style.width = "99%";
textbox_1.style.height = "83%";
textbox_1.style.padding = "6px";
textbox_1.style.border = "1px solid DarkSlateGrey";
textbox_1.style.background = "FloralWhite";
textbox_1.style.fontSize = "1.2em";
textbox_1.style.userSelect = "none";
textbox_1.style.fontFamily = '"Courier New", monospace';

var autoCompl = document.createElement("div");
autoCompl.setAttribute("id", "autoCompl");
document.getElementById("pop_container").appendChild(autoCompl);
autoCompl.style.width = "100%";
autoCompl.style.height = "10%";
autoCompl.style.padding = "6px";
autoCompl.style.border = "1px solid Transparent";
autoCompl.style.background = "Transparent";
autoCompl.style.fontFamily = '"Courier New", monospace';

function createDivsFromArray(arr,elmId){
	for(i=0; i<arr.length; i++){
		var iDiv = document.createElement('div');
		document.getElementById(elmId).appendChild(iDiv);
		iDiv.setAttribute('id', 'idiv_'+arr[i]);
		iDiv.innerText = arr[i];
		iDiv.style.width = "100%";
		iDiv.style.height = "10%";
		iDiv.style.background = "DarkCyan";
		iDiv.style.border = "1px solid DarkSlateGrey";
		iDiv.style.borderRadius = ".2em";
		iDiv.style.color = "white";
		iDiv.style.padding = '2%';
		iDiv.style.cursor = "pointer";
		iDiv.addEventListener('mouseover', hoverIn);
		iDiv.addEventListener('mouseout', hoverOut);
	}
}

function hoverIn(){
	this.style.background = 'CadetBlue';
}
function hoverOut(){
	this.style.background = 'DarkCyan';
}

createDivsFromArray(['Athens','Dunwoody','Macon','Atlanta'], 'pop_container')

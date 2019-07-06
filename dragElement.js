function dragElement() {
  var el = this.parentElement;
  var pos1 = 0,  pos2 = 0,  pos3 = 0,  pos4 = 0;
  if (document.getElementById(this.id))  document.getElementById(this.id).onmousedown = dragMouseDown;
  else  this.onmousedown = dragMouseDown;

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

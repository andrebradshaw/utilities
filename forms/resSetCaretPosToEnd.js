function resSetCaretPosToEnd(id) { //editable div
	var el = document.getElementById(id);
	var range = document.createRange();
	var sel = window.getSelection();
	var text_elms = Array.from(el.childNodes).filter(i=> i.textContent);
	var last_elm = text_elms[(text_elms.length-1)]
	range.setStart(last_elm, (last_elm.textContent.length-1))
	range.collapse(true);
	sel.removeAllRanges();
	sel.addRange(range);
}


function setCaretPositionInTextbox(id) { //input/textarea
	const elm = document.getElementById(id);
	var caret_pos = elm.value.length;
	if(elm != null) {
	    elm.focus();
	    elm.setSelectionRange(caret_pos, caret_pos);
	}
}

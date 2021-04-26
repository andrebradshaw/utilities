function resSetCaretPosToEnd(id) {
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

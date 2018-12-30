function convertTable2Array() {
    sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
	sel = window.getSelection();
	if (sel.rangeCount && sel.getRangeAt) {
		range = sel.getRangeAt(0);
	}
    var arrayCont = [];
Array.from(range.commonAncestorContainer.children)
	Array.from(range.commonAncestorContainer.children)
	.forEach(itm=>{
		arrayCont.push(JSON.parse('["'+itm.innerText.replace(/\t/g, '","')+'"]'))
	})
	return arrayCont;
}
convertTable2Array()


//include header
function convertTable2Array() {
	sel = window.getSelection();
	if (sel.rangeCount && sel.getRangeAt) {
		range = sel.getRangeAt(0);
	}
	var arrayCont = Array.from(range.commonAncestorContainer.previousElementSibling.children)
.map(itm=>{
		return JSON.parse('["'+itm.innerText.replace(/\n/g, '').replace(/\t/g, '","')+'"]')
	});

	Array.from(range.commonAncestorContainer.children)
	.forEach(itm=>{
		arrayCont.push(JSON.parse('["'+itm.innerText.replace(/\t/g, '","')+'"]'))
	})
return arrayCont;

	return arrayCont;
}
convertTable2Array()

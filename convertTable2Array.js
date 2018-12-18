function convertTable2Array() {
    sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    var arrayCont = [];
Array.from(range.commonAncestorContainer.children)
	.forEach(itm=>{
		arrayCont.push(JSON.parse('["'+itm.innerText.replace(/\t/g, '","')+'"]'))
	})
return arrayCont;

}
convertTable2Array()

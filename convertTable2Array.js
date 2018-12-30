
function convertTable2Array(hd) {
	sel = window.getSelection();
	if (sel.rangeCount && sel.getRangeAt) {
		range = sel.getRangeAt(0);
	}
	if(hd == 'hd'){ //include header
		var arrayCont = Array.from(range.commonAncestorContainer.previousElementSibling.children).map(itm=>{return JSON.parse('["'+itm.innerText.replace(/\n/g, '').replace(/\t/g, '","')+'"]');});
	}else{
		var arrayCont = [];
	}
	Array.from(range.commonAncestorContainer.children).forEach(itm=>{arrayCont.push(JSON.parse('["'+itm.innerText.replace(/\t/g, '","')+'"]'))});
	return arrayCont;
}
convertTable2Array()

function downloadr(arr2D, filename) {
    var data = arr2D.map(itm=>{	return itm.toString().replace(/$/, '\r'); }).toString().replace(/\r,/g, '\r');
    var file = new Blob([data], {type: 'data:text/plain;charset=utf-8,'});
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
    } else {
        var a = document.createElement('a'),
		url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() =>{
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 10); 
    }
}

// downloadr(containArr, 'filename');

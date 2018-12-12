function converter(arr){
  var dl_output = arr.map(itm=>{	return itm.toString().replace(/$/, '\r'); }).toString().replace(/\r,/g, '\r');
  function dl(filename, text) {
    var elmi = document.createElement('a');
    elmi.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    elmi.setAttribute('download', filename);
    elmi.style.display = 'none';
    document.body.appendChild(elmi);
    elmi.click();
    document.body.removeChild(elmi);
  }
  dl(linkArr[0][1]+'.csv', dl_output);
}

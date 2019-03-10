var tsvTo2dArr = (tsv) => tsv.split(/\r\n|\n/).map(itm=> itm.match(/.+?(?=\t|$)/g).map(s=>s.replace(/\t/, '')));
// var arr2dToJSON = (arr) => 
// var keysFromHead = (arr,temp) => 


var csvArr = gi(document, "popup_textarea").value;
var jdat = tsvTo2dArr(csvArr,[]);
console.log(jdat);

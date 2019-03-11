var tsvTo2dArr = (tsv) => tsv.split(/\r|\n/).map(itm => itm.split(/(?<=^|\t)/));

var jsonKeys = (str) => tsvTo2dArr(str)[0].map(col => col.toLowerCase().trim().replace(/\W+/g, '_'));

function d2arrToJSON(str,type){
  var temp = [];
  var keys = jsonKeys(str);
  var d2arr = tsvTo2dArr(str);
  d2arr.shift();
  d2arr.forEach(row=>{
  var tempObj = '{';
    for(var i=0; i<keys.length; i++){
	  var val = row[i] ? row[i].replace(/"/g, '\"') : '';
      tempObj = tempObj + '"' + keys[i] + '":"' + val.trim() + '",';
    }
    temp.push(JSON.parse(tempObj.replace(/,$/, '')+'}'));
  });
if(type == "json"){
 return temp;
}
if(type == "csv"){ //from 2darr
	var data = '';
	d2arr.forEach(row => {
		var arrRow = '';
		row.forEach(col => {
			col ? arrRow = arrRow + col.toString().replace(/,/g, ' ') + ',' : arrRow = arrRow + ' ,';
        });
		data = data + arrRow + '\r'; 
	});
}
}

function dlBox(){
  var filename = gi(document,'popup_textfile').value;
  var userinput = gi(document,'popup_textarea').innerText;
  var string2write = d2arrToJSON(userinput);
  downloadr(string2write,filename)
}

async function downloadr(str, name) {
  var type = 'data:text/plain;charset=utf-8,';
  var strDL = str;
  if(/\.json$/.test(name)){
   var type = 'data:application/json;charset=utf-8,';
   var strDL = JSON.stringify(str);
  }

  var file = new Blob([strDL], { type: type });
  var a = document.createElement('a'),
      url = URL.createObjectURL(file);
  a.href = url;
  a.download = /\..{2,4}$/.test(name) ? name : name+'_def.txt';
  document.body.appendChild(a);
  a.click();
  await delay(10);
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

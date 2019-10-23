var tsvTo2dArr = (tsv) => tsv.split(/[\r\n]+/).map(itm => itm.split(/\t/));
var table = tsvTo2dArr(textFile); //this is the output from multi-upload.js
var jsonArr = [];
table.forEach(el=> {
  var ob = {};
  for(var i=0; i<table[0].length; i++){
    var key = table[0][i].toLowerCase().replace(/\W+/g,'_');
    ob[key] = el[i];
  }
  jsonArr.push(ob);
});
jsonArr.shift()
console.log(jsonArr)

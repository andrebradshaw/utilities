function json2Table(json_arr){
  var unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));
  var tsvReady = (s) => s ? s.replace(/\t|\u0009/g, ' ').replace(/\r|\n/g, '↵').replace(/"/g, "'") : s;
  var ready4cell = (o) => typeof o == 'object' ? tsvReady(JSON.stringify(o).replace(/\n|\r/g, ' ')) : o;
  var header = unqHsh(json_arr.map(r=> Object.keys(r)).flat(),{});
  var table = [header];
  json_arr.forEach(record=> {
    var aligned = [];
    for(var n=0; n<header.length; n++){
      aligned.push(record[header[n]])
    }
    table.push(aligned);
  });
  return table;
}

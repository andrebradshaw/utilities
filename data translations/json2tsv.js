function convertToTSV(fileArray, named_file) {
  var tsvReady = (s) => s ? s.replace(/\t|\u0009/g, ' ').replace(/\r|\n/g, '↵').replace(/"/g, "'") : s;
  var unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));
  var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

  var str = (o) => typeof o == 'object' ? tsvReady(JSON.stringify(o).replace(/\n|\r/g, ' ')) : tsvReady(o.toString().replace(/\n|\r/g, ' '));

  var firstLevel = fileArray.map(el => Object.entries(el));
  var header = unqHsh(firstLevel.map(el => el.map(itm => itm[0])).flat(),{});

  var table = [header];
  
  for (var i = 0; i < firstLevel.length; i++) {
    var arr = [];
    var row = [];
    var record = firstLevel[i];
    for (var s = 0; s < record.length; s++) {
      var record_kv = record[s];
      var col_key = record_kv[0];      
      var place = header.indexOf(col_key);
      arr[place] = record_kv[1];
    }
    for (var a = 0; a < arr.length; a++) {
      
      if (arr[a]) {
        row.push(arr[a]);
      } else {
        row.push('');
      }
    }
    table.push(row);
  }

  function downloadr(arr2D, filename) {
    var data = /\.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el => el.reduce((a, b) => a + '\t' + b)).reduce((a, b) => a + '\r' + b);
    var type = /\.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
    var file = new Blob([data], {
      type: type
    });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else {
      var a = document.createElement('a'),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 10);
    }
  }
  var output = table.map(el => el.map(itm => str(itm)));
console.log(output);
  downloadr(output, named_file);
}
// convertToTSV(deDuped,'deDuped_pa_otherStates.tsv')

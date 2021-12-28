var transpose = (a)=>  a[0].map((_, c)=> a.map(r=> r[c])); 

function reOrderTable(tsv,target_header){
    var table = tsv.split(/\n/).map(row=> row.split(/\t/));
    let header = table[0];
    var trans_table = transpose(table);
    var deepest = Math.max(...trans_table.map(t=> t.length));
    var new_table = Array(header.length).fill().map(i=> Array(deepest).fill().map(t=> ''));
    var reordered_table = target_header.map((h,i,r)=> trans_table[trans_table.findIndex(column=> column[0] == header[i])] );
    return transpose(reordered_table.filter(r=> r)).map(row=> row.map(cell=> `${cell}\t`).reduce((a,b)=> a+b)).map(row=> `${row}\n`).reduce((a,b)=> a+b);
}
let remapped_table = reOrderTable(textFile,target_header)

function downloadTSV(arr2D, filename) {
  var data = arr2D;
  var type = 'data:text/plain;charset=utf-8,';
  var file = new Blob([data], {    type: type  });
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

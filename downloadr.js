function downloadr(arr2D, filename) {
  var data = /.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el=> el.reduce((a,b) => a+'	'+b )).reduce((a,b) => a+''+b);
  var type = /.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
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

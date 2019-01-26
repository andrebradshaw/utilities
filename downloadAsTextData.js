function downloadr(arr2D, filename) {
  if (/\.csv$/.test(filename) === true) {
    var data = arr2D.map(itm => {
      return itm.toString().replace(/$/, '\r');
    }).toString().replace(/\r,/g, '\r');
  }
  if (/\.json$|.js$/.test(filename) === true) {
    var data = JSON.stringify(arr2D);
    var type = 'data:application/json;charset=utf-8,';
  } else {
	var type = 'data:text/plain;charset=utf-8,';
  }
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
// downloadr(containArr, 'filename.csv');
// downloadr(containArr, 'filename.json');

function downloadr(arr2D, filename) {
  if (/\.csv$/.test(filename) === true) {
	var data = '';
	arr2D.forEach(row => {
		var arrRow = '';
		row.forEach(col => {
			col ? arrRow = arrRow + col.toString().replace(/,/g, ' ') + ',' : arrRow = arrRow + ' ,';
        });
		data = data + arrRow + '\r'; 
	});
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
// downloadr(containArrCSV, 'CEI_IndeedReviews.csv');
// downloadr(containArr, 'CEI_IndeedReviews.json');

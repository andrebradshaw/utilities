function from1d2(arr, len) {
  var containArr = [];
  for (i = 0; i < arr.length; i = i + len) {
    var tArr = [];
    for (d = i; d < (i + len); d++) {
      if (arr[d]) tArr.push(arr[d]);
    }
    containArr.push(tArr)
  }
  return containArr;
}

/*ES6*/
var subArr = (r, n) => r.reduceRight((a,b,c,d) => [...a, d.splice(0,n)],[]);

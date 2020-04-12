var testArr = [[1, 2, 3, 4, 5, 6, 7, 8, 123],[1,2,3,4,5,6,7,8,123],[2,4,5,6,7,22,21,34,121,125],[6,7,22,21,34,121,125].map(r=> r.toString())];

//var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));

var filterDownMatchingValuesIn2DArr = (arr2d) => arr2d.map( r=> r.filter( itm=> arr2d.every( r2=> r2.some( r2=> r2 == itm ) ) ) );

filterDownMatchingValuesIn2DArr(testArr)


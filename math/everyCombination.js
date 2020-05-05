function everyCombination(arr){
  var cont = [];
  var containArr = [];
  function comboLoop(arr, cont){
	if (arr.length == 0) {
		var row = cont.join('');
        containArr.push(row)
	}
	for (var i = 0; i < arr.length; i++) {
		var x = arr.splice(i, 1);
		cont.push(x);
		comboLoop(arr, cont);
		cont.pop();
		arr.splice(i, 0, x);
	}
  }
  comboLoop(arr, cont);
  return containArr;
}
everyCombination([4, 'beta', 'alpha', 4]);

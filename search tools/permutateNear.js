function permutateNear(str,joiner){
  var arr = str.split(/~/);
  if(arr.length > 5){
    return str.replace(/[~]+/,'.');
   }else{
  var cont = [];
  var containArr = [];
  function comboLoop(arr, cont){
    if (arr.length == 0) {
      var row = cont.join(joiner);
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
  return containArr.reduce((a,b)=> a+'|'+b);
  }
}

fuzzyWuzzy('word~next~other','.{0,5}')

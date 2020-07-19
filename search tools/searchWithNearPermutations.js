var parseStringAsXset = (s) => s
.split(/\s+\band\b\s+|(?<!\s+and\b)\s+\(|\)\s+(?!\band\b)/i)
    .map(el=> 
        el.split(/\s+\bor\b\s+/i).map(ii=> 
            ii.replace(/\s*\)\s*/g,'')
            .replace(/\s*\(\s*/g,'')
            .replace(/\s+/g,'.{0,3}')
            .replace(/"/g,'\\b')
            .replace(/\*/g,'\\w*')
            .replace(/\*\*\*/g,'.{0,60}'))
                .reduce((a,b)=> a+'|'+b)).filter(el=> el);

function permutateNear(input,joiner){
  var nearx = /(?<=\|)\S+?(?=\||$)/g;
  var base = input.replace(nearx, '').replace(/[\|]+/g, '|');
  var near_or = input.match(nearx) ? input.match(nearx).map(str=> {
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
  }).flat().reduce((a,b)=> a+'|'+b) : '';
  return base + near_or;
}

function buildSearchSer(str){
  var set = parseStringAsXset(str);
  var xset = set.map(r=> permutateNear(r,'.{0,3}')).map(r=> new RegExp(r,'i'));
  console.log(xset);
  return xset;
}

buildSearchSet(`("test * this" or run that )  and run the jewels  (one OR "two person"~hat~frog four OR director~*~engineer)`)

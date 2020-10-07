function unqKey(array,key){
  var q = [];
  var map = new Map();
  for (const item of array) {
    if(!map.has(item[key])){
        map.set(item[key], true);
        q.push(item);
    }
  }
  return q;
}

/*
   NESTED VERSION => takes up to 4 levels of object dot notation. no arrays.
*/
function unqKey(array,key){
  var q = [];
  var map = new Map();
  for (const item of array) {
    if(!map.has(keymapper(item,key))){
        map.set(keymapper(item,key), true);
        q.push(item);
    }
  }
  return q;
}

function keymapper(obj,key){
  var k = key.split(/\./);
  return k.length == 4 ? obj[k[0]][k[1]][k[2]][k[3]] : k.length == 3 ? obj[k[0]][k[1]][k[2]] : k.length == 2 ? obj[k[0]][k[1]] : k.length == 1 ? obj[k[0]] : false;
}

var test_merge = unqKey(fileArray,'memberProfileResolutionResult.entityUrn')

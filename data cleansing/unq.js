var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
//

function unqKey(array,key)
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

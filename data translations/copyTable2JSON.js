var table = (`TABLE GOES  HERE
`.split(/\n/).map(el=> el.split(/\t/)));

var arr = [];
for(var i=1; i<table.length; i++){
var obj = {};
  for(var h=0; h<table[0].length; h++){
    obj[table[0][h].replace(/\/\s+|\(.+|\d+/g, '').trim().replace(/\s+/g, '_').toLowerCase()] = table[i][h];
  }
arr.push(obj)
}
console.log(arr)

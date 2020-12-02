/*
This function gives the user an easy way to specify an interation value to return. 
this will give us a true response every nth cycle

for(var i=0; i<500; i++){
  if( everyNth(i,108) ) console.log(i)
}
would log: 0, 108, 216, 324, 432
*/

var everyNth = (i,n) => /\./.test((i/n).toString()) === false && i != 0;

// everyNth(2,44) === false

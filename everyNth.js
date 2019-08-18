/*
This function gives the user an easy way to specify an interation value to return. 
this will give us a true response every nth cycle

for(var i=0; 1<500; i++){
  if( everyNth(1,108) ) console.log(i)
}
would log: 0, 108, 216, 324, 432
*/

var everyNth = (i,n) => ( ( i / Math.floor(n/2) ) % 2) == 0;


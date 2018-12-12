
function everyCombination(){
  var alphArr = Array.from("abcdefghijklmnopqrstuvwxyz");
  var zipArr = ["60601", "60606", "60607", "60654", "60603", "60602", "60022", "60515", "60625", "60504"];

  var multi = [];
  zipArr.forEach(z=>{
	  alphArr.forEach(elm=>{
		  alphArr.forEach(arg=>{
			  multi.push([elm, arg, z])
  		});
	  });
  });
  return multi;
}

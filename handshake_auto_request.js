var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
async function loopThroughRequests(){
  var btns = Array.from(cn(document,'style__base___hEhR9 style__small___3-agh'));
  for(var i=0; i<btns.length; i++){
	btns[i].click();
    await delay(666);
    cn(document,'style__base___hEhR9 style__success___S1K0N')[0].click();
    await delay(777);
  }
}
loopThroughRequests()

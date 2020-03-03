var parseStringAsXset = (str) => str ? regXready(str).split(/\s+\band\b\s+|(?<!\s+and\b)\s+\(|\)\s+(?!\band\b)/i).map(el=> el.split(/\s+\bor\b\s+/i).map(ii=> ii.replace(/\s*\)\s*/g,'').replace(/\s*\(\s*/g,'').replace(/\s+/g,'.{0,3}').replace(/'/g,'\\b').replace(/"/g,'\\b').replace(/\*/g,'\\w*').replace(/\*\*\*/g,'.{0,60}')).reduce((a,b)=> a+'|'+b)).filter(el=> el).map(el=> new RegExp(el,'i')) : false;
var regXready = (str) => str && typeof str == 'string' ? str.replace(/\[/g,'\\W').replace(/\]/g,'\\W').replace(/\{/g,'\\W').replace(/\}/g,'\\W').replace(/\\/g,'\\W').replace(/\//g,'\\W').replace(/\?/g,'\\W').replace(/\+/g,' and ') : '';
var xrSearch = (search,target) => search.every(x=> x.test(target));

function searchJobsByNamedObj(records,obj_name,searchstring){
  var xarr = parseStringAsXset(searchstring);
  if(xarr){
    return records.filter( record=> record.jobs.length && record.jobs.some( j=> xrSearch(xarr,j[obj_name]) ) );
  }else{return false}
}


searchJobsByNamedObj(fileArray,'job_title','Talent Acquisition OR recruiter OR sourcer')

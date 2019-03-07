// TODO: NEAR operator does not allow for "word word" NEAR3 "other stuff"
//this doesnt work because of the greed: (?<=\d|\bAND\s+).+?\bNEAR\d+\b.+?(?=\sAND\b|$)

var orRX = /\(.+?\)|(\(\w+\s{0,1}OR\s|\w+\s{0,1}OR\s)+((\w+\s)+?|(\w+)\)+)+?/gi;

var notArray = (str) => str.match(/(?<=\bNOT\s+|\s+-\s{0,2})(\w+|".+?")/g);
var getQuoted = (str) => str.match(/(?<="\b).+?(?=\b")/g);
var flipNear = (str,n) =>/(?<=\?).+/.exec(str)[0] + '.{0,' +n+ '}?' + /^.+?(?=\.\{)/.exec(str)[0];
  
function getNearGroups(str) {
  var x = /\w+\s+NEAR\d+\s+\w+/g;
  var mx = str.match(x);
  if (mx != null) {
    return mx.map(itm => {
      var near = Math.ceil(parseInt(/(?<=NEAR)\d+/.exec(itm)[0]) * 7);
      var font = itm.replace(/\s+NEAR\d+\s+/g, '.{0,' + near + '}?');
      var back = '|' + flipNear(font,near);
		return font+back; 
    })
  }
}

function getOrGroups(str) {
  var arr = [];
  var ors = str.match(orRX);
  if (ors != null) ors.forEach(elm => arr.push(elm) );
  return arr;
}

function parseORs(str) {
  var arr = [];
  var ors = getOrGroups(str);
  ors.forEach(itm => {
	var i = itm.replace(/OR /g,'')
    var tarr = '';
    var nears = getNearGroups(i);
	var theRest = i.replace(/\w+\s+NEAR\d+\s+\w+/g, '').match(/(?<=")\b.+?\b(?=")|\w+/g);
	nears ? nears.forEach(elm=> tarr = tarr + elm + '|') : ''; 
	theRest ? theRest.forEach(elm=> tarr = tarr + elm + '|') : ''; 
	arr.push(tarr.replace(/\|$/,''));
  })
  return arr;
}

function getAndGroups(str) {
  var arr = [];
  var str = str.replace(/\bNOT\s+(\w+|".+?")|\s+-\s{0,2}(\w+|".+?")/g, '');
  var onlyAND = str.replace(orRX, '').replace(/\bAND\b/g, '');
  var noNear = onlyAND.replace(/\w+\s+NEAR\d+\s+\w+/g, '').replace(/"\b.+?\b"/g, '');
  var x = /\b\w+\b/g;
  var quoted = getQuoted(onlyAND);
  var near = getNearGroups(onlyAND);
  if (noNear.match(x) != null) noNear.match(x).forEach(elm => arr.push(elm) );
  if (quoted != null) quoted.forEach(elm => arr.push(elm) );
  if (near != null) near.forEach(elm => arr.push(elm) );
  return arr;
}

function getBoolAsArray(str) {
  var arr = [];
  parseORs(str).forEach(itm => arr.push(itm) );
  getAndGroups(str).forEach(itm => arr.push(itm) );
  return arr;
}

  function searchByBoolArr(barr, str) {
    return barr.every(itm => {
      var x = new RegExp(itm, 'i');
      return x.test(str);
    });
  }

  function searchBy(barr, jobDarr) {
    var arr = [];
    for (i = 0; i < jobDarr.length; i++) {
      if (searchByBoolArr(barr, jobDarr) === true) arr.push(jobDarr);
    }
    return arr;
  }

getBoolAsArray('("general sales manager" OR "general manager") AND (Generate NEAR4 revenue OR assist NEAR6 customer)')

// searchBy()

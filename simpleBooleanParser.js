var testTile = "Director of Local Sales";

var boolie = `(sales OR marketing) AND (director OR manager OR president)`;

function parseAsRegexArr(bool){
var orx = "\\(.+?\\)|(\\(\\w+\\s{0,1}OR\\s|\\w+\\s{0,1}OR\\s)+((\\w+\s)+?|(\\w+)\\)+)+?";
var rxReady = (s) => s ? s.replace(/"/g, '\\\\b').trim().replace(/\)/g, '').replace(/\(/g, '').replace(/\s+/g, '.{0,14}') : s;
var orMatch = bool ? bool.match(new RegExp(orx, 'g')) : [];
var orArr = orMatch ? orMatch.map(b=> rxReady(b.replace(/\s+OR\s+/g, '|'))) : [];
var noOrs = bool ? bool.replace(new RegExp(orx, 'g'), '').split(/\s+[AND\s+]+/) : bool;
var ands = noOrs ? noOrs.map(a=> rxReady(a)) : [];
var xArr = ands.concat(orArr).filter(i=> i!= '').map(x=> new RegExp(x, 'i'));
return xArr;
}

var isTitle = (t,x) => x.every(r=> r.test(t)); 

console.log(isTitle(testTile,parseAsRegexArr(boolie)))


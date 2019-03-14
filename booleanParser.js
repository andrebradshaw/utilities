var searchStringTest = 'work NEAR4 test two AND (Manager NEAR5 sales OR Director NEAR5 sales OR VP NEAR5 sales OR lead NEAR5 sales OR president NEAR5 sales OR "business development" NEAR5 manager OR director NEAR5 "business development" OR president NEAR5 "business development" OR pickleBoy) AND Media AND digital AND Campaign Management AND (strategy OR growth OR build) AND TestDangle AND (testfinal OR test)';

var rx = (s,t) => t ? new RegExp(s,t) : new RegExp(s);
 
var orGroupX = /\(.+?\)|(\(\w+\s{0,1}OR\s|\w+\s{0,1}OR\s)+((\w+\s)+?|(\w+)\)+)+?/gi;
var nearX = "\\s+NEAR\\d+\\s+";
var orChopX = "\\s+OR\\s+|$";
var andChopX = "\\s+AND\\s+|$";
var andCleanX = "^\\s*\\bAND\\b\\s*|\\s*\\bAND\\b\\s*$";

var rxReady = (s) => s.replace(/\?/g, '\\?').replace(/\+/g, '\\+').replace(/\//g, '\\/');
var chopOn = (x, s) => s.replace(x, '\n').match(/.+\n/g).map(n => n.replace(/\n|"|\(|\)/g, ''));
var flipNear = (s, n) => /(?<=\?).+/.exec(s)[0] + '.{0,' + n + '}?' + /^.+?(?=\.\{)/.exec(s)[0];

function parseNear(str) {
  if (rx(nearX,'i').test(str) === true) {
    var d = Math.ceil(parseInt(/(?<=NEAR)\d+/.exec(str)[0]) * 7);
    var font = str.replace(rx(nearX,'gi'), '.{0,' + d + '}?');
    var back = '|' + flipNear(font, d);
    var nearoutput = (font + back).replace(/\s+/g, '.{0,8}?');
    return nearoutput;
  } else {
    return str;
  }
}

function getAndGroups(str) {
  var noOrs = str.replace(orGroupX, '').replace(rx(andCleanX,'gi'), '');
  var ands = chopOn(rx(andChopX,'gi'), noOrs).map(n => n.replace(/\s*\bAND\b\s*/g, ''));
  return ands.map(itm => parseNear(itm));
}

function parseOrGroups(arr) {
  return arr.map(go => {
    var tempStr = '';
    chopOn(rx(orChopX,'gi'), go).forEach(itm => {
      tempStr = tempStr + parseNear(itm) + '|';
    });
    return tempStr.replace(/\|$/g, '');
  });
}

function getOrGroups(str) {
  var arr = [];
  var ors = str.match(orGroupX);
  if (ors != null) ors.forEach(elm => arr.push(elm));
  return arr;
}

function parseBooleanStringAsArrayOfRegExp(str,tags) {
  var andGroups = getAndGroups(str);
  var orGroups = getOrGroups(str);
  var parsedOrGroups = parseOrGroups(orGroups);
  var catout = (parsedOrGroups.concat(andGroups)).map(itm=>rx(itm,tags));
  return catout;
}
parseBooleanStringAsArrayOfRegExp(searchStringTest,'gi')

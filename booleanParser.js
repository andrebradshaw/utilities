//new and simple version. The method below is over engineered
var parseSearch = (str)=> /\\|\[|\?|\.\+/.test(str) ? str.split(/\s{0,}\band\b\s{0,}/i).map(el=> el.replace(/\s{0,}\bor\b\s{0,}/ig, '|')).map(el=> new RegExp(el,'i')) : str.split(/\s{0,}\band\b\s{0,}/i).map(el=> el.replace(/\s{0,}\bor\b\s{0,}/ig, '|').replace(/"/g,'\\b').replace(/\(/g,'').replace(/\)/g,'')).map(el=> new RegExp(el,'i'));
var regXall = (x,s) => x.map(el=> el.test(s));

/*
supports ES5, 
supports regex in place of string, this is so a user can select a different search type (boolean vs regex), but we still process the search with the same script.

Operators: 
  OR == any of the words, should be enclosed in parentheses, not case sensitive
  AND == all of these words / groups of OR, not case sensitive
  * == zero or one word
  " == word boundary. Quotes are not necessary unless you need a word boundary
  a single white space is automatically coverted to a wildcard.
*/
function parseAsRegexArr(bool) {
  if (typeof bool == 'object') {
    /* if object, and ensure it is returned as an array */
    return Array.isArray(bool) ? bool : [bool];
  } else {
    function rxReady(s) {
      return s ? s.replace(/"/g, '\\b').trim().replace(/\)/g, '').replace(/\(/g, '').replace(/\s+/g, '.{0,2}').replace(/\//g, '\\/').replace(/\+/g, '\\+').replace(/\s*\*\s*/g, '\\s*\\w*\\s+') : s;
    }

    function checkSimpleOR(s) {
      return /\bor\b/i.test(s) && /\(/.test(s) === false && /\b\s+and\s\b/.test(s) === false;
    }

    function checkAndOrSimple(s){
      return [/\bor\b/i,/\band\b/i].every(
        function(el){ return el.test(s) } 
      ) && /\(/.test(s) === false;
    }
    if(checkAndOrSimple(bool)){
      var x = bool.replace(/\s+OR\s+|\s*\|\s*/gi, '|').replace(/\//g, '\\/').replace(/"/g, '\\b').replace(/\s+/g, '.{0,2}').replace(/\s*\*\s*/g, '\\s*\\w*\\s+').split(/\band\b/).map(function(el){ return new RegExp(el.trim(), 'i')});
      console.log(x);
      return x;
    } else if (checkSimpleOR(bool)) {
      var x = new RegExp(bool.replace(/\s+OR\s+|\s*\|\s*/gi, '|').replace(/\//g, '\\/').replace(/"/g, '\\b').replace(/\s+/g, '.{0,2}').replace(/\s*\*\s*/g, '\\s*\\w*\\s+'), 'i');
      var xArr = [x];
      console.log(xArr);
      return xArr;
    } else {
      var orx = "\\(.+?\\)|(\\(\\w+\\s{0,1}OR\\s|\\w+\\s{0,1}OR\\s)+((\\w+\s)+?|(\\w+)\\)+)+?";
      var orMatch = bool ? bool.match(new RegExp(orx, 'g')) : [];
      var orArr = orMatch ? orMatch.map(function(b) {
        return rxReady(b.replace(/\s+OR\s+|\s*\|\s*/gi, '|'))
      }) : [];
      var noOrs = bool ? bool.replace(new RegExp(orx, 'g'), '').split(/\s+[AND\s+]+/i) : bool;
      var ands = noOrs ? noOrs.map(function(a) {
        return rxReady(a)
      }) : [];
      var xArr = ands.concat(orArr).filter(function(i) {
        return i != ''
      }).map(function(x) {
        return new RegExp(x, 'i')
      });
      console.log(xArr);
      return xArr;
    }
  }
}

function booleanSearch(bool, target) {
  var arr = parseAsRegexArr(bool);
  return arr.every(function(x) {
    return x.test(target);
  });
}

/*usage*/

booleanSearch('select * repo AND (click OR repo)','Navigate your code with ease. In select public repositories, you can now click on function and method calls to jump to their definitions in the same repository.');
//expected output == true

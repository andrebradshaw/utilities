var searchStringTest = 'work NEAR4 test two AND (Manager NEAR5 sales OR Director NEAR5 sales OR VP NEAR5 sales OR lead NEAR5 sales OR president NEAR5 sales OR "business development" NEAR5 manager OR director NEAR5 "business development" OR president NEAR5 "business development" OR pickleBoy) AND Media AND digital AND Campaign Management AND (strategy OR growth OR build) AND TestDangle';

function parseSearchStringAsRegX(str) {
  var orGroupX = /\(.+?\)|(\(\w+\s{0,1}OR\s|\w+\s{0,1}OR\s)+((\w+\s)+?|(\w+)\)+)+?/gi;

  var orChopX = /\s+OR\s+|$/gi;
  var andChopX = /\s+AND\s+|$/gi;
  var andCleanX = /^\s*\bAND\b\s*|\s*\bAND\b\s*$/gi;
  var nearX = /\s+NEAR\d+\s+/g;
  var rxReady = (s) => s.replace(/\?/g, '\\?').replace(/\+/g, '\\+').replace(/\//g, '\\/');

  var chopOn = (x, str) => str.replace(x, '\n').match(/.+\n/g).map(n => n.replace(/\n|"|\(|\)/g, ''));

  var flipNear = (str, n) => /(?<=\?).+/.exec(str)[0] + '.{0,' + n + '}?' + /^.+?(?=\.\{)/.exec(str)[0];

  function parseNear(str) {
    if (nearX.test(str)) {
      var near = Math.ceil(parseInt(/(?<=NEAR)\d+/.exec(str)[0]) * 7);
      var font = str.replace(/\s+NEAR\d+\s+/g, '.{0,' + near + '}?');
      var back = '|' + flipNear(font, near);
      return (font + back).replace(/\s+/g, '.{0,8}?');
    } else {
      return str;
    }
  }

  function getOrGroups(str) {
    var arr = [];
    var ors = str.match(orGroupX);
    if (ors != null) ors.forEach(elm => arr.push(elm));
    return arr;
  }

  function getAndGroups(str) {
    var noOrs = str.replace(orGroupX, '').replace(andCleanX, '');
    var ands = chopOn(andChopX, noOrs).map(n => n.replace(/\s*\bAND\b\s*/g, ''));
    return ands.map(itm => parseNear(itm));
  }

  function parseOrGroups(arr) {
    return arr.map(g => {
      var tempStr = '';
      chopOn(orChopX, g).forEach(itm => {
        tempStr = tempStr + parseNear(itm) + '|';
      });
      return tempStr.replace(/\|$/g, '');
    });
  }

  var andGroups = getAndGroups(searchStringTest);
  var orGroups = parseOrGroups(getOrGroups(searchStringTest));

  return (orGroups.concat(andGroups)).map(itm => new RegExp(rxReady(itm), 'i'));
}
parseSearchStringAsRegX(searchStringTest)

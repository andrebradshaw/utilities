// Original video build: https://www.youtube.com/watch?v=ZmdN51__4_I
// current updated code review: https://youtu.be/d1SZyoC9wWY
var your_sheet_id = '1IkkV6gXGXdMPE-iXDVkDgxX6u6BcBfBcRbAy_mWHiwM';
var your_sheet_name = 'Report';

var ss = SpreadsheetApp.openById(your_sheet_id);
var report = ss.getSheetByName(your_sheet_name);

function convertLinks() {
  var header = Array.from(report.getRange(1, 1, 1, report.getLastColumn()).getValues())[0];
  var rows = report.getLastRow();
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  var cols_with_links = header.map((i,n,r) => { //i == the current value on the iteration. n == the index, r == the full array/header 
    var links = Array.from(report.getRange(1,(n+1),rows,1).getRichTextValues()).map(row=> [row[0].getLinkUrl()]);
    links.shift();
    var head = [[('url_'+i)]];
    var new_col = [...head,...links]; //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    return {
      has_links: links.some(v=> v[0]), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
      new_col: new_col
    }
  }).filter(r=> r.has_links);

  cols_with_links.forEach(col=> {
    report.getRange(1, report.getLastColumn()+1, col.new_col.length, 1).setValues(col.new_col);
  })
}

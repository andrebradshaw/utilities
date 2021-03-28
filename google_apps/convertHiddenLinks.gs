// Original video build: https://www.youtube.com/watch?v=ZmdN51__4_I
// current updated code inserts a column directly after any column with a link. The inserted column includes extracted links from the original.

var your_sheet_id = '1IkkV6gXGXdMPE-iXDVkDgxX6u6BcBfBcRbAy_mWHiwM';
var your_sheet_name = 'Report';

var ss = SpreadsheetApp.openById(your_sheet_id);
var report = ss.getSheetByName(your_sheet_name);

function convertLinks() {
  var header = Array.from(report.getRange(1, 1, 1, report.getLastColumn()).getValues())[0];
  var rows = report.getLastRow();
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  var cols_with_links = header.map((i,n,r) => { //i == the current value on the iteration. n == the index, r == the full array/header 
    let links = Array.from(report.getRange(1,(n+1),rows,1).getRichTextValues()).map(row=> [row[0].getLinkUrl()]);
    links.shift();
    let head = [[('URL FOR '+i)]];
    let new_col = [...head,...links]; //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    return {
      col_index: n,
      has_links: links.some(v=> v[0]), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
      new_col: new_col
    }
  }).filter(r=> r.has_links);
  cols_with_links.forEach((itm,i,r)=> {
    let target_col_index = itm.col_index+i+2;
    report.insertColumnsAfter((itm.col_index+i+1),1);
    report.getRange(1,target_col_index,itm.new_col.length).setValues(itm.new_col);
  })
}

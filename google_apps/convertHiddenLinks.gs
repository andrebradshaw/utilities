var your_sheet_id = '1IkkV6gCCCdMPE-YXDVkDgxs6u6BcBfBcRbAy_hasfBS'
var your_sheet_name = 'Report';
var your_target_column_header_name = 'Resume';

var ss = SpreadsheetApp.openById(your_sheet_id);
var report = ss.getSheetByName(your_sheet_name);

function convertLinks() {
  var table = Array.from(report.getRange(1, 1, report.getLastRow(), report.getLastColumn()).getValues());
  var col_num = table[0].indexOf(your_target_column_header_name) + 1;
  var rows = report.getLastRow();
  var last_col = report.getLastColumn();
//  for(var i=2; i<rows; i++){
//    var link = report.getRange(i, col_num).getRichTextValue().getLinkUrl();
//    report.getRange(i, last_col+1).setValue(link);
//  }
  
  // lines 19 and 20 are the must faster method for extracting and placing the links
  var links = Array.from(report.getRange(1,col_num,rows,1).getRichTextValues()).map(r=> [r[0].getLinkUrl()])//.getLinkUrl(0,col_num);
  report.getRange(1, (last_col+1), links.length, 1).setValues(links);
  
}

const getColumn = (i,table) => table.map(col=> col[i]); 
/* utility sheets
returns column as an array. arguments are the column index and the table.
*/

const getTableValuesBy = (sheet) => sheet.getRange(1,1,1,1).isBlank() ? [] : Array.from(sheet.getRange(1,1,sheet.getLastRow(),sheet.getLastColumn()).getValues()); 
/* utility sheets
getTableValuesBy => gets full sheet as Table, by the sheetObject. This only retrieves the max rows and columns containing data. Returns an empty array if the first cell is blank
*/

const getColIndexBy = (table,header_name) => table[0].indexOf(header_name); 
/* utility sheets
getColIndexBy => gets the index number (not sheet col number) of the specified header within a given sheet
*/

const getRowIndexBy = (table,header_name,query) => table.findIndex(r=> r[getColIndexBy(table,header_name)] == query);
/* utility sheets
getRowIndexBy => gets the index number of the first string matching row value within a specified headername within a given sheet.
*/

const getRowIndexRegX = (table,header_name,x) => table.findIndex(r=> x.test(r[getColIndexBy(table,header_name)]));
/* utility sheets
getRowIndexBy => gets the index number of the first matching regular expression on a row value within a specified headername within a given sheet.
*/

function insertRowByColumnLooper(sheet,arr,row){
  var table = getTableValuesBy(sheet);
  for(var i=0; i<arr.length; i++){
    var colIndex = getColIndexBy(table,arr[i][0]);    
    if(colIndex > -1){//insures we found a matching headername   
      sheet.getRange(row, (colIndex+1)).setValue(arr[i][1]);
    }
  }
}
/* utility sheets
insertRowByColumnLooper => takes a sheetTable, 2D array with the [[header_name,value_to_set]], and the designated row to set, and sets the data in a loop. The headername is passed through another function to gain the appropriate column index to set.
*/

function insertAdditionalHeaders(sheet,headers){ 
  if(sheet.getRange(1,1,3,3).isBlank()){ //assumes that we need to add headers if the first three rows and columns are blank
    sheet.getRange(1,1,1,headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }else{
    var head = Array.from(getTableValuesBy(sheet))[0];
    var addThese = headers.filter(itm=> head.every(cell=> cell != itm ) );
    if(addThese.length > 0){
      sheet.getRange(1,(sheet.getLastColumn()+1),1,addThese.length).setValues([addThese]);
    }
  }
}


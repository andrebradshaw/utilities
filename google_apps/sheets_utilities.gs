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
getRowIndexByX => gets the index number of the first matching regular expression on a row value within a specified headername within a given sheet.
*/

function dateString(d){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var date = new Date(d);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function insertRowByColumnLooper(sheet,arr,row){
  var table = getTableValuesBy(sheet);
  for(var i=0; i<arr.length; i++){
    var colIndex = getColIndexBy(table,arr[i][0]);    
    if(colIndex > -1){//insures we found a matching headername   
      var val = typeof arr[i][1] == 'object' ? JSON.stringify(arr[i][1]) : arr[i][1]; // this converts objects to strings so we can insert them into cells 
      sheet.getRange(row, (colIndex+1)).setValue(val);
    }
  }
}
/* utility sheets
insertRowByColumnLooper => takes a sheetTable, 2D array with the [[header_name,value_to_set]], and the designated row to set, and sets the data in a loop. The headername is passed through another function to gain the appropriate column index to set.
*/

function insertAdditionalHeaders(sheet,headers){ 
  if(sheet.getRange(1,1,3,1).isBlank()){ //assumes that we need to add headers if the first three rows and columns are blank
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

function getOrNewSheetByDomainReference(obj){
  var all_sheets = obj.spreadsheet.getSheets(); // https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getSheets()
  var target_sheet = all_sheets.filter(sheet=> sheet.getName() == obj.sheetname);
  if(target_sheet.length){
    return target_sheet[0]; // returning the first index since this is a filtered array.
  }else{
    var new_sheet = obj.spreadsheet.insertSheet(obj.sheetname,0);
    return new_sheet;
  }
}


function getOrNewSpreadsheet(obj){ //returns spreadsheet by id or create's new sheet && returns. takes obj.spreadsheet_id to lookup the id, or creates new sheet with obj.spreadsheet_name.
  var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];
  try{
    return SpreadsheetApp.openById(obj.spreadsheet_id);
  }
  catch(err){
    return SpreadsheetApp.create((obj.spreadsheet_name || new Date().getTime() + ' - ' + weekday +' '+ dateString(new Date()) ), 2, 10);
  }
}

function addObjectToSheet(obj){ // ensure the first object is always the unique identifier
  var spreadsheet = getOrNewSpreadsheet(obj);
  obj['spreadsheet'] = spreadsheet;
  var target_sheet = getOrNewSheetByDomainReference(obj); // returns target sheetname. creates new sheet if it does not exist.
  delete obj.spreadsheet;
  delete obj.spreadsheet_id;
  delete obj.spreadsheet_name;
  delete obj.sheetname; 
  
  var header = Object.keys(obj); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  var data_array = Object.entries(obj); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
  var current_table = getTableValuesBy(target_sheet);

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  var target_index = current_table.findIndex(row=> row[0] == data_array[0][1]); //this assumes the first item in your object/array is the Unique Identifier.

  if(target_index > 0) {
    insertAdditionalHeaders(target_sheet,header); // this creates new headers as we need them in reference to the object received 

    insertRowByColumnLooper(target_sheet,data_array,(target_index+1)); //this overrides the existing record. Opportunity to create a function to handle the existing data and only overrite new columns, or merge new text.

    return 'overwritten on row '+(target_index+1)+'\n'+JSON.stringify(obj);
  } else {
    insertAdditionalHeaders(target_sheet,header); // this creates new headers as we need them in reference to the object received 

    target_sheet.insertRowsBefore(2, 1); // https://developers.google.com/apps-script/reference/spreadsheet/sheet#insertrowsrowindex

    insertRowByColumnLooper(target_sheet,data_array,2); 
    return 'added\n'+JSON.stringify(obj);
    // takes a sheetTable, 2D array with the [[header_name,value_to_set]], and the designated row to set, and sets the data in a loop. The headername is passed through another function to gain the appropriate column index to set.
  }
}

function test(){
  Logger.log(addObjectToSheet({spreadsheet_name: 'testing', sheetname: 'profiles', firstname: 'André', lastname: 'Bradshaw'}));
}

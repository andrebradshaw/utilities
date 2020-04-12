function multiJSON(jdat,filename){
  var is_array = typeof jdat == 'object' && Array.isArray(jdat) ? true : false;
  var sheet_name = filename.toLowerCase().replace(/^\W*|\W*$/g,'').replace(/\W+/g,'_');
  function processArrays(arr){
    var obj = {};
    arr.forEach(r=> {
      var entr = Object.entries(r);
      entr.forEach(kv=> {
        if(obj[kv[0]]){
          if(Array.isArray(kv[1])){
            kv[1].forEach(v=> obj[kv[0]].push(v));
          }else{
            obj[kv[0]].push(kv[1])
          }
        }else{
          if(Array.isArray(kv[1])){
            obj[kv[0]] = [];
            kv[1].forEach(v=> obj[kv[0]].push(v));
          }else{
            obj[kv[0]] = [kv[1]];
          }
        }
      });
    });
    return obj;
  }

  if(is_array){
    var array_items_are_all_objects = jdat.every(r=> Object.entries(r).every(kv=> typeof kv[1] == 'object') );
    if(array_items_are_all_objects){
      return processArrays(jdat);
    }else{
      var single_sheet = {};
      single_sheet[sheet_name] = jdat;
      return single_sheet; //this will return the original input. Assumed a flat array of items to convert to a Sheet
    }
  }else{
    var filtered = Object.entries(jdat).filter(kv=> typeof kv[1] == 'object' && Array.isArray(kv[1]));
    if(filtered.length){
      var flattened = filtered.map(kv=> kv[1]).flat()
      return processArrays(flattened);
    }else{
      var dat_obs = Object.entries(jdat).filter(kv=> typeof kv[1] == 'object');
      if(dat_obs.length){
//         var twice_filtered = dat_obs.map(d=> Object.entries(d[1]).filter(kv=> kv[]))
      }else{
        return false;
      }
    }
  }
}
//multiJSON(fileArray,'test_sheet')

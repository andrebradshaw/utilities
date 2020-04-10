function multiJSON(jdat){
  var is_array = typeof jdat == 'object' && Array.isArray(jdat) ? true : false;
  
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
    }
  }else{
    var filtered = Object.entries(jdat).filter(kv=> typeof kv[1] == 'object' && Array.isArray(kv[1]));
    if(filtered.length){
      return processArrays(jdat);
    }else{
      var dat_obs = Object.entries(jdat).filter(kv=> typeof kv[1] == 'object');
//       var twice_filtered = dat_obs.map(d=> Object.entries(d[1]).filter(kv=> ))
    }
  }
}
flattenJSON(fileArray)

function filterObjectByKeys(keys,obj,k){
  Object.entries(obj).forEach(kv=> {
    if(keys.some(kk=> kv[0] == kk)) k[kv[0]] = kv[1];
  });
  return k;
}

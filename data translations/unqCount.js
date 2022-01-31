function unqCount(records,key){
    let keyvals = [];
    Object.entries(records.reduce((obj, b) => {
        obj[b] = ++obj[b] || 1;
        return obj;
      }, {})).forEach(kv=> {
        let k = {};
        k[key] = kv[0];
        k['count'] = kv[1];
        keyvals.push(k);
      });
      return keyvals.sort((a,b)=> a.count > b.count ? -1 : 0)
}

unqCount(
    [
new Date().getTime(),new Date().getTime(),new Date().getTime()
    ],
    'timestamp'
)
//

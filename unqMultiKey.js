var unqMultiKey = (a,o,keys) => {
    return a.filter(i=> {
        let mergekey = (keys.map(key=> i[key]).reduce((a,b)=> a+b));
        return o.hasOwnProperty(mergekey) ? false : (o[mergekey] = true);
    })
};
// unqMultiKey(yourarray,{},['your keys'])

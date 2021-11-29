var unqMultiKey = (a,o,keys) => {
    return a.filter(i=> {
        let mergekey = (keys.map(key=> i[key]).reduce((a,b)=> a+b));
        return o.hasOwnProperty(mergekey) ? false : (o[mergekey] = true);
    })
};
// unqMultiKey(yourarray,{},['your keys'])


var unqDiveKey = (a,o,keys) => a.filter(i=> o.hasOwnProperty(dive(i,keys)) ? false : (o[dive(i,keys)] = true) );
var dive = (ob,keys)=> keys.map(itm=> ob = ob[itm] ).at(-1);
// unqDiveKey(profiles,{},['profile','contacts','emails'])

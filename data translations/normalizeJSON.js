function normalizeJSON(arr){
    return arr.map(r=> {
        return Object.entries(r).map(kv=> {
            let obj = {};
            let key = kv[0]?.replace(/#/g,'number')?.replace(/%/g,'percent')?.replace(/-/g,'to')?.replace(/\W+/g,'_')?.replace(/^\b(?=\d)/,'_')?.replace(/_$/,'')?.toLowerCase();
            let val = typeof kv[1] == 'string' ? (/^[\d\.,]+$|^-[\d\.,]+$/.test(kv[1]?.replace(/,/g,'')) ? parseFloat(kv[1]) : /^\$[\d,\.]+$/.test(kv[1]) ? parseFloat(kv[1]?.replace(/\$|,/g,'')) : /[\d\.,]+%$/.test(kv[1]) ? (parseFloat(kv[1]?.replace(/%|,/g,'')) / 100) : kv[1] ) : kv[1];
            obj[key] = val;
            return obj;
        }).reduce((a,b)=> { return {...a,...b} })
    })    
}
/* will take an array of key vals and clean them up into proper JSON format */

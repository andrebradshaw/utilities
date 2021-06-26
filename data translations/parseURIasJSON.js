function parseURIasJSON(url,obj) {
    function tryJSON(s){
        try{ return JSON.parse(decodeURIComponent(s))}
        catch(err){ console.log(err); return s};
    }
    if(url.match(/(?<=\?|\&)\S+?(?=\&|$)/g)) url.match(/(?<=\?|\&)\S+?(?=\&|$)/g).map(r=> r ? r.split(/\=/) : [[]]).forEach(r=> obj[r[0]] = tryJSON(r[1]))
    return obj;
}

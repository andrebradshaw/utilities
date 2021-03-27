function parseURIasJSON(url){
    var obj = {base: url.replace(/\?.+/,'')};
    if(url.match(/(?<=\?|\&)\S+?(?=\&|$)/g)) url.match(/(?<=\?|\&)\S+?(?=\&|$)/g).map(r=> r ? r.split(/\=/) : [[]]).forEach(r=> obj[r[0]] = decodeURIComponent(r[1]))
    return obj;
}

function parseJSONasURI(obj){
    return Object.entries(obj).map((k,i,r)=> i == 0 ? k[1]+'?' : '&'+k[0]+'='+encodeURIComponent(k[1]) ).reduce((a,b)=> a+b);
}

var parsed_uri = parseURIasJSON(window.location.href);
var uri_from_json = parseJSONasURI(parsed_uri);

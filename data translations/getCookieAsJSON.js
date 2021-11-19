function formatJSONstring(s){
    if(/\{\w+:/.test(s)){
        try{
        return JSON.parse(JSON.stringify(s.split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/).map(line=> line.split(/(?<=\w+):/) ).map(kv=> {
                let cleankey = kv[0]?.replace(/^\{/,'')?.replace(/^\b|\b$/g,'"')?.replace(/^'|'$/g,'"');
                let cleanval = tryJSON(kv[1]?.replace(/\}$/,'')?.replace(/^'|'$/g,'"'));
                let decoded = tryATOB(cleanval)
                return {...{ [cleankey]:cleanval},...(decoded ? {[`atob_${cleankey}`]:decoded} : {})};
            }).reduce((a,b)=> { return {...a,...b} })))
        }
        catch(err){return s}
    }else{ return s}
}
function tryATOB(s){
    if(/==$/.test(s)){
        try { return atob(s); } catch(err) { return s}
    }else {return false}
}
function tryJSON(s,type){ 
    try{ return JSON.parse(s) } 
    catch(err){
        try { return type == 'formatJSONstring' ? formatJSONstring(s) : s; }
        catch(err){ return s; }
    }    
}
function getCookieAsJSON(){
    return document.cookie.split(/; /).map(i=> i.replace(/\b=(?!$|=)/,'__________').split(/__________/)).map(kv=> {
        let cleanval = typeof kv[1] == 'string' ? tryJSON(decodeURIComponent(kv[1]),'formatJSONstring') : kv[1];
        let decoded = tryJSON(tryATOB(cleanval),'formatJSONstring');
        return {
            ...{
                [kv[0]]: cleanval
            },
            ...(decoded ? {[`atob_${kv[0]}`]:decoded} : {})
        }
    }).reduce((a,b)=> { return {...a,...b}});
}
getCookieAsJSON()

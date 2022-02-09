function splitName(fullname){
    let nickname = /\w+\s*\(\w+\)\s*\w+/.exec(fullname)?.[1];
    let cleaned_fullname = fullname.replace(/\(.+?\)/g,'').trim();
    let first_name = /^\S+/.exec(cleaned_fullname)?.[0];
    let last_name = /^\S+\s+(.+)/.exec(cleaned_fullname)?.[1];
    let last_names = /\s*-\s*/.test(last_name) ? last_name.split(/\s*-\s*/) : /^\b\w{2}\s\w/.test(last_name) ? [last_name] : last_name.split(/\s/);
    return {
        first_names:[first_name,nickname].filter(i=> i),
        last_names:last_names,
    }
}

function parseSearchStringAsRegexSet(search_string,flag){
    function tryRegExp(s,f){
        try{return new RegExp(s,f)}
        catch(err){return err}
    }
    var and_array = search_string.split(/\sand\s/i).map(i=> i.trim());
    var isNearORSearch = (s)=> /~\d*\s*\(|~\s*\(|\)\s*~/.test(s);
    var splitOr = (s)=> s.split(/\s+OR\s+|\|/i).map(i=> i.trim());
    var perm = a => a.length ? a.reduce((r, v, i) => [ ...r, ...perm([ ...a.slice(0, i), ...a.slice(i + 1) ]).map(x => [ v, ...x ])], []) : [[]]
    var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
    var splitNonPermuOr = (s)=> s.split(/\sOR\s(?!.+?\))/i);
    //\sOR\s(?=\(.+?\)~)
    var processForRexExp = (s)=> s.replace(/"/g,'\\b').replace(/\*\*\*/g,'.{0,60}').replace(/\*/g,'.{0,1}').replace(/\+/g,'\\+');

    var processRemainingSearchString = (s)=> s.trim().split(/\s+\bor\b\s+/i).map(ii=> 
        ii.replace(/\s*\)\s*/g,'')
        .replace(/\s*\(\s*/g,'')
        .replace(/\s+/g,'.{0,3}')
        .replace(/"/g,'\\b')
        .replace(/\*\*\*/g,'.{0,60}')
        .replace(/\*/g,'.{0,1}')
        .replace(/\+/g,'\\+')
    ).reduce((a,b)=> a+'|'+b)


    function processNearORstatemensts(input){
        var extractNearORGroups = (arr)=> 
            arr.map((itm,i,r)=> 
                itm == r[0] ? identifyNearGroupFirstItm(itm)
                : itm == r.at(-1)
                ? identifyNearGroupLastItm(itm)
                : /\(/.test(itm) 
                ? /\(.+?\)/.exec(itm)?.[0] 
                : /.+?(?=\sOR\s)/i.exec(itm)?.[0] 
        ); 
        /* NOTE/TODO => If user uses | instead of OR, this will be a problem*/

        var identifyNearGroupFirstItm = (s)=> /\)$/.test(s) ? Array.from(s.match(/\(.+?\)/g)).at(-1) : s.split(/\sOR\s/i).at(-1);
        var identifyNearGroupLastItm = (s)=> /^\(/.test(s) ? Array.from(s.match(/\(.+?\)/g))[0] : s.split(/\sOR\s/i)[0];
        if(isNearORSearch(input)){
            let joiners = input.match(/~\d*/g)?.[0] ? Array.from(input.match(/~\d*/g)).map(d=> /\d+/.test(d) ? `.{0,${/\d+/.exec(d)?.[0]}}` : `.{0,29}`) : [];
            let near_items = extractNearORGroups(input.split(/~\d*/)).map(itm=> 
                splitOr(processForRexExp(itm))
            ).map(r=> 
                r.some(i=> /\(|\)/.test(i)) ? r : [r[0]]
            );
            let near_perms = perm(near_items).map(arr=> 
                    arr.map(r2=> r2.reduce((a,b)=> a+'|'+b))
                    .map((itm,i)=> itm+(joiners[i] ? joiners[i] : ''))
                    .reduce((a,b)=> a+b))
                .map(itm=> `(${itm})`)
                .reduce((a,b)=> a+'|'+b);

            let remove_this_string_from_input = near_items.map((itm,i,rr)=> 
        itm[0] == rr.at(-1)[0] ? itm.at(-1).replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/\\b/g,'"')
        : itm[0].replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/\\b/g,'"')).reduce((a,b)=> a+'.+?'+b);

            let remaining_input = processRemainingSearchString(input.replace(new RegExp(remove_this_string_from_input,'i'),`_____REPLACER_____`));
            return {
                permutation_x_string:near_perms,
                remaining_input: remaining_input,
                fully_parsed: remaining_input.replace(/_____REPLACER_____/,`(${near_perms})`)
            };
        }else    return null;
    }

    function processNonMultiNear(input){
        let joiners = input.match(/~\d*/g)?.[0] ? Array.from(input.match(/~\d*/g)).map(d=> /\d+/.test(d) ? `.{0,${/\d+/.exec(d)?.[0]}}` : `.{0,29}`) : []
        let items = perm(input.split(/~\d*/));
        return items.map(arr=> 
            arr.map((itm,i)=> itm+(joiners[i] ? joiners[i] : '')).reduce((a,b)=> a+b)
        ).reduce((a,b)=> a+'|'+b)
    }

    let and_sets = and_array.map(and=> {
        let multi_near = processNearORstatemensts(and);
        return multi_near?.fully_parsed ? multi_near?.fully_parsed : processRemainingSearchString(processNonMultiNear(and))
    })
    return and_sets.map(xs=> tryRegExp(xs,flag)).filter(x=> x);

}

parseSearchStringAsRegexSet('(chili OR bumper OR tomato) OR ("bcba" OR "lba" OR "babc")~14(therap OR consult OR analyst)~(work OR play) OR (bunny OR frog OR tomato)','i')

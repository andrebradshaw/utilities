function parseSearchStringAsRegexSet(search_string){
    var isNearORSearch = (s)=> /~\d*\s*\(|~\s*\(|\)\s*~/.test(s);
    var splitOr = (s)=> s.split(/\s+OR\s+|\|/i).map(i=> i.trim());
    var perm = a => a.length ? a.reduce((r, v, i) => [ ...r, ...perm([ ...a.slice(0, i), ...a.slice(i + 1) ]).map(x => [ v, ...x ])], []) : [[]]
    var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
    var splitNonPermuOr = (s)=> s.split(/\sOR\s(?!.+?\))/);

    var processForRexExp = (s)=> s.replace(/\s*\)\s*/g,'')
            .replace(/\s*\(\s*/g,'')
            .replace(/"/g,'\\b')
            .replace(/\*\*\*/g,'.{0,60}')
            .replace(/\*/g,'.{0,1}')

    function permutateNear(input){
        if(isNearORSearch(input)){
            let joiners = input.match(/~\d*/g)?.[0] ? Array.from(input.match(/~\d*/g)).map(d=> /\d+/.test(d) ? `.{0,${/\d+/.exec(d)?.[0]}}` : `.{0,29}`) : [];
            let near_items = input.split(/~\d*/).map(itm=> splitOr(processForRexExp(itm)));
            return {
                near_items:near_items,
                joiners:joiners
            }
        }else    return null;
    }

    function buildPermutationOrStatementRegExString(multi_arr,joiner){
        return unqHsh(multi_arr.map((valr,ri,rr)=> {
            let remaining_subs = multi_arr.filter(t=> JSON.stringify(t) != JSON.stringify(valr));
            return valr.map(val=> {
                return remaining_subs.map(sbr=> [val,(sbr[ri] ? sbr[ri] : sbr.at(-1))])
            }).map(rrr=> unqHsh(rrr.flat(),{}))
        }).flat().map(rrr=> perm(rrr)).map(ooo=> ooo.map(rrr=> rrr.reduce((a,b)=> a+joiner+b))).flat(),{}).reduce((a,b)=> a+'|'+b);
    /*NOTE: This is duplicate efforts and wasting compute power. 
    Really need to splice the arr instead of filtering it, but that will require a recursive function, and fuck that noise -- for now */
    }

//     let test_data = permutateNear()


    var test_array = test_data.near_items;

    buildPermutationOrStatementRegExString(test_array.sort((a,b)=> a.length > b.length ? -1 : 0),'.{0,23}');
}

// ("bcba" OR "lba" OR "babc")~14(therap OR consult OR analyst)~work OR bunny

// ("bcba" OR "lba" OR "babc")~(therap OR consult OR analyst)~work OR bunny

// "bcba"~14(therap OR consult OR analyst)~work OR bunny

// "bcba"~therap~work OR bunny

// ("bcba" OR "lba" OR "babc")~therap OR consult OR analyst~work OR bunny

// ("bcba" OR "lba" OR "babc")~therap analyst~work OR bunny

// ("bcba" OR "lba" OR "babc")

// ("bcba" OR "lba" OR "babc") OR bunny

// (frog OR bunny OR tomato)

// reg~stst



// (?<=(OR.+?|^)).+?(?=OR)
// var xarr = parseSearchStringAsRegexSet(`("bcba" OR "lba" OR "babc")~14(therap OR consult OR analyst)~work`)

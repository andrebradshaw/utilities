const parseStringAsXset = (str) => str
.split(/\s+\band\b\s+|(?<!\s+and\b)\s+\(|\)\s+(?!\band\b)/i)
    .map(el=> 
        el.split(/\s+\bor\b\s+/i).map(ii=> 
            ii.replace(/\s*\)\s*/g,'')
            .replace(/\s*\(\s*/g,'')
            .replace(/\s+/g,'.{0,3}')
            .replace(/"/g,'\\b')
            .replace(/\*/g,'\\w*')
            .replace(/\*\*\*/g,'.{0,60}'))
                .reduce((a,b)=> a+'|'+b)).filter(el=> el).map(el=> new RegExp(el,'i'));
parseStringAsXset(`("test this" or run that )  and run the jewels  (one OR two)`)

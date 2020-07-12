var isALLCAPS = (s) => s.split(/\W/).filter(r=> /[a-zA-Z]/.test(r)).every(r=> /\b[A-Z0-9]+\b/.test(r));

isALLCAPS(`THIS IS A MESSAGE 4 YOU`) // true
isALLCAPS(`THIS IS A MESSAGE 4 you`) // false

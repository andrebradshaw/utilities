var fixParagraphCase = (s)=> s.split(/\s+\.|\.\s+/).map(s=> s.toLowerCase().replace(/^[a-zA-Z]/, i=> `${i.toUpperCase()}`)).reduce((a,b)=> a+'. '+b);

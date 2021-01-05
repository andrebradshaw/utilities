`PASTE_YOUR_COLUMN_HERE`.split(/\n/).map(r=> /\[/.test(r) ? JSON.parse(r.trim().replace(/'/g,'"')).reduce((a,b)=> a+'\t'+b) : r).reduce((a,b)=> a+'\n'+b);

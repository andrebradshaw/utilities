var tsvTo2dArr = (tsv) => csv.split(/\r\n|\n/).map(itm=> itm.match(/.+?(?=\t|$)/g).map(s=>s.replace(/\t/, '')));

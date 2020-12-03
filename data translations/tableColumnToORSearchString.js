function tableColumnToORSearchString(string_input){
    const unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
    const unq_items = unqHsh(string_input.split(/\n/).map(r=> r.trim().toLowerCase()).filter(r=> r),{});
    return unq_items.reduce((a,b)=> a+'" OR "'+b)
}
tableColumnToORSearchString(`COPY_AND_PASTE_YOUR_COLUMN_HERE`)

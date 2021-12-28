var transpose = (a)=>  a[0].map((_, c)=> a.map(r=> r[c])); 

function reOrderTable(tsv,target_header){
    var table = tsv.split(/\n/).map(row=> row.split(/\t/));
    let header = table[0];
    var trans_table = transpose(table);
    var reordered_table = target_header.map((h,i,r)=> trans_table[target_header.findIndex(t=> t == header[i])]  );
    return transpose(reordered_table)

//     trans_table.map((/
}

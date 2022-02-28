

const fs = require('fs');

function unqKey(array,key){  var q = [];  var map = new Map();  for (const item of array) {    if(!map.has(item[key])){        map.set(item[key], true);        q.push(item);    }  }  return q;}
var subArr = (r, n) => r.reduceRight((a,b,c,d) => [...a, d.splice(0,n)],[]);

function merger(target_files_folder,merged_files_folder,newname,key_id){
    var files = fs.readdirSync(target_files_folder);
    var contain_arr = [];
    var folder_exists = fs.existsSync(merged_files_folder)
    if(!folder_exists){        fs.mkdirSync(merged_files_folder)    }
    var record_sizes = [];
    for(let i=0; i<files.length; i++){
        let file = fs.readFileSync(target_files_folder+'/'+files[i]);
        let data = JSON.parse(file);
        record_sizes.push(data.map(r=> JSON.stringify(r).length / 1025));
        contain_arr.push(data);
    }
    let record_kbs = record_sizes.flat();
    let average_record_kbs = record_kbs.reduce((a,b)=> a+b) / record_kbs.length;
    let chop_on = Math.ceil(320000/average_record_kbs);
    let deduped = unqKey(contain_arr.flat(),key_id);
    let chopped =  subArr(deduped, chop_on);
    for(let cc=0; cc<chopped.length; cc++){
        fs.writeFileSync(`${merged_files_folder}/${cc} ${newname} ${chopped[cc].length}.json`,JSON.stringify(chopped[cc]))
    }
}
merger(`./target files - raw`,'./merged files - deduped','merged','public_id')

// node --max-old-space-size=16384 merge.js

    var transpose = (a)=>  a[0].map((_, c)=> a.map(r=> r[c])); 

    function reOrderTable(tsv,target_header,keep_extra_cols){
        var table = tsv.split(/\n/).map(row=> row.split(/\t/));
        let header = table[0];
        var trans_table = transpose(table);
        var deepest = Math.max(...trans_table.map(t=> t.length));
        var leftover_header = header.filter(h=> target_header.every(i=> i != h));
        var extra_cols = leftover_header.map((h,i,r)=> trans_table[trans_table.findIndex(column=> column[0] == r[i])] ? trans_table[trans_table.findIndex(column=> column[0] == r[i])] : [...[h],...Array(deepest - 1).fill().map(t=> '')] );
        var reordered_table = target_header.map((h,i,r)=> trans_table[trans_table.findIndex(column=> column[0] == r[i])] ? trans_table[trans_table.findIndex(column=> column[0] == r[i])] : [...[h],...Array(deepest - 1).fill().map(t=> '')] );
        return transpose([...reordered_table,...(keep_extra_cols ? extra_cols : []]).map(row=> row.map(cell=> `${cell}\t`).reduce((a,b)=> a+b)).map(row=> `${row}\n`).reduce((a,b)=> a+b);
    }

    var remapped_table = reOrderTable(input_table,target_header);

    function createUploadHTML(){
        const gi = (o, s) => o ? o.getElementById(s) : null;
        const ele = (t) => document.createElement(t);
        const attr = (o, k, v) => o.setAttribute(k, v);
        const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
        if(gi(document,'pop_FileUploader')) gi(document,'pop_FileUploader').outerHTML = '';
        var popCont = ele("div");
        document.body.appendChild(popCont);
        a(popCont, [["id", "pop_FileUploader"],['style','position: fixed; top: 20%; left: 20%; width: 420px; height: 100px; background: #2c2c2c; border: 1px solid #1a1a1a; border-radius: .5em; padding: 6px; z-index: 12000;']]);
        var closeBtn = ele("div");
        a(closeBtn,[["id", "note_btn_close"],['style','background: transparent; width: 15px; height: 15px; transform: scale(1.8, 1.2) translate(3px,-2px); border-radius: 1em; padding: 0px; color: Crimson; cursor: pointer;']]);
        popCont.appendChild(closeBtn);
        closeBtn.innerText = "X";
        closeBtn.addEventListener("click", close);
        var uploadElm = ele("input");
        a(uploadElm,[["id", "customFileInput"],["type", "file"],["name", "file[]"],["multiple", "true"],['style','background: #2c2c2c;']]);
        popCont.appendChild(uploadElm);
        uploadElm.style.transform = "scale(1.1, 1.1) translate(5%, 80%)";
        uploadElm.addEventListener("change", handleFiles);
        function close() {
          document.body.removeChild(popCont);
        }
    }

    async function handleFiles() {
        function unqKey(array,key){  var q = [];  var map = new Map();  for (const item of array) {    if(!map.has(item[key])){        map.set(item[key], true);        q.push(item);    }  }  return q;}
        var contain_arr = [];
        var files = this.files;
        for(var i=0; i<files.length; i++){
            let uri = await getDataBlob(files[i]);
            if(Array.isArray(JSON.parse(uri))) {JSON.parse(uri).forEach(i=> contain_arr.push(i))} else {contain_arr.push(JSON.parse(uri));}
        }
        document.getElementById('pop_FileUploader').outerHTML = '';
    }

    async function getAsText(d){
      var reader = new FileReader();    /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
      reader.readAsText(d);          /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
      return new Promise((res,rej)=> {  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
        reader.onload = (e) => {        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
          res(e.target.result)
        }
      })
    } 

    async function getDataBlob(url){
      var uri = await getAsText(url);
      return uri;
    }
    createUploadHTML();

    function processInputTables(raw_tables){
        var tables = raw_tables.map(table=> table.split(/\n/).map(row=> row.split(/\t/)));
        var headers = tables.map(row=> row[0]);
        
    }


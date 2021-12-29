function initReorderApp(){

    const cn = (o, s) => o ? o.getElementsByClassName(s) : null;
    const tn = (o, s) => o ? o.getElementsByTagName(s) : null;
    const gi = (o, s) => o ? o.getElementById(s) : null;
    const rando = (n) => Math.round(Math.random() * n);
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const ele = (t) => document.createElement(t);
    const attr = (o, k, v) => {try{o.setAttribute(k, v);} catch(err) {console.log(err)}};
    const a = (l, r) => {if(r) r.forEach(a => attr(l, a[0], a[1]))};

    function inlineStyler(elm,css){
    Object.entries(JSON.parse(
    css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g,'"')
        .replace(/(?<=:\s*.+?);/g,'",')
        .replace(/[a-zA-Z-]+(?=:)/g, k=> k.replace(/^\b/,'"').replace(/\b$/,'"'))
        .replace(/\s*,\s*}/g,'}')
    )).forEach(kv=> { elm.style[kv[0]] = kv[1]});
    }
    function topZIndexer(){
        let n = new Date().getTime() / 100000;
        let r = (n - Math.floor(n)) * 1000;
        return Math.round(n+r);
    }
    function dragElement() { 
        var el = this.parentElement.parentElement;
        var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
        if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
        else this.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            inlineStyler(el,`{z-index: ${topZIndexer()};}`);
        }
        function elementDrag(e) {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            inlineStyler(el,`{top: ${(el.offsetTop - pos2)}px; left: ${(el.offsetLeft - pos1)}px; opacity: 0.85; transition: opacity 100ms;}`);
        }
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            el.style.opacity = "1";
        }
    }






















/*

    ********************************************************************************
                                    REORDER TABLE
    ********************************************************************************

*/
    var transpose = (a)=>  a[0].map((_, c)=> a.map(r=> r[c])); 

    function reOrderTable(tsv,target_header,keep_extra_cols){
        var table = tsv.split(/\n/).map(row=> row.split(/\t/));
        let header = table[0];
        var trans_table = transpose(table);
        var deepest = Math.max(...trans_table.map(t=> t.length));
        var leftover_header = header.filter(h=> target_header.every(i=> i != h));
        var extra_cols = leftover_header.map((h,i,r)=> trans_table[trans_table.findIndex(column=> column[0] == r[i])] ? trans_table[trans_table.findIndex(column=> column[0] == r[i])] : [...[h],...Array(deepest - 1).fill().map(t=> '')] );
        var reordered_table = target_header.map((h,i,r)=> trans_table[trans_table.findIndex(column=> column[0] == r[i])] ? trans_table[trans_table.findIndex(column=> column[0] == r[i])] : [...[h],...Array(deepest - 1).fill().map(t=> '')] );
        return transpose(
            [...reordered_table,...(keep_extra_cols ? extra_cols : [])]
        ).map(row=> row.map(cell=> `${cell}\t`).reduce((a,b)=> a+b)).map(row=> `${row}\n`).reduce((a,b)=> a+b);
    }

    // var remapped_table = reOrderTable(input_table,target_header);







    /*
                CSS BUILDER
    */

                       
    function setQuickliCSS(style_id){
        if(gi(document,`${style_id}_style`)) gi(document,`${style_id}_style`).outerHTML = '';
        let csselm = ele('style');
        a(csselm,[['class',`${style_id}_style`]]);
        document.head.appendChild(csselm);
        csselm.innerHTML = `
            .pad2 {
                padding: 2px;
            }
            .pad4 {
                padding: 4px;
            }
            .pad6 {
                padding: 6px;
            }
            .pad8 {
                padding: 8px;
            }
            .centertext {
                text-align: center;
            }
            .h32 {
                height: 32px;
            }
            .mover-left-gradient {
                background-image: linear-gradient(to bottom right, #ffffff, #ffffff, #f7f9fa);
                border-bottom-right-radius: 1em;
            }
            .textarea {
                outline: none;
                border-radius: 0.4em;
                border: 0px;
                background: transparent;
                box-shadow: rgb(204, 219, 232) 2px 2px 4px 1px inset, rgba(255, 255, 255, 0.5) -1px -2px 4px 2px inset;
                color: #788fa5;
                transition: all 333ms;
            }
            .textarea:focus {
                box-shadow: rgb(204, 219, 232) 2px 4px 4px 1px inset, rgba(255, 255, 255, 0.5) -2px -2px 4px 2px inset;
            }
            .label {
                display: inline-flex;
                align-items: center;
                cursor: pointer;
                color: #394a56;
            }

            .dragged_item:hover {
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
            }
            .dragged_item:active {
                box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 6px 0px, rgba(255, 255, 255, 0.8) -6px -2px 6px -3px;
                background: #ffffff;
            }
            .${style_id} {
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                font-size: 1.2em;
                cursor: pointer;
                background: #ffffff;
                color: #788fa5;
                border-radius: 2em;
                transition: all 111ms;
                user-select: none;
            }
            .${style_id}:hover {
                box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 6px 0px, rgba(255, 255, 255, 0.8) -6px -2px 6px -3px;
                color: #788fa5;
            }
            .${style_id}:active {
                box-shadow:
                -8px -4px 8px 0px #ffffff,
                6px 2px 6px 0px rgb(204, 219, 232),
                4px 4px 4px 0px rgb(204, 219, 232) inset,
                -4px -4px 4px 0px #ffffff inset;
                color: #788fa5;
            }
            `;
    }
    setQuickliCSS('hover_btn');

    /*
    *
    ************************************************************
                        BUILD HTML CONTAINER
    ************************************************************
    * 
    */
    async function buildContainer(){
        // const height = window.innerHeight * 0.8; 
        // const width = window.innerWidth <= 800 ? window.innerWidth * 0.9 : window.innerWidth > 800 && window.innerWidth < 1161 ? window.innerWidth * 0.7 : window.innerWidth * 0.6;
        if(gi(document,'tsv_merger_container')) gi(document,'tsv_merger_container').outerHTML = '';
        const cont = ele('div');
        a(cont,[['id','tsv_merger_container']]);
        let shadow = 'box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;';
        inlineStyler(cont,`{display: grid; grid-template-columns: 32px 1fr 4px; grid-gap: 12px; ${shadow} text-align: left; background: #ffffff; color: #374552; border-radius: 1em; padding: 12px; transition: all 31ms; position: fixed; z-index: ${topZIndexer()}; top: 100px; left: 0px;}`); // max-height: ${height}px; max-width: ${width}px; 
        document.body.appendChild(cont);

            const left_panel = ele('div');
            a(left_panel,[['id','left_panel'],['class','mover-left-gradient']]);
            inlineStyler(left_panel,`{display: grid; grid-template-rows: 32px 1fr; grid-gap: 12px; user-select: none;}`);
            cont.appendChild(left_panel);//${height-60}px
            // inlineStyler(left_panel,`{display: grid; grid-template-rows: 32px ${height-60}px; grid-gap: 12px; user-select: none;}`); //change grid height to match contents

                const cls = ele('div');
                left_panel.appendChild(cls);
                a(cls,[['class','hover_btn h32']]);
                cls.innerHTML = `<svg style="border-radius: 2em; height: 30px; width: 30px;" x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`;
                cls.onclick = () => cont.outerHTML = '';

                const mover = ele('div');
                inlineStyler(mover,`{cursor: move; user-select: none;}`);
                left_panel.appendChild(mover);
                mover.onmouseover = dragElement;

            const right = ele('div');
            a(right,[['id','right_panel']])
            inlineStyler(right,`{padding: 0px; display: grid; grid-template-rows: 40px 40px 20px 40px 40px 40px 40px; grid-gap: 8px;}`);
            cont.appendChild(right);

                let top_label = ele('div');
                a(top_label,[['id','top_label']]);
                inlineStyler(top_label,`{text-align: center;}`);
                right.appendChild(top_label);

                let right_body_cont = ele('div');
                a(right_body_cont,[['id','right_body_cont']]);
                right.appendChild(right_body_cont);

                    let options_cont = ele('div');
                    inlineStyler(options_cont,`{display: grid; grid-template-columns: 80px 80px 80px; grid-gap: 8px;}`);
                    right_body_cont.appendChild(options_cont);
        // [
        //     {display_name:'Keeping Additional Colums',id:'keep_columns_btn',status:'on'},
        // ]
                    let header_input_cont = ele('div');
                    a(header_input_cont,[['id','header_input_cont']]);
                    // inlineStyler(header_input_cont,`{}`);
                    right_body_cont.appendChild(header_input_cont);
                    
                    let header_textarea = ele('textarea');
                    a(header_textarea,[['id','header_textarea'],['class','textarea'],['placeholder','Paste your target header here or upload your template spreadsheet below']]);
                    inlineStyler(header_textarea,`{width: 100%;}`);
                    header_textarea.onkeyup = processInputHeader;
                    right_body_cont.appendChild(header_textarea);

                    let headers_review_header = ele('div');
                    a(headers_review_header,[['id','headers_review_header']]);
                    right_body_cont.appendChild(headers_review_header);
                    inlineStyler(headers_review_header,`{display: grid; grid-template-columns: 1fr 1fr; grid-gap:8px;}`);
                    headers_review_header.innerHTML = `
                    <div id="template_header_label_cont">
                        <input id="upload_template_tsv_btn" type="file" name="file[]" multiple="true" style="color: #ffffff; cursor: pointer; width: 100px"></input><span>Upload Template TSV</span>
                    </div>
                    <div id="reorder_header_label_cont">
                        <input id="upload_reorder_tsv_btn" type="file" name="file[]" multiple="true" style="color: #ffffff; cursor: pointer; width: 100px"></input><span>Upload TSV to Reorder</span>
                    </div>`;
                    let headers_review_cont = ele('div');
                    a(headers_review_cont,[['id','headers_review_cont']]);
                    right_body_cont.appendChild(headers_review_cont);
                    inlineStyler(headers_review_cont,`{display: grid; grid-template-columns: 1fr 1fr; grid-gap:8px;}`);

                        let target_header_pill_cont = ele('div');
                        a(target_header_pill_cont,[['id','target_header_pill_cont']]);
                        headers_review_cont.appendChild(target_header_pill_cont);

                        let sort_header_pill_cont = ele('div');
                        a(sort_header_pill_cont,[['id','sort_header_pill_cont']]);
                        headers_review_cont.appendChild(sort_header_pill_cont);

    }
    function processInputHeader(e){
        if(/enter/i.test(e.key)){
            
        }
    }
    buildContainer()


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
    //createUploadHTML();

    function processInputTables(raw_tables){
        var tables = raw_tables.map(table=> table.split(/\n/).map(row=> row.split(/\t/)));
        var headers = tables.map(row=> row[0]);
        
    }



}


initReorderApp()

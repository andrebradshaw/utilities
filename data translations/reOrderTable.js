function initReorderApp(){



    function processColumnAsTimeStamp(column){
        let is_date = column.every(s=> 
            s === '' 
            || 
            (
                s != null
                && 
                !/^\d+$/.test(s) 
                && 
                /\d+\/\d+\/\d+|.{3,18}\d{4}/.test(s)
                &&
                new Date(s) != 'Invalid Date'
            )
        )
        let dates = is_date ? column.map(s=> 
                s != null
                &&
                !/^\d+$/.test(s) 
                && 
                /\d+\/\d+\/\d+|.{3,18}\d{4}/.test(s) 
                ? new Date(s) 
                : 'Invalid Date'
        ).map(date=> date == 'Invalid Date' ? -30597523200000 : date.getTime()) : column
        return {
            is_timestamp:is_date,
            column: dates,
            original: column,
        }
    }

    var isFloat = (s)=> /\S{1,308}/.test(s) && !/[\.\,]{2,}/.test(s) && /^\d+$|^\d[\d,\.]*\d$/.test(s);
    var isPercent = (s)=> /\S{1,308}/.test(s) && !/[\.\,]{2,}/.test(s) && /^\d+%$|^\d[\d,\.]*\d%$/.test(s);
    var isMoney = (s,mx)=> /\S{1,308}/.test(s) && !/[\.\,]{2,}/.test(s) && mx.some(x=> x.test(s));

    function createMoneyMatch(){
        return [8364, 8373, 162, 8353, 36, 1423, 402, 8378, 4314, 165, 8361, 163, 8369, 8358].map(i=> String.fromCharCode(i)).map(s=> new RegExp(`^\\${s}\\d$|^\\${s}[\\d\\.,]*\\d$|^\\d\\${s}$|^[\\d\\.,]*\\d\\${s}$`));
        /* ['€','₵','¢','₡','$','֏','ƒ','₺','ლ','¥','₩','£','₱','₦'] */ 
    }
    function processColumnAsFloatIfNumberType(column,mx){
        // var mx = createMoneyMatch();
        var tryFloat = (d)=> {try{return parseFloat(d)} catch(err){return d;}};
        var tryPercent = (d)=> {try{return parseFloat(d)*100} catch(err){return d;}};
        var are_floats = column.every(cell=> cell === '' || isFloat(cell));
        var are_percents = column.every(cell=> cell === '' || isPercent(cell))
        var are_currencies = column.every(cell=> cell === '' || isMoney(cell,mx))
        var output = are_floats ? column.map(cell=> tryFloat(cell.trim())) : are_percents ? column.map(cell=> tryPercent(cell.replace(/[^\d\.]/g,'').trim())) : are_currencies ? column.map(cell=> tryFloat(cell.replace(/[^\d\.]/g,'').trim())) : column;
        return {
            is_float: (are_floats||are_percents||are_currencies),
            column: output,
            original: column,
        }
    }

    function getAndAssignKeyTypes(arr){
        var mx = createMoneyMatch();
        return Object.keys(arr[0]).map((key,i)=> {
            let column = arr.map(row=> row[key]);
            let floats = processColumnAsFloatIfNumberType(column,mx);
            if(floats.is_float) return {[key]: {column_index: i, data:floats}};
            let timestamps = processColumnAsTimeStamp(column);
            if(timestamps.is_timestamp) return {[key]: {column_index: i, data:timestamps}};
            else return {[key]: {column_index: i, data:{is_string: true, column:column, original:column}}}
        }).reduce((a,b)=> {return {...a,...b}})
    }
    getAndAssignKeyTypes(jdat)




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

    // function reOrderTable(table,target_header,keep_extra_cols){
    //     // var table = tsv.split(/\n/).map(row=> row.split(/\t/));
    //     var header = table[0];
    //     var trans_table = transpose(table);
    //     var deepest = Math.max(...trans_table.map(t=> t.length));
    //     var leftover_header = header.filter(h=> target_header.every(i=> i != h));

    //     var extra_cols = leftover_header.map((h,i,r)=> trans_table[trans_table.findIndex(column=> column[0] == r[i])] ? trans_table[trans_table.findIndex(column=> column[0] == r[i])] : [...[h],...Array(deepest - 1).fill().map(t=> '')] );

    //     var reordered_table = target_header.map((h,i,r)=> trans_table[trans_table.findIndex(column=> column[0] == r[i])] ? trans_table[trans_table.findIndex(column=> column[0] == r[i])] : [...[h],...Array(deepest - 1).fill().map(t=> '')] );

    //     return transpose(
    //         [...reordered_table,...(keep_extra_cols ? extra_cols : [])]
    //     ).map(row=> row.map(cell=> `${cell}\t`).reduce((a,b)=> a+b)).map(row=> `${row}\n`).reduce((a,b)=> a+b);
    // }

    var transpose = (a)=>  a[0].map((_, c)=> a.map(r=> r[c])); 
    function reOrderTable(tsv,target_header,keep_extra_cols){
        var table = tsv//.split(/\n/).map(row=> row.split(/\t/));
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
    // var remapped_table = reOrderTable(textFile,target_header.split(/\t/),false);


    // function reOrderTable(table,target_header,keep_extra_cols){
    //     // var table = tsv.split(/\n/).map(row=> row.split(/\t/));
    //     let header = table[0];
    //     var trans_table = transpose(table);

    //     var deepest = Math.max(...trans_table.map(t=> t.length));
    //     var leftover_header = keep_extra_cols ? keep_extra_cols.filter(h=> target_header.every(i=> i != h)) : [];

    //     var extra_cols = leftover_header.map(
    //         (h,i,r)=> trans_table[trans_table.findIndex(column=> column[0] == r[i])] 
    //         ? trans_table[trans_table.findIndex(column=> column[0] == r[i])] 
    //         : [...[h],...Array(deepest - 1).fill().map(t=> '')] 
    //         );
        
    //     var reordered_table = target_header.map((h,i,r)=> trans_table[trans_table.findIndex(column=> column[0] == r[i])] ? trans_table[trans_table.findIndex(column=> column[0] == r[i])] : [...[h],...Array(deepest - 1).fill().map(t=> '')] );
    //     return transpose(
    //         [...reordered_table,...(keep_extra_cols ? extra_cols : [])]
    //     ).map(row=> row.map(cell=> `${cell}\t`).reduce((a,b)=> a+b)).map(row=> `${row}\n`).reduce((a,b)=> a+b);
    // }

    function getRemainderHeaders(reorder_header,target_header){
        return reorder_header.filter(h=> !target_header.some(t=> t == h));
    }
    // var remapped_table = reOrderTable(input_table,target_header);

    function processReorderConversion(){
        let reordered_tsv = reOrderTable(reorder_table,template_header,reorder_header);
        downloadTSV(reordered_tsv,`reordered_tsv.tsv`);
        
    }
    function downloadTSV(tsv, filename) {
        var type = 'data:text/plain;charset=utf-8,';
        var file = new Blob([tsv], {    type: type  });
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
          let a = document.createElement('a'),
          url = URL.createObjectURL(file);
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 10);
        }
      }


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
            .cell_pill {
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                font-size: 1.2em;
                height: 28px;
                background: #ffffff;
                color: #788fa5;
                border-radius: 0.4em;
                transition: all 111ms;
                user-select: none;
            }
            .action_btn {
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                font-size: 1.1em;
                padding: 8px;
                cursor: pointer;
                background: #788fa5;
                color: #ffffff;
                border-radius: 2em;
                transition: all 111ms;
                user-select: none;
            }
            .action_btn:hover {
                box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 6px 0px, rgba(255, 255, 255, 0.8) -6px -2px 6px -3px;
                color: #ffffff;
            }
            .action_btn:active {
                box-shadow:
                -2px -1px 4px 0px #ffffff,
                6px 2px 6px 0px rgb(204, 219, 232),
                4px 4px 4px 0px rgb(104, 122, 140) inset,
                -4px -4px 4px 0px #ffffff inset;
                color: #ffffff;
            }
            .${style_id} {
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                font-size: 1.1em;
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
                        BUILD HTML CONTAINERS
    ************************************************************
    * 
    */
   var svgs = {
       close:`<svg style="border-radius: 2em; height: 30px; width: 30px;" x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
       small_cls:`<svg style="border-radius: 2em; height: 18px; width: 18px;" x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1) translate(0px,-28px);" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
    };
    function buildTableSearchApp(typed_table){
        if(gi(document,'tsv_search_container')) gi(document,'tsv_search_container').outerHTML = '';
        const cont = ele('div');
        a(cont,[['id','tsv_search_container']]);
        let shadow = 'box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;';
        inlineStyler(cont,`{display: grid; grid-template-columns: 32px 1fr 4px; grid-gap: 12px; ${shadow} text-align: left; background: #ffffff; color: #374552; border-radius: 1em; padding: 12px; transition: all 31ms; position: fixed; z-index: ${topZIndexer()}; top: 50px; left: 0px;}`); // max-height: ${height}px; max-width: ${width}px; 
        document.body.appendChild(cont);

            const left_panel = ele('div');
            a(left_panel,[['id','tsv_search_left_panel'],['class','mover-left-gradient']]);
            inlineStyler(left_panel,`{display: grid; grid-template-rows: 32px 1fr; grid-gap: 12px; user-select: none;}`);
            cont.appendChild(left_panel);//${height-60}px
            // inlineStyler(left_panel,`{display: grid; grid-template-rows: 32px ${height-60}px; grid-gap: 12px; user-select: none;}`); //change grid height to match contents

                const cls = ele('div');
                left_panel.appendChild(cls);
                a(cls,[['class','hover_btn h32']]);
                cls.innerHTML = svgs.close;
                cls.onclick = () => cont.outerHTML = '';

                const mover = ele('div');
                inlineStyler(mover,`{cursor: move; user-select: none;}`);
                left_panel.appendChild(mover);
                mover.onmouseover = dragElement;
            
            const right = ele('div');
            a(right,[['id','tsv_search_right_panel']])
            inlineStyler(right,`{padding: 0px; display: grid; grid-gap: 8px;}`);
            cont.appendChild(right);

                let top_label = ele('div');
                a(top_label,[['id','tsv_search_top_label']]);
                inlineStyler(top_label,`{text-align: center;}`);
                right.appendChild(top_label);

                let right_body_cont = ele('div');
                a(right_body_cont,[['id','tsv_search_right_body_cont']]);
                right.appendChild(right_body_cont);
    
    }

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
                cls.innerHTML = svgs.close;
                cls.onclick = () => cont.outerHTML = '';

                const mover = ele('div');
                inlineStyler(mover,`{cursor: move; user-select: none;}`);
                left_panel.appendChild(mover);
                mover.onmouseover = dragElement;

            const right = ele('div');
            a(right,[['id','right_panel']])
            inlineStyler(right,`{padding: 0px; display: grid; grid-gap: 8px;}`);
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

                    let gap_pad1 = ele('div');
                    right_body_cont.appendChild(gap_pad1);
                    inlineStyler(gap_pad1,`{height: 20px;}`);

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
                    gi(document,'upload_template_tsv_btn').onchange = handleFiles;
                    gi(document,'upload_reorder_tsv_btn').onchange = handleFiles;

                    let gap_pad2 = ele('div');
                    right_body_cont.appendChild(gap_pad2);
                    inlineStyler(gap_pad2,`{height: 20px;}`);

                    let headers_info = ele('div');
                    a(headers_info,[['id','headers_info']]);
                    right_body_cont.appendChild(headers_info);
                    inlineStyler(headers_info,`{display: grid; grid-template-columns: 1fr 1fr; grid-gap:8px;}`);
                    headers_info.innerHTML = `
                    <div style="font-size: 1.3em;">Template Headers</div>
                    <div style="font-size: 1.3em;">Remaining Target TSV Headers</div>
                    `;

                    let headers_review_cont = ele('div');
                    a(headers_review_cont,[['id','headers_review_cont']]);
                    right_body_cont.appendChild(headers_review_cont);
                    inlineStyler(headers_review_cont,`{display: grid; grid-template-columns: 1fr 1fr; grid-gap:8px;}`);

                        let target_header_pill_cont = ele('div');
                        a(target_header_pill_cont,[['id','target_header_pill_cont'],['class','textarea']]);
                        headers_review_cont.appendChild(target_header_pill_cont);
                        inlineStyler(target_header_pill_cont,`{overflow-y: auto; max-height: ${Math.floor(window.innerHeight *0.7)}px;}`);
                        // inlineStyler(target_header_pill_cont,`{display:grid; grid-template-rows: auto; grid-gap:6px; overflow-y: auto; max-height: ${Math.floor(window.innerHeight *0.7)}px;}`);

                        let sort_header_pill_cont = ele('div');
                        a(sort_header_pill_cont,[['id','sort_header_pill_cont'],['class','textarea']]);
                        headers_review_cont.appendChild(sort_header_pill_cont);
                        inlineStyler(sort_header_pill_cont,`{overflow-y: auto; max-height: ${Math.floor(window.innerHeight *0.7)}px;}`);
                        // inlineStyler(sort_header_pill_cont,`{display:grid; grid-template-rows: auto; grid-gap:6px; overflow-y: auto; max-height: ${Math.floor(window.innerHeight *0.7)}px;}`);
    }
    function replaceReoderUploadWithActionBtns(){
        let reorder_header_label_cont = gi(document,'reorder_header_label_cont');
        inlineStyler(reorder_header_label_cont,`{display: grid; grid-template-columns: 1fr 1fr; grid-gap: 4px;}`);
        reorder_header_label_cont.innerHTML = `
        <div id="reorder_download_btn" class="action_btn">Reorder & Download</div>
        <div id="open_tsv_search_app" class="action_btn">Open TSV Search App</div>

        `;
        // <div id="switch_to_upload_reorder_input" class="action_btn">Upload TSV to Reorder</div>
        gi(document,'reorder_download_btn').onclick = processReorderConversion;
        // gi(document,'open_tsv_search_app').onclick
        // gi(document,'switch_to_upload_reorder_input').onclick
    }
    function getHeadersFromPills(){
        // var target = cn(gi(document,'target_header_pill_cont'),'cell_text')?.[0] ? Array.from(cn(gi(document,'target_header_pill_cont'),'cell_text')?.[0]).map(i=> i.innerText) : [];
        // var reorder = cn(gi(document,'sort_header_pill_cont'),'cell_text')?.[0] ? Array.from(cn(gi(document,'sort_header_pill_cont'),'cell_text')?.[0]).map(i=> i.innerText) : [];
        // reorder_header = reorder;
        // template_header = target;
        return {
            target: {
                header:template_header,
                id:'target_header_pill_cont',
            },
            reorder: {
                header:reorder_header,
                id:'sort_header_pill_cont'
            },
        }
    }
    function insertHeaderPills(header,parent_id){ //target_header_pill_cont , sort_header_pill_cont
        var parent_elm = gi(document,parent_id);
        parent_elm.innerHTML = '';
        header.forEach(cell=>{
            let pill_pad = ele('div');
            parent_elm.appendChild(pill_pad);
            inlineStyler(pill_pad,`{padding: 4px;}`);
            let pill_cont = ele('div');
            pill_pad.appendChild(pill_cont);
            a(pill_cont,[['class','cell_pill']])
            inlineStyler(pill_cont,`{display: grid; grid-template-columns: 1fr 18px; grid-gap: 2px;}`);

            let cell_text = ele('div');
            a(cell_text,[['clean','cell_text']]);
            inlineStyler(cell_text,`{padding: 4px;}`);
            pill_cont.appendChild(cell_text);
            cell_text.innerText = cell;

            let cls = ele('div');
            pill_cont.appendChild(cls);
            a(cls,[['class','hover_btn']]);
            inlineStyler(cls,`{width: 18px; height: 18px; transform: translate(-2px,4px);}`);
            cls.innerHTML = svgs.small_cls;
            cls.onclick = () => {
                pill_cont.outerHTML = '';
                if(parent_id == 'target_header_pill_cont'){
                    template_header.splice(template_header.findIndex(i=> i == cell),1)
                }else{
                    reorder_header.splice(reorder_header.findIndex(i=> i == cell),1)
                }
                let headers = getHeadersFromPills();
                insertHeaderPills(headers.target.header,headers.target.id);
                let remaining_reorder_headers = getRemainderHeaders(headers.reorder.header,headers.target.header);
// console.log(remaining_reorder_headers);
// console.log([template_header,reorder_header]);
                insertHeaderPills(remaining_reorder_headers,headers.reorder.id);
            };
        })

    }
    function processInputHeader(e){
        // if(/enter/i.test(e.key)){
        if(/\t/i.test(this.value)){
            let header_cells = this.value.trim().split(/\t/).map(i=> i.trim());
            console.log(header_cells)
            template_header = header_cells;
            insertHeaderPills(header_cells,'target_header_pill_cont');
        }
    }
    buildContainer()

    var template_header = [];
    var template_table = [];
    var reorder_table = [];
    var reorder_header = [];
    async function handleFiles() {
        var contain_arr = [];
        var files = this.files;
        for(var i=0; i<files.length; i++){
            let uri = await getDataBlob(files[i]);
            if(Array.isArray(uri)) {uri.forEach(i=> contain_arr.push(i))} else {contain_arr.push(uri);}
        }
        if(this.id == 'upload_reorder_tsv_btn'){
            reorder_table = contain_arr[0]?.split(/\n/).map(row=> row.split(/\t/).map(c=> c.trim()));
            reorder_header = reorder_table[0];
            insertHeaderPills(getRemainderHeaders(reorder_header,template_header),'sort_header_pill_cont');
            replaceReoderUploadWithActionBtns();
        }
        if(this.id == 'upload_template_tsv_btn'){
            template_table = contain_arr[0]?.split(/\n/).map(row=> row.split(/\t/).map(c=> c.trim()));
            template_header = template_table[0];
            insertHeaderPills(template_header,'target_header_pill_cont') 

        }
        // document.getElementById('pop_FileUploader').outerHTML = '';
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

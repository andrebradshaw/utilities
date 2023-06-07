async function genericFormsPopup(){

    var svgs = {
        close:`<svg style="border-radius: 2em; height: 30px; width: 30px;" x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
        small_cls:`<svg style="border-radius: 2em; height: 18px; width: 18px;" x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1) translate(0px,-28px);" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
     };
    var cn = (o, s) => o ? o.getElementsByClassName(s) : null;
    var tn = (o, s) => o ? o.getElementsByTagName(s) : null;
    var gi = (o, s) => o ? o.getElementById(s) : null;
    var ele = (t) => document.createElement(t);
    var attr = (o, k, v) => o.setAttribute(k, v);
    var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
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
            .overflow-clip {
                overflow: clip;
            }
            .mover-top-gradient {
                background:transparent;
                border-top-right-radius: 1em;
            }
            .mover-left-gradient {
                background:transparent;
                border-bottom-left-radius: 1em;
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
            .textarea:hover {
                box-shadow: rgb(204, 219, 232) 1px 2px 2px 1px inset, rgba(255, 255, 255, 0.5) -1px -0px 1px 0px inset;
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
            .hover_btn {
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                font-size: 1.1em;
                cursor: pointer;
                background: #ffffff;
                color: #788fa5;
                border-radius: 2em;
                transition: all 111ms;
                user-select: none;
            }
            .hover_btn:hover {
                box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 6px 0px, rgba(255, 255, 255, 0.8) -6px -2px 6px -3px;
                color: #788fa5;
            }
            .hover_btn:active {
                box-shadow:
                -8px -4px 8px 0px #ffffff,
                6px 2px 6px 0px rgb(204, 219, 232),
                4px 4px 4px 0px rgb(204, 219, 232) inset,
                -4px -4px 4px 0px #ffffff inset;
                color: #788fa5;
            }
            .animated_color_bar {
                background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23a6d5, #23d5ab);
                background-size: 400% 400%;
                animation: gradient_color_bar 3s ease infinite;
            }
            @keyframes gradient_color_bar {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }
        `;
    }



    
    function buildContainer(params){
        var {
            top,
            left,
            sub_application_id,
            application_label,
            btn_text,
            textareas,
            date_options,
            ranges,
            select_options,
            uploads,
        } = params;
        setQuickliCSS(sub_application_id);
        if(gi(document,sub_application_id)) gi(document,sub_application_id).outerHTML = '';
        const cont = ele('div');
        a(cont,[['id',sub_application_id],['class','pad8']]);
        let shadow = 'box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;';
        inlineStyler(cont,`{display: grid; grid-template-columns: 32px 1fr 4px; ${shadow} text-align: left; background-image: linear-gradient(to bottom right, #dae3e8, #ffffff, #ffffff); color: #1c1d1f; border-radius: 1em; position: fixed; z-index: ${topZIndexer()}; top: ${top ? top : 50}px; left: ${left ? left : 50}px;}`);
        document.body.appendChild(cont);

            const left_panel = ele('div');
            a(left_panel,[['id','left_panel'],['class','mover-left-gradient']]);
            inlineStyler(left_panel,`{display: grid; grid-template-rows: 32px 1fr; grid-gap: 12px; user-select: none;}`);
            cont.appendChild(left_panel);

                const cls = ele('div');
                left_panel.appendChild(cls);
                a(cls,[['class','hover_btn h32 overflow-clip']]);
                cls.innerHTML = svgs.close;
                cls.onclick = () => cont.outerHTML = '';

                const left_mover = ele('div');
                inlineStyler(left_mover,`{cursor: move; user-select: none;}`);
                left_panel.appendChild(left_mover);
                left_mover.onmouseover = dragElement;

            const right_panel = ele('div');
            a(right_panel,[['id','right_panel']])
            inlineStyler(right_panel,`{display: grid; grid-template-rows: 32px 1fr; grid-gap: 0px; user-select: none;}`);
            cont.appendChild(right_panel);

                let right_head = ele('div');
                right_panel.appendChild(right_head);
                a(right_head,[['class','mover-top-gradient']]);
                inlineStyler(right_head,`{cursor: move; user-select: none;}`);
                right_head.onmouseover = dragElement;

                let right_body_cont = ele('div');
                a(right_body_cont,[['id','right_body_cont'],['class','pad8']]);
                inlineStyler(right_body_cont,`{background: #ffffff; border-top-left-radius: 1em; border-bottom-right-radius: 1em;display: grid; grid-gap:22px; max-height: ${((window.innerHeight - (cont.getBoundingClientRect().top + 40)))}px; overflow-y: auto;}`);
                right_panel.appendChild(right_body_cont);
                
                    let top_label = ele('div');
                    a(top_label,[['id',`${sub_application_id}_top_label`]]);
                    inlineStyler(top_label,`{text-align: center;}`);
                    right_body_cont.appendChild(top_label);
                    top_label.innerText = application_label ? application_label : '';
                    
                    if(date_options) addDateSelector(sub_application_id,right_body_cont,date_options);
                    if(select_options) addSelectOptions(sub_application_id,right_body_cont,select_options);

                    if(uploads){
                        uploads?.forEach((itm,i)=> {
                            let upload_cont = ele('div');
                            a(upload_cont,[['class','upload_container']]);
                            inlineStyler(upload_cont,`{width:100%;}`);
                            right_body_cont.appendChild(upload_cont);

                            let upload_elm = ele('input');
                            upload_cont.appendChild(upload_elm);
                            a(upload_elm,[['id', `${i}_upload_container`],["type", "file"],["name", "file[]"],["multiple", "true"]]);
                            upload_elm.addEventListener('change',handleFiles);
                            
                        })
                    }
                    
                    ranges?.forEach((itm,i)=> {
                        let range_cont = ele('div');
                        a(range_cont,[['class','range_container']]);
                        inlineStyler(range_cont,`{width:100%;}`);
                        right_body_cont.appendChild(range_cont);

                        let range_label = ele('div');
                        range_cont.appendChild(range_label);
                        range_label.innerText = `${itm.default_value} ${itm.label}`;
        
                        let range_slider = ele('input');
                        a(range_slider,[['id',`${i}_${sub_application_id}_range_slider`],['type','range'],['max',itm.max],['min',itm.min]]);
                        inlineStyler(range_slider,`{width:100%;}`);
                        range_cont.appendChild(range_slider);
                        range_slider.value = itm.default_value;
                        range_slider.onmousemove = ()=> {    range_label.innerText = `${range_slider.value} ${itm.label}`;  };
                    });
                    
                    textareas?.forEach((itm,i)=> {
                        let textarea = ele('textarea');
                        a(textarea,[['id',`${i}_${sub_application_id}_textarea`],['class','textareas textarea pad8'],['placeholder',itm.placeholder]]);
                        inlineStyler(textarea,`{height:${itm.height}px; width:${itm.width}px;}`);
                        right_body_cont.appendChild(textarea);
                    });

                    let run_btn = ele('div');
                    a(run_btn,[['id',`${sub_application_id}_run_btn`],['class','hover_btn centertext pad8']]);
                    right_body_cont.appendChild(run_btn);
                    run_btn.innerText = btn_text;

                    if(textareas) Array.from(cn(cont,'textareas')).forEach(elm=> inlineStyler(elm,`{width:${elm.getBoundingClientRect().width < right_body_cont.getBoundingClientRect().width ? right_body_cont.getBoundingClientRect().width : elm.getBoundingClientRect().width}px;}`));
                    Array.from(cont.querySelectorAll('*')).forEach(elm=> inlineStyler(elm,`{font-family: 'Open Sans', sans-serif; font-size:14px;}`) );
        return run_btn;
    }

    function yearMonthDate(d){
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var date = new Date(d);
        return `${date.getUTCFullYear()}-${months[date.getUTCMonth()]}-${(date.getUTCDate() < 10 ? '0'+date.getUTCDate() : date.getUTCDate() )}`;
    }
    var dayMonthYearQueryString = (d)=> `day:${new Date(d).getUTCDate()},month:${new Date(d).getUTCMonth()},year:${new Date(d).getUTCFullYear()}`;
    var getDayMonthYearQueryString = (id)=> {return {start:dayMonthYearQueryString(document.getElementById(`${id}_start_date`)?.value),end:dayMonthYearQueryString(document.getElementById(`${id}_end_date`)?.value)}};

    function addDateSelector(ref_id,ref,date_options){
        date_options.forEach(itm=> {
            let cont = ele('div');
            ref.appendChild(cont);
            inlineStyler(cont,`{display:grid; grid-gap:4px;}`);
            cont.innerHTML = `
            <div>${itm.label}</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 18px;">
                <div style="display: grid; grid-template-columns: 70px 1fr; grid-gap: 8px;"> <label style="background: transparent; color: #222526;" >Start date</label> <input class="textarea" style="background: transparent; color: #222526;" id="${ref_id}_start_date" type="date" value="${itm.start ? itm.start : (yearMonthDate((new Date().getTime() - (2 * 86400000))))}"> </div>
                <div style="display: grid; grid-template-columns: 70px 1fr; grid-gap: 8px;"> <label style="background: transparent; color: #222526;" >End date</label> <input class="textarea" style="background: transparent; color: #222526;" id="${ref_id}_end_date" type="date" value="${itm.end ? itm.end : (yearMonthDate((new Date().getTime() - 86400000)))}"> </div>
            </div>
            `; 
        })
        
    }

    function addSelectOptions(id,ref,select_options){
        select_options?.forEach((itm,i)=> {
            let field = ele('div');
            ref.appendChild(field);
            a(field,[['class','search_field']]);
            inlineStyler(field,`{display: grid; grid-template-columns: 52px 1fr; grid-gap:8px;}`);
            
            let btn = ele('div');
            field.appendChild(btn);
            a(btn,[['class','textarea']]);
            addTypeSwitch(id,btn,{...itm,...{index:i}});
            
            let label = ele('div');
            field.appendChild(label);
            label.innerText = itm.label;
        })
    }
    
    function addTypeSwitch(id,parent_elm,params){
        var {index,key,bool_state,boolstates} = params;
        let boolopt = ele('div');
        parent_elm.appendChild(boolopt);
        a(boolopt,[['id',id],['class','hover_btn switch_btn'],['boolx',bool_state],['index',index],['key',key],['boolstates',btoa(JSON.stringify(boolstates))]]);
        inlineStyler(boolopt,`{z-index: ${topZIndexer()+1500}; height: 20px; width: 20px; background: ${ bool_state === 'unselected' ? '#8a0e00' : '#008a0e'}; border: 1px solid #d4e4ff; box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 6px 0px, rgba(255, 255, 255, 0.8) -6px -2px 6px -3px; transform:translate(${bool_state === 'unselected' ? 30 : 2}px,2px);}`);
        boolopt.onclick = everySomeSwitchRxBool;
    
        let boolcard = ele('div');
        parent_elm.appendChild(boolcard);
        inlineStyler(boolcard,`{user-select: none; z-index: ${topZIndexer()}; background: transparent; color: ${ bool_state === 'unselected' ? '#8a0e00' : '#008a0e'}; text-align: center; transform:translate(0px,0px);}`);
        boolcard.innerText = boolstates[bool_state];
    }
    function everySomeSwitchRxBool(){
        let boolstates = JSON.parse(atob(this.getAttribute('boolstates')));
        let status = this.getAttribute('boolx');
        let display = tn(this.parentElement,'div')[1];
        
        if(status === 'selected'){
            a(this,[['boolx','unselected']]);
            inlineStyler(this,`{transform:translate(30px,2px); background:#8a0e00;}`);
            inlineStyler(display,`{color:#8a0e00; text-align: center; transform:translate(0px,0px);}`);
            display.innerText = boolstates['unselected'];
        }else{
            a(this,[['boolx','selected']]);
            inlineStyler(this,`{transform:translate(2px,2px); background:#008a0e;}`);
            inlineStyler(display,`{color:#008a0e; text-align: center; transform:translate(0px,0px);}`);
            display.innerText = boolstates['selected'];
        }
    }

    var container_params = {
        left:0,
        top:0,
        sub_application_id:'content_popup_form',
        btn_text:'Run Program',
        // textareas:[
        //     {placeholder:'user input text',width:400,height:320}
        // ],
        // date_options:[
        //     {start:'2015-01-01',end:'',label:'select date range'}
        // ],
        // ranges:[{
        //     label:'Selected',
        //     min:1,
        //     max:100,
        //     default_value:7,
        // }],
        // select_options:[
        //     {
        //         label:'Some Item To Select',
        //         key:'some_key_reference',
        //         bool_state:'selected',
        //         boolstates:{selected:'true',unselected:'false'},
        //     }
        // ],
        uploads:[
            {
                hide_elm_id_while_loading:'content_popup_form_run_btn'
            }
        ]
    }

 

    var upload_contain_arr = [];
    async function handleFiles() {
      let run_btn = gi(document,container_params?.uploads?.[0]?.hide_elm_id_while_loading);
      inlineStyler(run_btn,`{display: none;}`);
      var textJSONAsArray = (text) => Array.isArray(JSON.parse(text)) ? JSON.parse(text) : [JSON.parse(text)];
      var files = this.files;
      for(var i=0; i<files.length; i++){
        let textdata = await getDataFromFile(files[i]);
        textJSONAsArray(textdata).forEach(d=> upload_contain_arr.push(d));
      }
        inlineStyler(run_btn,`{display: block;}`);
      console.log(upload_contain_arr);
      // gi(document,'pop_FileUploader').outerHTML = '';
    }

    async function readTextFile(d){
      var reader = new FileReader();    /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
      reader.readAsText(d);          /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText */
      return new Promise((res,rej)=> {  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
        reader.onload = (e) => {        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
          res(e.target.result)
        }
      })
    } 

    async function getDataFromFile(file){
      var textdata = await readTextFile(file);
      return textdata;
    }
    
        
    let run_program_btn = buildContainer(container_params);
    run_program_btn.onclick = runProgram;

    async function runProgram(){
        console.log('get user selections and do your thing');
    }

}
genericFormsPopup()

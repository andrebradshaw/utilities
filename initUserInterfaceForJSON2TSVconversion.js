    function initUserInterfaceForJSON2TSVconversion(client_json_data){

        function initMoveHandler(){
            var target_el = this.parentElement;
            let draggingEle;
            let placeholder;
            let isDraggingStarted = false;
            let y = 0;
            const swap = function(nodeA, nodeB) {
                const parentA = nodeA.parentNode;
                const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
                nodeB.parentNode.insertBefore(nodeA, nodeB);
                parentA.insertBefore(nodeB, siblingA);
            };
            const isAbove = function(nodeA, nodeB) {
                const rectA = nodeA.getBoundingClientRect();
                const rectB = nodeB.getBoundingClientRect();
                return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
            };
            const mouseDownHandler = function(e) {
                draggingEle = target_el;
                const rect = draggingEle ? draggingEle.getBoundingClientRect() : placeholder.getBoundingClientRect();
                y = e.pageY - rect.top;
                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
                document.removeEventListener('mouseenter', initMoveHandler);
            };

            const mouseMoveHandler = function(e) {
                const draggingRect = draggingEle.getBoundingClientRect();
                if (!isDraggingStarted) {
                    isDraggingStarted = true;
                    placeholder = document.createElement('div');
                    placeholder.classList.add('placeholder');
                    draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
                    placeholder.style.height = `${draggingRect.height}px`;
                }
                const rect = draggingEle ? draggingEle.getBoundingClientRect() : placeholder.getBoundingClientRect();
                draggingEle.style.position = 'fixed';
                draggingEle.style.top = `${e.pageY - y}px`; 
                const prevEle = draggingEle.previousElementSibling;
                const nextEle = placeholder.nextElementSibling;
                if (prevEle && isAbove(draggingEle, prevEle)) {
                    swap(placeholder, draggingEle);
                    swap(placeholder, prevEle);
                    return;
                }
                if (nextEle && isAbove(nextEle, draggingEle)) {
                    swap(nextEle, placeholder);
                    swap(nextEle, draggingEle);
                }
            };
            const mouseUpHandler = function() {
                if(placeholder && placeholder.parentNode) {
                    placeholder.parentNode.removeChild(placeholder);
                } else {
                    if(placeholder) placeholder.outerHTML = '';
                }
                draggingEle.style.removeProperty('top');
                draggingEle.style.removeProperty('left');
                draggingEle.style.removeProperty('position');
                y = null;
                draggingEle = null;
                isDraggingStarted = false;
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };
            this.onmousedown = mouseDownHandler;
        }

        function topZIndexer(){
            let n = new Date().getTime() /100000
            let r = (n - Math.floor(n)) * 1000
            return Math.round(n+r);
        }

        const cleanObject = (ob) => 
        Object.entries(ob).reduce((r, [k, v]) => {
            if(v != null && v != undefined && v != "" && ( typeof v == 'boolean' || typeof v == 'string' || typeof v == 'symbol' || typeof v == 'number' || typeof v == 'function' || (typeof v == 'object'  && ((Array.isArray(v) && v.length) || (Array.isArray(v) != true)) ) ) ) { 
                r[k] = v; 
                return r;
            } else { 
                return r; 
            }
        }, {});
    function convert2TsvAndDownload(records, named_file){
        var fileArray = records;
        var tsvReady = (s) => s ? s.replace(/\t|\u0009/g, ' ').replace(/\r|\n/g, 'Ã¢â€ Âµ').replace(/"/g, "'") : s;
        var unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));
        var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
        var str = (o) => typeof o == 'object' ? tsvReady(JSON.stringify(o).replace(/\n|\r/g, ' ')) : o;
        var firstLevel = fileArray.map(el => Object.entries(el));
        var header = unqHsh(firstLevel.map(el => el.map(itm => itm[0])).flat(),{});
        var table = [header];
        for (var i = 0; i < firstLevel.length; i++) {
        var arr = [];
        var row = [];
        var record = firstLevel[i];
        for (var s = 0; s < record.length; s++) {
            var record_kv = record[s];
            var col_key = record_kv[0];      
            var place = header.indexOf(col_key);
            arr[place] = record_kv[1];
        }
        for (var a = 0; a < arr.length; a++) {
            if (arr[a]) {
            row.push(arr[a]);
            } else {
            row.push('');
            }
        }
        table.push(row);
        }
        function downloadr(arr2D, filename) {
        var data = /\.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el => el.reduce((a, b) => a + '\t' + b)).reduce((a, b) => a + '\r' + b);
        var type = /\.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
        var file = new Blob([data], {
            type: type
        });
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
            var a = document.createElement('a'),
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
        var output_ = table.map(el => el.map(itm => str(itm)));
        downloadr(output_, named_file);
    }
    function processObjectOptions(arr,user_selected_object_state, object_level){
        const fixNameCase = (s) => s.split(/(?=[^Å„ÅƒÅŒÅŒÅšÅ Å›Å¡ÅªÅ«Ã¿Å‚Å¾ÅºÅ¼Å Å½Å¹Å»Ã§Ä‡Ä Ã‡Ä†ÄŒÃ¡Ä Ã Ã¢Ã¤Ã£Ã¥Ã Ã€Ã‚Ã„ÃƒÄ€Ä€Ã…Ä€Ã†Ã¦Ã©Ã¨ÃªÃ«Ä™Ä“Ä—Ã‰ÃˆÃŠÃ‹Ã­Ã¬Ã®Ã¯Ä«Ä¯Ã±Ã‘Ã³Ã²Ã´Ã¶ÃµÃ¸Å“Ã“Ã’Ã”Ã–Ã•Ã˜Å’ÃŸÃšÃ™Ã›ÃœÃºÃ¹Ã»Ã¼Å™a-zA-Z])\b/).map(el=> el.replace(/\w\S*/g, txt=> txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('').replace(/(?<=\bMc)\w/ig, t=> t.charAt(0).toUpperCase());
        const snakeCaseToTitleCase = (s)=> fixNameCase(s.replace(/_/g, ' ').trim());
        const object_definitions = {};
//TODO: This should reference a user preference document in the future. 
        let make_false = ["id","cert_company_name","cert_end_timestamp","cert_start_timestamp","millseconds_in_cert","cert_company_id","languages","company_connections","shared_connections","edu_start_year","edu_school_id","job_company_linkedin_url","job_company_id","job_company_description","job_company_hq_region","job description","job_is_current","job_industries","job_country","region_code","country_code","public_id","lir_niid","industry","network_distance","profile_img","number_of_connections","ts_hire_identity","patents","vols","pro_projects","publications","network_distance","desired_company_max_size","desired_company_min_size","certs","companies_following","courses","honors","test_scores"];
        arr.forEach(obj=> {
            Object.entries(cleanObject(obj)).forEach(kv=>{
                if(kv[0] && kv[1]){
                    let current_user_sel = user_selected_object_state && user_selected_object_state[kv[0]] && user_selected_object_state[kv[0]].is_user_selected ? user_selected_object_state[kv[0]].is_user_selected : true;
                    let is_object = !Array.isArray(kv[1]) && typeof kv[1] == 'object';
                    let is_array = Array.isArray(kv[1]);
                    let is_array_of_objects = is_array ? kv[1].every(v=> typeof v == 'object' && Array.isArray(v) === false) : false;
                    if(object_definitions[kv[0]]){
                        if( is_array_of_objects ){
                            let new_keys = Object.keys(object_definitions[kv[0]].in_array).filter(itm=> !Object.keys(kv[1]).includes(itm))
                            if(new_keys.length > 0 ){
                                new_keys.forEach(nk=> {
                                    let add_these_keys = processObjectOptions(kv[1],user_selected_object_state, {parent_key: kv[0]});
                                    object_definitions[kv[0]]['in_array'] = {...object_definitions[kv[0]].in_array,...add_these_keys}
                                })
                            }
                        }
                    }else{
                        object_definitions[kv[0]] = {
                            key: kv[0],
                            is_object: is_object,
                            is_array: is_array,
                            in_array: is_array && is_array_of_objects ? processObjectOptions(kv[1],user_selected_object_state, {parent_key: kv[0]}) : false,
                            type: typeof kv[1],
                            is_user_selected: make_false.some(omit=> omit == kv[0]) ? false : current_user_sel,
                            view_key: snakeCaseToTitleCase(kv[0]),
                            is_top_level: object_level?.is_top_level ? true : false,
                            parent_key: object_level?.parent_key ? object_level?.parent_key : null,
                            number_to_display: is_array_of_objects ? 1 : null,
                        }
                    }
                    
                }
            })
        })
        return object_definitions;
    }
// function processObjectStatePositionOptions(object_definitions,saved_preferences){
//     const remap = {};
//     Object.entries(object_definitions).forEach(kv=> {
        
//     });
// }
    function initTableOptionsUIfromObjectDefinitions(object_definition){
        const reg = (o, n) => o ? o[n] : '';
        const cn = (o, s) => o ? o.getElementsByClassName(s) : null;
        const tn = (o, s) => o ? o.getElementsByTagName(s) : null;
        const gi = (o, s) => o ? o.getElementById(s) : null;
        const ele = (t) => document.createElement(t);
        const attr = (o, k, v) => o.setAttribute(k, v);
        const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
    
        function inlineStyler(elm,css){
        Object.entries(JSON.parse(
        css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g,'"')
            .replace(/(?<=:\s*.+?);/g,'",')
            .replace(/[a-zA-Z-]+(?=:)/g, k=> k.replace(/^\b/,'"').replace(/\b$/,'"'))
            .replace(/\s*,\s*\}/g,'}')
        )).forEach(kv=> { elm.style[kv[0]] = kv[1]});
        }
    
        function aninCloseBtn() {
            var l1 = tn(this, 'path')[0];
            var l2 = tn(this, 'path')[1];
            inlineStyler(tn(this, 'path')[1],`{transform: translate(49px, 50px) rotate(135deg) translate(-49px, -50px); transition: all 233ms;}`);
            inlineStyler(tn(this, 'path')[0],`{transform: translate(49px, 50px) rotate(45deg) translate(-49px, -50px); transition: all 533ms;}`);
        }
      
        function anoutCloseBtn() {
            var l1 = tn(this, 'path')[0];
            var l2 = tn(this, 'path')[1];
            inlineStyler(tn(this, 'path')[1],`{transform: translate(49px, 50px) rotate(225deg) translate(-49px, -50px); transition: all 133ms;}`);
            inlineStyler(tn(this, 'path')[0],`{transform: translate(49px, 50px) rotate(225deg) translate(-49px, -50px); transition: all 333ms;}`);
        }
        

        function dragElement() {
            var el = this.parentElement;
            var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
            if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
            else this.onmousedown = dragMouseDown;
            function dragMouseDown(e) {
              pos3 = e.clientX;
              pos4 = e.clientY;
              document.onmouseup = closeDragElement;
              document.onmousemove = elementDrag;
            }
            function elementDrag(e) {
              pos1 = pos3 - e.clientX;
              pos2 = pos4 - e.clientY;
              pos3 = e.clientX;
              pos4 = e.clientY;
              inlineStyler(el,`{top: ${(el.offsetTop - pos2)}px; left: ${(el.offsetLeft - pos1)}px; z-index: ${topZIndexer()}; opacity: 0.85; transform: opacity 700ms;}`);
            }
            function closeDragElement() {
              document.onmouseup = null;
              document.onmousemove = null;
              el.style.opacity = "1";
            }
        }
        
        function adjustElementSize(){
            var cont = this.parentElement.parentElement.parentElement;
            var main = this.parentElement.parentElement;
            var cbod = main.firstChild;
            var foot = this.parentElement;
            var head_height = cont.firstChild.getBoundingClientRect().height;
            var foot_height = foot.getBoundingClientRect().height;
            var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
            var width = parseFloat(cont.style.width.replace(/px/,''));
            var height = parseFloat(cont.getBoundingClientRect().height);
            if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
            else this.onmousedown = dragMouseDown;
            function dragMouseDown(e) {
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
            function elementDrag(e) {
                cont.style.width = width - (pos3 - e.clientX) + 'px';
                cont.style.height = ((height - (pos4 - e.clientY)) )+ 'px';
                cbod.style.height = ((height - (pos4 - e.clientY)) - (head_height+foot_height)) + 'px';
                var rect = main.getBoundingClientRect();
                var edge = 15;
                inlineStyler(foot,`{display: grid; grid-template-columns: ${(rect.width - (edge+4))}px ${edge}px; background: #0a1114; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; height: ${edge+4}px;}`)
                cont.style.opacity = '0.95';
                cont.style.transition = 'opacity 200ms';
            }
            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
                cont.style.opacity = '1';
            }    
        }
        
        var svgs = {
            close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
            resize: `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000.000000 1000.000000" version="1.0">
        <g stroke="none" fill="#43de6d" transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
        <path d="M9235 9969 c-31 -17 -9164 -9151 -9181 -9181 -8 -15 -14 -49 -14 -76 0 -38 6 -57 29 -88 34 -46 535 -544 571 -568 28 -18 110 -22 143 -5 31 16 9165 9148 9183 9181 8 15 14 49 14 76 0 38 -6 57 -29 88 -34 46 -535 544 -571 568 -28 18 -114 21 -145 5z"/>
        <path d="M5923 4093 c-1911 -1908 -3479 -3476 -3484 -3485 -5 -9 -9 -38 -9 -64 l0 -48 228 -228 228 -228 53 0 53 0 3478 3472 c1914 1909 3482 3478 3485 3485 3 8 5 35 5 61 l0 46 -228 228 -228 228 -53 0 -53 0 -3475 -3467z"/>
        <path d="M7042 2957 l-2442 -2442 0 -45 0 -45 213 -213 212 -212 45 0 45 0 2443 2443 2442 2442 0 45 0 45 -213 213 -212 212 -45 0 -45 0 -2443 -2443z"/>
        <path d="M8088 1922 l-1478 -1477 0 -45 c0 -44 1 -45 178 -222 177 -178 178 -178 222 -178 l45 0 1472 1473 1473 1472 0 55 0 56 -173 172 c-172 171 -174 172 -218 172 l-44 0 -1477 -1478z"/>
        </g>
        </svg>`,
            resize_hover: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)" fill="#43de6d" stroke="none">
        <path d="M5318 4622 l-3798 -3797 0 -59 0 -60 312 -314 c172 -172 325 -320 340 -328 15 -8 49 -14 75 -14 l48 0 3797 3798 3798 3797 0 59 0 60 -312 314 c-172 172 -325 320 -340 328 -15 8 -49 14 -75 14 l-48 0 -3797 -3798z"/>
        <path d="M6763 3147 l-2483 -2482 0 -50 0 -49 268 -268 268 -268 49 0 50 0 2482 2483 2483 2482 0 50 0 49 -268 268 -268 268 -49 0 -50 0 -2482 -2483z"/>
        <path d="M8058 1902 l-1268 -1267 0 -50 0 -50 248 -247 247 -248 50 0 50 0 1267 1268 1268 1267 0 50 0 50 -248 247 -247 248 -50 0 -50 0 -1267 -1268z"/>
        </g>
        </svg>`,
            check: `<svg width="14px" height="14px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 80.588 61.158" style="enable-background:new 0 0 80.588 61.158;" xml:space="preserve"><path style="fill:#43de6d;" d="M29.658,61.157c-1.238,0-2.427-0.491-3.305-1.369L1.37,34.808c-1.826-1.825-1.826-4.785,0-6.611  c1.825-1.826,4.786-1.827,6.611,0l21.485,21.481L72.426,1.561c1.719-1.924,4.674-2.094,6.601-0.374  c1.926,1.72,2.094,4.675,0.374,6.601L33.145,59.595c-0.856,0.959-2.07,1.523-3.355,1.56C29.746,61.156,29.702,61.157,29.658,61.157z  "/></svg>`,
            mover: `<svg style="height: 24px; width: 24px;" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
            <path fill="#231F20" d="M8.667,15h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,15,8.667,15z"/>
            <path fill="#231F20" d="M8.667,37h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,37,8.667,37z"/>
            <path fill="#231F20" d="M8.667,26h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,26,8.667,26z"/>
            </svg>`,
            menu: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 18 12" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Rounded" transform="translate(-885.000000, -3438.000000)"><g transform="translate(100.000000, 3378.000000)"><g transform="translate(782.000000, 54.000000)"><g transform="translate(0.000000, 0.000000)"><polygon points="0 0 24 0 24 24 0 24"/><path d="M4,18 L20,18 C20.55,18 21,17.55 21,17 C21,16.45 20.55,16 20,16 L4,16 C3.45,16 3,16.45 3,17 C3,17.55 3.45,18 4,18 Z M4,13 L20,13 C20.55,13 21,12.55 21,12 C21,11.45 20.55,11 20,11 L4,11 C3.45,11 3,11.45 3,12 C3,12.55 3.45,13 4,13 Z M3,7 C3,7.55 3.45,8 4,8 L20,8 C20.55,8 21,7.55 21,7 C21,6.45 20.55,6 20,6 L4,6 C3.45,6 3,6.45 3,7 Z" fill="#1D1D1D"/></g></g></g></g></g></svg>`,
            edit: `<svg viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path></svg>`,
        }; 
    
        function createDraggableFormContainer(edit){
            var {main_cont_id, cbod_bg_color, head_text } = edit;
            if(gi(document,main_cont_id)) gi(document,main_cont_id).outerHTML = '';        
            var cont = ele('div');
            a(cont,[['dragme','true'],['id',main_cont_id],['style', `position: fixed; top: 40px; left: 40px; z-index: ${topZIndexer()}; width: ${(window.innerWidth > 799 ? 500: window.innerWidth * 0.6 )}px; border: 1px solid #0a1114; border-radius: 0.45em; background: #FFF; font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;`]]); //"Lucida Console", Monaco, monospace
            document.body.appendChild(cont);      
            var head = ele('div');
            a(head, [['style', `display: grid; grid-template-columns: 1fr 29px; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]]);
            cont.appendChild(head);
            head.onmouseover = dragElement;      

            var txt = ele('div');
            a(txt, [['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; color: #fff; text-align: center;`]]);
            head.appendChild(txt);
            txt.innerText = head_text;      
            var cls = ele('div');
            a(cls, [['style', `cursor: pointer;`]]);
            head.appendChild(cls);
            cls.innerHTML = svgs.close;
            cls.onclick = () => cont.outerHTML = '';
            cls.onmouseenter = aninCloseBtn;
            cls.onmouseleave = anoutCloseBtn;      
            var cont_rect = cont.getBoundingClientRect();
            var edge = 15;      
            var mainbod = ele('div');
            cont.appendChild(mainbod);      
            var cbod = ele('div');
            a(cbod,[['style',`background: ${cbod_bg_color}; padding: 12px; overflow-y: auto;`]]);
            mainbod.appendChild(cbod);        
            var footer = ele('div');
            a(footer, [['dragme','true'],['style', `display: grid; grid-template-columns: ${(cont_rect.width - (edge+4))}px ${edge}px; background: #0a1114; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; height: ${edge+4}px;`]]);
            mainbod.appendChild(footer);      
            var footertext = ele('div');
            footer.appendChild(footertext);      
            var resizer = ele('div');
            a(resizer, [['style', `background: transparent; cursor: nw-resize; text-align: left; border-radius: 0.4em;`]]);
            footer.appendChild(resizer);
            resizer.innerHTML = svgs.resize_hover;
            resizer.onmouseover = adjustElementSize;
            return cbod;
        }
        /*
        *******************************************
            download options main contianer creation
        *******************************************
        */
            function createDownloadOptionsContainer(options_object){
                let bod_height_ = (window.innerHeight && document.documentElement.clientHeight && document.getElementsByTagName('body')[0].clientHeight) ? Math.min(window.innerHeight, document.documentElement.clientHeight,document.getElementsByTagName('body')[0].clientHeight) : window.innerHeight && document.documentElement.clientHeight ? Math.min(window.innerHeight, document.documentElement.clientHeight) : 500;
                const edit = {
                    main_cont_id: 'table_options_container',
                    cbod_bg_color: '#f5f5f2',
                    head_text: 'Download Table Options',
                    height: (window.innerHeight * 0.8),
                };
                const ref = createDraggableFormContainer(edit);
                ref.style.display = 'grid';
                ref.style.gridTemplateRows = 'auto';
                ref.style.gridGap = '12px';
                ref.style.height = `${bod_height_ * 0.57}px`;
                var options = Object.entries(options_object);
                for(var i=0; i<options.length; i++){
                    createOptionTypeCard(options[i],ref);
                }
                const run_btn = ele('div');
                a(run_btn,[['style',`background: #00107d; color: #ffffff; border-radius: 0.2em; text-align: center; cursor: pointer; padding: 8px;`]]);
                ref.appendChild(run_btn);
                run_btn.onclick = initSearchConversion; //initSearchResultsDownload;
                run_btn.innerText = 'Download Convesion';

            }
    
            function createOptionTypeCard(d,ref){
                if(d[1].view_key){
                    const ob = {};
                    ob[d[0]] = d[1];
                    const current_obj_save_value = d[1].is_user_selected;
                    const cont = ele('div');
                    a(cont,[['style',`display: grid; grid-template-columns: 30px 21px 21px 1fr 1fr; grid-gap: 12px; transition: all 111ms; border-radius: 0.4em;  padding 12px; user-select: none;`]]);
                    ref.appendChild(cont);
                    // ['class','draggable_option_item'],
                    // cont.onmouseenter = rowin;
                    // cont.onmouseleave = rowout;
                    let move = ele('div');
                    a(move,[['class','draggable_option_item'],['style','cursor: pointer; user-select: none;']]);
                    cont.appendChild(move);
                    move.innerHTML = svgs.mover;
                    move.onmouseenter = initMoveHandler;
                    // move.onmouseleave = ()=
                    var check = ele('div');
                    a(check,[['jdat',`${JSON.stringify(d[1])}`],['selection',(current_obj_save_value === true ? 'on' : 'off')],['style',`user-select: none; text-align: center; width: 21px; height: 21px; border: 1px solid #2e2e2e; border-radius: 0.2em; background: transparent; color: #fff; cursor: pointer; transition: all 76ms;`]]);
                    cont.appendChild(check);
                    check.innerHTML = current_obj_save_value === true ? svgs.check : '';
                    check.onclick = typeOptionSelector;
    
                    var edit = ele('div');
                    cont.appendChild(edit);
                    if(d[1].in_array){
                        a(edit,[['jdat',`${JSON.stringify(d[1])}`],['style',`user-select: none; transform: translate(0, 1px); cursor: pointer; transition: all 111ms;`]]);
                        edit.innerHTML = svgs.edit;
                        edit.onclick = createSubOptions;
                    }
                    var text = ele('div');
                    a(text,[['style',`user-select: none; background: transparent; font-size: 1em; color: #2e2e2e; tranistion: all 1s;`]]);
                    cont.appendChild(text);
                    text.innerText = d[1].view_key;
                    if(d[1].number_to_display) {
                        dropDownHTML({mainobj: d[1], label: d[1].view_key, id: 'number_select_'+d[1].key, ref:cont, items: [1,2,3,4,5,6,7,8,9,Infinity], def: `Pull ${d[1].number_to_display} ${d[1].view_key}`});
                    }
                }
            }//createOptionTypeCard
            function rowin(){ this.style.background = '#fafaf7'; }
            function rowout(){ this.style.background = 'transparent'; }

/*
******************************
    ADD ORDER DRAG  MOVER
******************************
*/
            function createSubOptions(){
                var jdat = JSON.parse(this.getAttribute('jdat'));
                var options = Object.entries(jdat.in_array);
                var edit = {
                main_cont_id: 'sub_option_container',
                cbod_bg_color: '#f5f5f2',
                head_text: `${jdat.view_key} Sub Section Options`,
                };
                var ref = createDraggableFormContainer(edit);
                ref.style.display = 'grid';
                ref.style.gridTemplateRows = 'auto';
                ref.style.gridGap = '12px';
                let bod_height_ = (window.innerHeight && document.documentElement.clientHeight && document.getElementsByTagName('body')[0].clientHeight) ? Math.min(window.innerHeight, document.documentElement.clientHeight,document.getElementsByTagName('body')[0].clientHeight) : window.innerHeight && document.documentElement.clientHeight ? Math.min(window.innerHeight, document.documentElement.clientHeight) : 500;
                
                if((bod_height_ * 0.57) < ref.getBoundingClientRect().height){
                    ref.style.height = `${bod_height_ * 0.57}px`;
                }

                for(var i=0; i<options.length; i++){
                    var d = options[i];
                    createOptionTypeCard(d,ref);
                }
                var sub_cont = gi(document,edit.main_cont_id);
                var sub_rect = this.getBoundingClientRect();
                sub_cont.style.top = (window.innerHeight * 0.5) - (sub_cont.getBoundingClientRect().height * 0.5) > 0 ? `${(window.innerHeight * 0.5) - (sub_cont.getBoundingClientRect().height * 0.5)}px` : '40px';
                sub_cont.style.left = `${sub_rect.left}px`;

            }
            function typeOptionSelector(){
                var elm = this;
                var jdat = JSON.parse(this.getAttribute('jdat'));
                updateStoredClientPreferences({data:jdat},object_definition);
                var selection = this.getAttribute('selection');
                this.style.transform = 'scale(0.8, 0.8)';
                this.style.background = '#43de6d';
                this.ontransitionend = ()=> {
                    elm.style.transform = 'scale(1, 1)';
                    elm.style.background = 'transparent';
                };
                if(selection == 'on'){
                    this.innerHTML = '';
                    a(this,[['selection','off']]);
                }else{
                    this.innerHTML = svgs.check;
                    a(this,[['selection','on']]);
                }
            }
            function dropDownHTML(obj){
                var rgb = {r:18, g:16, b:31, change: 1};            
                var { ref, items, id, def, label } = obj;
                if(gi(document,id)) gi(document,id).outerHTML = '';
                var cont = ele('div');
                a(cont,[['id',id],['items',`${JSON.stringify(items)}`],['style',`display: grid; grid-template-columns: 1fr 20px; grid-gap: 4px; border: 1px solid #004471; border-radius: 0.2em; cursor: pointer;`]]);
                ref.appendChild(cont);
                cont.onclick = createOptions;          
                var text = ele('div');
                a(text,[['style',`color: #004471; text-align: center;`]]);
                cont.appendChild(text);
                text.innerText = def;            
                var sel = ele('div');
                cont.appendChild(sel);
                sel.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" transform="rotate(180)" version="1.1" viewBox="0 0 15 15">  <path d="M7.5385,2&#10;&#9;C7.2437,2,7.0502,2.1772,6.9231,2.3846l-5.8462,9.5385C1,12,1,12.1538,1,12.3077C1,12.8462,1.3846,13,1.6923,13h11.6154&#10;&#9;C13.6923,13,14,12.8462,14,12.3077c0-0.1538,0-0.2308-0.0769-0.3846L8.1538,2.3846C8.028,2.1765,7.7882,2,7.5385,2z"/></svg>`;          
                function hoverOut(){ this.style.background = `rgb(${rgb.r},${rgb.g},${rgb.b})`; }
                function hoverIn(){ this.style.background = '#ffffff'; }          
                function createOptions(){
                var rect = this.getBoundingClientRect();
                if(gi(document,'custom_dropdown_')) gi(document,'custom_dropdown_').outerHTML = '';
                var itm_height = 21;
                var top_pos = document.body.getBoundingClientRect().bottom > (rect.bottom - (items.length * itm_height))? (rect.top - (items.length * itm_height))+itm_height : rect.top;
                var bod = ele('div');
                a(bod,[['id','custom_dropdown_'],['style',`position: fixed; width: ${rect.width}px; top: ${top_pos}px; left: ${rect.left}px; display: grid; grid-template-rows: auto; grid-gap: 4px; border: 4px solid rgb(${rgb.r},${rgb.g},${rgb.b}); border-radius: 0.2em; background: rgb(${rgb.r},${rgb.g},${rgb.b}); z-index: ${topZIndexer() + 5000}; transition: all 133ms;`]]);
                document.body.appendChild(bod);
                bod.onmouseleave = killOptions;          
                for(var i=0; i<items.length; i++){
                    var itm = ele('div');
                    a(itm,[['dat',items[i]],['jdat',`${JSON.stringify(obj)}`],['style',`height: ${itm_height}px; color: #beb8d9; background: rgb(${rgb.r},${rgb.g},${rgb.b}); text-align: center; padding 0px; cursor: pointer; font-family: "Lucida Console", Monaco, monospace; transition: all 63ms;`]]);
                    itm.innerText = items[i];
                    bod.appendChild(itm);
                    itm.onmouseenter = hoverIn;
                    itm.onmouseleave = hoverOut;
                    itm.onclick = selection;
                }          
                async function selection(){
                    var d = this.getAttribute('dat');
                    var jdat = JSON.parse(this.getAttribute('jdat'));
                    let updated = await updateStoredClientPreferences({data:jdat.mainobj,updated_number:parseFloat(d)},object_definition);
                    tn(gi(document,id),'div')[0].innerText = `Pull ${d} ${jdat.label}`;
                    this.parentElement.style.height = (this.parentElement.getBoundingClientRect().height * 0.5) +'px';
                    Array.from(tn(this.parentElement,'div')).forEach(r=> {
                    r.style.height = (r.getBoundingClientRect().height * 0.5) +'px';
                    r.style.fontSize = '0.5em';
                    });
                    this.parentElement.style.top = (this.parentElement.getBoundingClientRect().top + this.parentElement.getBoundingClientRect().height) + 'px';
                    this.parentElement.ontransitionend = killOptions;
                }
                }
                function killOptions(){    if(gi(document,'custom_dropdown_')) gi(document,'custom_dropdown_').outerHTML = '';  }
            }
        createDownloadOptionsContainer(object_definition);
        }
        async function updateStoredClientPreferences(obj,saved_client_data_object){
            const {data,updated_number} = obj;
            if(data?.parent_key){
                saved_client_data_object[data.parent_key]['in_array'][data.key].is_user_selected = !saved_client_data_object[data.parent_key]['in_array'][data.key].is_user_selected;
                return saved_client_data_object;
            }
            if(!data?.parent_key && data.key && updated_number) {
                saved_client_data_object[data.key].number_to_display = updated_number;
            }
            if(!data?.parent_key && data.key && updated_number == undefined) {
            saved_client_data_object[data.key].is_user_selected = !saved_client_data_object[data.key].is_user_selected;
            }
        }
        async function initSearchConversion(){
            const processed = processUserSelectedOptions(client_options_object,client_json_data);
            convert2TsvAndDownload(processed,`${new Date().getTime()}.tsv`);
        }

        function processUserSelectedOptions(options_object,profile_objects){
            const cleanObject = (ob) => 
                Object.entries(ob).reduce((r, [k, v]) => {
                    if(v != null && v != undefined && v != "" && ( typeof v == 'boolean' || typeof v == 'string' || typeof v == 'symbol' || typeof v == 'number' || typeof v == 'function' || (typeof v == 'object'  && ((Array.isArray(v) && v.length) || (Array.isArray(v) != true)) ) ) ) { 
                        r[k] = v; 
                        return r;
                    } else { 
                        return r; 
                    }
                }, {});
            function array2dtoJSON(arr,obj){
                arr.forEach(kv=> obj[kv[0]] = kv[1]);
                return obj;
            }
            const obj_to_save = Object.entries(options_object);
            const should_flatten = obj_to_save.filter(kv=> kv[1] && kv[1].in_array ? kv[0] : false).map(kv=> kv[0]);
            function profileProcessor(profile,obj_to_save){
                return array2dtoJSON(Object.entries(profile).filter(kv=> {
                    var target = obj_to_save.filter(key=> key[0] == kv[0]);
                    return target[0] && target[0][1].is_user_selected === true;
                }),{})
            }
            return profile_objects.map(profile=> profileProcessor(profile,obj_to_save)).map(profile=> {
                should_flatten.forEach(target_key => {
                    var target_options = options_object[target_key];
                    profile = {...profile,...(profile[target_key] ? flatMapObjectItemsByUserOptions(profile[target_key],target_options) : {})}
                    delete profile[target_key];
                })
                return cleanObject(profile);
            });
        }
        function flatMapObjectItemsByUserOptions(arr,user_options){
            function dateString(d){
                const date = new Date(d);
                return `${date.getDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][date.getMonth()]} ${date.getFullYear()}`;
            }
            const milsec2years = (n) => Math.round((n/3.154e+10)*100)/100;
            const {number_to_display,in_array,key} = user_options;
            const change_options = Object.entries(in_array).filter(kv=> kv[1]['is_user_selected'] === true)
            if(arr && arr.length){
                let obj = {};
                let len = arr.length > number_to_display ? number_to_display : arr.length;
                for(let i=0; i<len; i++){
                    change_options.forEach(kv=> {
                        let current_key = `${key.replace(/s$/,'')}_${(i+1)}_${kv[0]}`.replace(/timestamp/,'date').replace(/m[il]+seconds/,'years');
                        obj[current_key] = arr[i][kv[0]]; //this runs first because the subsiquent if conditions will overwrite if they are true.
                        if(/timestamp/i.test(kv[0])) obj[current_key] = dateString(arr[i][kv[0]]);
                        if(/m[il]+seconds/i.test(kv[0])) obj[current_key] = milsec2years(arr[i][kv[0]]);
                    });
                }
                return obj;
            }else{ return {} }
        }
    var client_options_object = processObjectOptions(client_json_data.map(p=> cleanObject(p)), {}, {is_top_level: true});
console.log(client_options_object);    
    initTableOptionsUIfromObjectDefinitions(client_options_object);
    }


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
        const deduped = contain_arr[0] && contain_arr[0].public_id ? unqKey(contain_arr,'public_id') : contain_arr[0] && contain_arr[0].lir_niid ? unqKey(contain_arr,'lir_niid') : contain_arr[0] && contain_arr[0].basic_niid ? unqKey(contain_arr,'basic_niid') : contain_arr[0] && contain_arr[0].niid ? unqKey(contain_arr,'niid') : contain_arr;
        initUserInterfaceForJSON2TSVconversion(deduped);
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


// function processObjectStatePositionOptions(object_definitions,saved_preferences){
//     const remap = {};
//     const saved_keys = Object.entries(saved_preferences);
//     const saved_array Array(saved_keys)
//     Object.entries(object_definitions).forEach((kv,x,r)=> {
//         if(saved_preferences[kv[0]]){
// //             object_definitions[kv[0]] = saved_preferences[kv[0]]['sort_order'] != null ? saved_preferences[kv[0]]['sort_order'] :
//         }
// //         let saved_i = key ? key['i'] : ;
        
//     });
// }
// processObjectStatePositionOptions(temp1,{})

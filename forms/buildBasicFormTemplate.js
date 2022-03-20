async function buildBasicFormTemplate(){

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



    
    async function buildContainer(params){
        var {sub_application_id,range_label_text,btn_text} = params;
        setQuickliCSS(sub_application_id);
        // const height = window.innerHeight * 0.8; 
        // const width = window.innerWidth <= 800 ? window.innerWidth * 0.9 : window.innerWidth > 800 && window.innerWidth < 1161 ? window.innerWidth * 0.7 : window.innerWidth * 0.6;
        if(gi(document,sub_application_id)) gi(document,sub_application_id).outerHTML = '';
        const cont = ele('div');
        a(cont,[['id',sub_application_id]]);
        let shadow = 'box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;';
        inlineStyler(cont,`{display: grid; grid-template-columns: 32px 1fr 4px; ${shadow} text-align: left; background-image: linear-gradient(to bottom right, #dae3e8, #ffffff, #ffffff, #ffffff); color: #374552; border-radius: 1em; position: fixed; z-index: ${topZIndexer()}; top: 100px; left: 0px;}`); // max-height: ${height}px; max-width: ${width}px; 
        document.body.appendChild(cont);

            const left_panel = ele('div');
            a(left_panel,[['id','left_panel'],['class','mover-left-gradient']]);
            inlineStyler(left_panel,`{display: grid; grid-template-rows: 32px 1fr; grid-gap: 12px; user-select: none;}`);
            cont.appendChild(left_panel);

                const cls = ele('div');
                left_panel.appendChild(cls);
                a(cls,[['class','hover_btn h32']]);
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
                inlineStyler(right_body_cont,`{background: #ffffff; border-top-left-radius: 1em; border-bottom-right-radius: 1em;}`);
                right_panel.appendChild(right_body_cont);

                let range_label = ele('div');
                right_body_cont.appendChild(range_label);
                range_label.innerText = range_label_text;

                let range_slider = ele('input');
                a(range_slider,[['id',`${sub_application_id}_range_slider`],['type','range'],['max','30'],['min','1']]);
                right_body_cont.appendChild(range_slider);
                range_slider.value = 7;
                range_slider.onmousemove = ()=> {    range_label.innerText = `${range_slider.value} ${range_label_text}`;  };

                let top_label = ele('div');
                a(top_label,[['id','top_label']]);
                inlineStyler(top_label,`{text-align: center;}`);
                right_body_cont.appendChild(top_label);
                // top_label.innerText = '';


                let textarea = ele('textarea');
                a(textarea,[['id',`${sub_application_id}_textarea`],['class','textarea pad8'],['placeholder','your\ncontent\nhere']]);
                inlineStyler(textarea,`{height:400px; width:380px;}`);
                right_body_cont.appendChild(textarea);

                let run_btn = ele('div');
                a(run_btn,[['class','hover_btn centertext pad8']]);
                right_body_cont.appendChild(run_btn);
                run_btn.innerText = btn_text;
                // run_btn.onclick = ;

                inlineStyler(range_slider,`{width:${textarea.getBoundingClientRect().width}px;}`)
    }
    
    buildContainer({sub_application_id:'content_popup_form',range_label_text:'range_label_text',btn_text:'Run Program'})
}
buildBasicFormTemplate()

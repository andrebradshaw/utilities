const cn = (o,s)=>o ? o.getElementsByClassName(s) : null;
const tn = (o,s)=>o ? o.getElementsByTagName(s) : null;
const gi = (o,s)=>o ? o.getElementById(s) : null;
const ele = (t)=>document.createElement(t);
const attr = (o,k,v)=>o ? o.setAttribute(k, v) : false;
const a = (l,r)=>r.forEach(i=>attr(l, i[0], i[1]));
const btoaJSON = (s)=>btoa(encodeURIComponent(JSON.stringify(s)))
const atobJSON = (s)=>JSON.parse(decodeURIComponent(atob(s)))
const app_icons = {
    resize: `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000.000000 1000.000000" version="1.0"><g stroke="none" fill="#53fc18" transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">        <path d="M9235 9969 c-31 -17 -9164 -9151 -9181 -9181 -8 -15 -14 -49 -14 -76 0 -38 6 -57 29 -88 34 -46 535 -544 571 -568 28 -18 110 -22 143 -5 31 16 9165 9148 9183 9181 8 15 14 49 14 76 0 38 -6 57 -29 88 -34 46 -535 544 -571 568 -28 18 -114 21 -145 5z"/>        <path d="M5923 4093 c-1911 -1908 -3479 -3476 -3484 -3485 -5 -9 -9 -38 -9 -64 l0 -48 228 -228 228 -228 53 0 53 0 3478 3472 c1914 1909 3482 3478 3485 3485 3 8 5 35 5 61 l0 46 -228 228 -228 228 -53 0 -53 0 -3475 -3467z"/>        <path d="M7042 2957 l-2442 -2442 0 -45 0 -45 213 -213 212 -212 45 0 45 0 2443 2443 2442 2442 0 45 0 45 -213 213 -212 212 -45 0 -45 0 -2443 -2443z"/>        <path d="M8088 1922 l-1478 -1477 0 -45 c0 -44 1 -45 178 -222 177 -178 178 -178 222 -178 l45 0 1472 1473 1473 1472 0 55 0 56 -173 172 c-172 171 -174 172 -218 172 l-44 0 -1477 -1478z"/></g>        </svg>`,
    resize_hover: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)" fill="#53fc18" stroke="none">        <path d="M5318 4622 l-3798 -3797 0 -59 0 -60 312 -314 c172 -172 325 -320 340 -328 15 -8 49 -14 75 -14 l48 0 3797 3798 3798 3797 0 59 0 60 -312 314 c-172 172 -325 320 -340 328 -15 8 -49 14 -75 14 l-48 0 -3797 -3798z"/>        <path d="M6763 3147 l-2483 -2482 0 -50 0 -49 268 -268 268 -268 49 0 50 0 2482 2483 2483 2482 0 50 0 49 -268 268 -268 268 -49 0 -50 0 -2482 -2483z"/>        <path d="M8058 1902 l-1268 -1267 0 -50 0 -50 248 -247 247 -248 50 0 50 0 1267 1268 1268 1267 0 50 0 50 -248 247 -247 248 -50 0 -50 0 -1267 -1268z"/>        </g>        </svg>`,
    close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#53fc18" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
    search_icon:`<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.25 2C10.1488 2 12.5 4.35125 12.5 7.25C12.5 8.4275 12.1062 9.51125 11.45 10.3888L14 12.9388L12.9388 14L10.3888 11.45C9.51125 12.1063 8.4275 12.5 7.25 12.5C4.35125 12.5 2 10.1488 2 7.25C2 4.35125 4.35125 2 7.25 2ZM7.25 11C9.31625 11 11 9.31625 11 7.25C11 5.18375 9.31625 3.5 7.25 3.5C5.18375 3.5 3.5 5.18375 3.5 7.25C3.5 9.31625 5.18375 11 7.25 11Z" fill="#53fc18"></path></svg>`,
};
var container_params = {
    parent_elm:document.body,
    attach_method:'appendChild',
    id:'container_main',
    bg_color:'#191b1f',
}

function inlineStyler(elm, css) {
    if (elm) {
        Object.entries(JSON.parse(css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g, '"').replace(/(?<=:\s*.+?);/g, '",').replace(/[a-zA-Z-]+(?=:)/g, k=>k.replace(/^\b/, '"').replace(/\b$/, '"')).replace(/\s*,\s*}/g, '}'))).forEach(kv=>{
            elm.style.setProperty([kv[0]], kv[1], 'important')
        }
        );
    }
}
function topZIndexer() {
    let n = new Date().getTime() / 1000000;
    let r = (n - Math.floor(n)) * 100000;
    return (Math.ceil(n + r) * 10);
}

function topIndexHover() {
    this.style.zIndex = topZIndexer();
}

function setHTMLCSS(style_id, css_text) {
    if (document.getElementById(`${style_id}_style`))
        document.getElementById(`${style_id}_style`).outerHTML = '';
    let csselm = ele('style');
    a(csselm, [['class', `${style_id}_style`]]);
    document.head.appendChild(csselm);
    csselm.innerHTML = css_text;
}

function dragElement() {
    var acted_elm = this;
    var el = this.parentElement.parentElement;
    var pos1 = 0
      , pos2 = 0
      , pos3 = 0
      , pos4 = 0;
    if (document.getElementById(this.id))
        document.getElementById(this.id).onmousedown = dragMouseDown;
    else
        this.onmousedown = dragMouseDown;
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
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
        el.style.opacity = "0.85";
        el.style.zIndex = topZIndexer();
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        el.style.opacity = "1";
        el.style.zIndex = topZIndexer();
    }
}

function adjustElementSize(){
    var cont = this.parentElement.parentElement;
    // var tbod = cn(cont,'menu_body')?.[0]
    let resize_elm_classes = this.getAttribute('data-resize-classes').split(/,/);
    // var cont = document.getElementsByClassName(resize_elm_classes[0])?.[0];
    var tbod = cont.getElementsByClassName(resize_elm_classes[1])?.[0];
    let tbod_css = atobJSON(tbod.getAttribute('data-css'));
    let min_width = 100;
    let min_height = 98;
    var foot_height = 0;
    var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
    var width = cont.getBoundingClientRect().width;
    var height = cont.getBoundingClientRect().height;

    if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
    else this.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        let moved_width = (width - (pos3 - e.clientX))
        let moved_height = (height - (pos4 - e.clientY))
        let main_width = moved_width < min_width ? min_width : moved_width;
        let main_height = moved_height < min_height ? min_height : Math.floor(((height - (pos4 - e.clientY)) - (foot_height)));
        
        inlineStyler(cont,`{width: ${main_width}px;${ moved_width < min_width ? '' : ' height: '+main_height+'px; '}z-index: ${topZIndexer()};}`);
        if(tbod){
            inlineStyler(tbod,`{width: ${((main_width+tbod_css.width))}px;${ moved_width < min_width ? '' : ' height: '+(main_height+tbod_css.height)+'px;'}opacity: 0.5; }`);
        }
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        if(tbod) tbod.style.opacity = '1';
    }
}



function createBasicContainer(params){
    if(gi(document,params?.id)) gi(document,params?.id).outerHTML = '';
    const main_width = (window.innerWidth * 0.7);

    let cont = ele('div');
    a(cont,[['class',`menu_container${params?.classname ? ' '+params?.classname : ''}`],['id',params?.id]].filter(r=> r[1]));
    inlineStyler(cont,`{position: fixed; top: ${params?.top ? params?.top+'px' : '0xp'}; width: ${params?.width ? params?.width+'px' : main_width}px; left: ${params?.left ? params?.left+'px' : '0px'}; z-index: ${topZIndexer()}; background: ${params?.bg_color ? params?.bg_color : 'transparent'}; border-radius: 0.2em; border: 2px solid ${params.border_color ? params.border_color : 'transparent'}; box-shadow:0px 1px 1px 1px rgba(0,0,0,0.4);}`);
    
    try{
        params?.parent_elm?.[params?.attach_method](cont,params?.ref_elm);
    }
    catch(err){
        document.body.appendChild(cont);
    }
    cont.onclick = topIndexHover;

        let header = ele('div');
        cont.appendChild(header);
        inlineStyler(header, `{height: 32px; display: grid; grid-template-columns: 32px 1fr; grid-gap:0px; user-select: none;}`); 

            let cls_btn = document.createElement('div');
            cls_btn.innerHTML = app_icons.close;
            header.appendChild(cls_btn);
            inlineStyler(cls_btn, `{cursor: pointer;}`);
            cls_btn.onclick = ()=>{ cont.outerHTML = ''; };

            let head_mover = document.createElement('div');
            a(head_mover,[['class','drag_actor_head']]);
            inlineStyler(head_mover, `{text-align: left; cursor: move;}`);
            header.appendChild(head_mover);
            head_mover.onmouseover = dragElement;

        let tbody = ele('div');
        cont.appendChild(tbody);
        a(tbody,[['class','menu_body']])
        inlineStyler(tbody, `{display: grid; grid-template-columns: 32px 1fr 32px;}`);

            let left_side = ele('div');
            tbody.appendChild(left_side);
            a(left_side,[['class','drag_actor_left']]);
            left_side.onmouseover = dragElement;
            inlineStyler(left_side, `{cursor:move; height:100%;}`);

            let middle_cont = ele('div');
            inlineStyler(middle_cont,`{overflow: auto;}`);
            a(middle_cont,[['class','middle_cont'],['data-css',btoaJSON({height:-(26+32),width:-64})]]);
            tbody.appendChild(middle_cont);

            let right_side = ele('div');
            tbody.appendChild(right_side);
            a(right_side,[['class','drag_actor_right']]);
            right_side.onmouseover = dragElement;
            inlineStyler(right_side, `{cursor:move; height:100%;}`);

        let footer = ele('div');
        cont.appendChild(footer);
        inlineStyler(footer,`{height: 22px; display:grid; grid-template-columns: 1fr 22px; user-select: none;}`);

            let foot_label = ele('div');
            footer.appendChild(foot_label);
            inlineStyler(foot_label, `{cursor:move;}`);
            a(foot_label,[['class','drag_actor_foot']]);
            foot_label.onmouseover = dragElement;

            let foot_resizer = ele('div');
            a(foot_resizer,[['data-resize-classes','menu_container,middle_cont']]);
            inlineStyler(foot_resizer,`{width:22px; height: 22px; cursor:nw-resize;}`);
            footer.appendChild(foot_resizer);
            foot_resizer.innerHTML = app_icons.resize;
            foot_resizer.onmouseover = adjustElementSize;

    return {
        cont:cont,
        header:header,
        cls_btn:cls_btn,
        head_mover:head_mover,
        tbody:tbody,
        left_side:left_side,
        middle_cont:middle_cont, /* this is where you will attach all of the elements you wish to add to the container */
        right_side:right_side,
        footer:footer,
        foot_label:foot_label,
        foot_resizer:foot_resizer,
    }
}


/*
Create basic dragable and resizable container
*/

createBasicContainer(container_params)

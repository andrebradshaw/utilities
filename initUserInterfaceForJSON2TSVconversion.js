async function convertJsonUserInterface(client_json_data){
    const reg = (o, n) => o ? o[n] : '';
    const cn = (o, s) => o ? o.getElementsByClassName(s) : null;
    const tn = (o, s) => o ? o.getElementsByTagName(s) : null;
    const gi = (o, s) => o ? o.getElementById(s) : null;
    const ele = (t) => document.createElement(t);
    const attr = (o, k, v) => o.setAttribute(k, v);
    const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const cleanObject = (ob) => 
        Object.entries(ob).reduce((r, [k, v]) => {
            if(v != null && v != undefined && v != "" && ( typeof v == 'boolean' || typeof v == 'string' || typeof v == 'symbol' || typeof v == 'number' || typeof v == 'function' || (typeof v == 'object'  && ((Array.isArray(v) && v.length) || (Array.isArray(v) != true)) ) ) ) { 
                r[k] = v; 
                return r;
            } else { 
                return r; 
            }
        }, {});
    function topZIndexer(){
        let n = new Date().getTime() / 1000000;
        let r = (n - Math.floor(n)) * 100000;
        return (Math.ceil(n+r) * 10);
    }

    function inlineStyler(elm,css){
        Object.entries(JSON.parse(
        css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g,'"')
            .replace(/(?<=:\s*.+?);/g,'",')
            .replace(/[a-zA-Z-]+(?=:)/g, k=> k.replace(/^\b/,'"').replace(/\b$/,'"'))
            .replace(/\s*,\s*\}/g,'}')
        )).forEach(kv=> { elm.style[kv[0]] = kv[1]});
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
            
            .label-text {
                margin-left: 16px;
            }
            
            .toggle {
                isolation: isolate;
                position: relative;
                height: 30px;
                width: 60px;
                border-radius: 2em;
                overflow: hidden;
                box-shadow:
                -8px -4px 8px 0px #ffffff,
                8px 4px 12px 0px #d1d9e6,
                4px 4px 4px 0px #d1d9e6 inset,
                -4px -4px 4px 0px #ffffff inset;
            }
            
            .toggle-state {
                display: none;
            }
            
            .indicator {
                height: 100%;
                width: 200%;
                background: #ecf0f3;
                border-radius: 2em;
                transform: translate3d(-75%, 0, 0);
                transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
                box-shadow:
                -1px -2px 8px 0px #ffffff,
                8px 4px 12px 0px #d1d9e6;
            }
            
            .toggle-state:checked ~ .indicator {
                transform: translate3d(25%, 0, 0);
                background: #d0f2e5;
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
    setQuickliCSS('quickli_job_btn');

    function keepElmInBoundary(elm){ 
        if(elm.getBoundingClientRect().right >= window.innerWidth){
            inlineStyler(elm,`{left: ${(window.innerWidth - (elm.getBoundingClientRect().width+30))}px;}`);
        }
        if(elm.getBoundingClientRect().bottom >= window.innerHeight){
            inlineStyler(elm,`{top: ${(window.innerHeight - (elm.getBoundingClientRect().height+60))}px;}`);
        }
    }

    var svgs = {
        close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
        resize: `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000.000000 1000.000000" version="1.0">        <g stroke="none" fill="#43de6d" transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">        <path d="M9235 9969 c-31 -17 -9164 -9151 -9181 -9181 -8 -15 -14 -49 -14 -76 0 -38 6 -57 29 -88 34 -46 535 -544 571 -568 28 -18 110 -22 143 -5 31 16 9165 9148 9183 9181 8 15 14 49 14 76 0 38 -6 57 -29 88 -34 46 -535 544 -571 568 -28 18 -114 21 -145 5z"/>        <path d="M5923 4093 c-1911 -1908 -3479 -3476 -3484 -3485 -5 -9 -9 -38 -9 -64 l0 -48 228 -228 228 -228 53 0 53 0 3478 3472 c1914 1909 3482 3478 3485 3485 3 8 5 35 5 61 l0 46 -228 228 -228 228 -53 0 -53 0 -3475 -3467z"/>        <path d="M7042 2957 l-2442 -2442 0 -45 0 -45 213 -213 212 -212 45 0 45 0 2443 2443 2442 2442 0 45 0 45 -213 213 -212 212 -45 0 -45 0 -2443 -2443z"/>        <path d="M8088 1922 l-1478 -1477 0 -45 c0 -44 1 -45 178 -222 177 -178 178 -178 222 -178 l45 0 1472 1473 1473 1472 0 55 0 56 -173 172 c-172 171 -174 172 -218 172 l-44 0 -1477 -1478z"/>        </g>        </svg>`,
        resize_hover: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)" fill="#43de6d" stroke="none">        <path d="M5318 4622 l-3798 -3797 0 -59 0 -60 312 -314 c172 -172 325 -320 340 -328 15 -8 49 -14 75 -14 l48 0 3797 3798 3798 3797 0 59 0 60 -312 314 c-172 172 -325 320 -340 328 -15 8 -49 14 -75 14 l-48 0 -3797 -3798z"/>        <path d="M6763 3147 l-2483 -2482 0 -50 0 -49 268 -268 268 -268 49 0 50 0 2482 2483 2483 2482 0 50 0 49 -268 268 -268 268 -49 0 -50 0 -2482 -2483z"/>        <path d="M8058 1902 l-1268 -1267 0 -50 0 -50 248 -247 247 -248 50 0 50 0 1267 1268 1268 1267 0 50 0 50 -248 247 -247 248 -50 0 -50 0 -1267 -1268z"/>        </g>        </svg>`,
        check: `<svg width="14px" height="14px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 80.588 61.158" style="enable-background:new 0 0 80.588 61.158;" xml:space="preserve"><path style="fill:#43de6d;" d="M29.658,61.157c-1.238,0-2.427-0.491-3.305-1.369L1.37,34.808c-1.826-1.825-1.826-4.785,0-6.611  c1.825-1.826,4.786-1.827,6.611,0l21.485,21.481L72.426,1.561c1.719-1.924,4.674-2.094,6.601-0.374  c1.926,1.72,2.094,4.675,0.374,6.601L33.145,59.595c-0.856,0.959-2.07,1.523-3.355,1.56C29.746,61.156,29.702,61.157,29.658,61.157z  "/></svg>`,
        mover: `<svg style="height: 24px; width: 24px;" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">            <path fill="#231F20" d="M8.667,15h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,15,8.667,15z"/>            <path fill="#231F20" d="M8.667,37h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,37,8.667,37z"/>            <path fill="#231F20" d="M8.667,26h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,26,8.667,26z"/>            </svg>`,            menu: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 18 12" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Rounded" transform="translate(-885.000000, -3438.000000)"><g transform="translate(100.000000, 3378.000000)"><g transform="translate(782.000000, 54.000000)"><g transform="translate(0.000000, 0.000000)"><polygon points="0 0 24 0 24 24 0 24"/><path d="M4,18 L20,18 C20.55,18 21,17.55 21,17 C21,16.45 20.55,16 20,16 L4,16 C3.45,16 3,16.45 3,17 C3,17.55 3.45,18 4,18 Z M4,13 L20,13 C20.55,13 21,12.55 21,12 C21,11.45 20.55,11 20,11 L4,11 C3.45,11 3,11.45 3,12 C3,12.55 3.45,13 4,13 Z M3,7 C3,7.55 3.45,8 4,8 L20,8 C20.55,8 21,7.55 21,7 C21,6.45 20.55,6 20,6 L4,6 C3.45,6 3,6.45 3,7 Z" fill="#1D1D1D"/></g></g></g></g></g></svg>`,
        edit: `<svg viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path></svg>`,
    }; 



/*
    ********************************************************
                    VERTICAL MOVE HANDLER
    ********************************************************
*/
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

/*
    ********************************************************
                    PROCESS OBJECT OPTIONS
    ********************************************************
*/

    function processObjectOptions(arr,user_selected_object_state, object_level){       
        function fixNameCase(s){
            const specialchar = [19990,30028,22823,23398,25490,21517,23383,30340,35299,37322,20041,24322,20307,38899,38901,26041,35328,37096,39318,31508,30011,24247,29081,20856,35828,25991,28304,24418,25340,27880,23553,24314,31038,20250,20013,22522,26412,20010,26102,20195,26377,29305,25351,19977,24180,24456,22810,22909,20960,36744,23376,32426,30334,27969,33459,30456,20256,34989,23478,224,232,233,235,239,307,225,234,237,238,244,243,250,251,198,216,197,230,248,229,196,214,228,246,352,353,381,382,213,220,245,252,223,199,202,206,350,219,231,351,258,194,354,259,226,355,212,372,374,193,201,205,207,373,375,211,218,7810,221,192,200,204,210,217,7808,7922,203,7812,376,7811,253,236,242,249,7809,7923,7813,255,264,284,292,308,348,364,265,285,293,309,349,365,286,304,287,305,208,222,240,254,336,368,337,369,338,339,227,209,241,195,7868,296,360,7928,71,771,7869,297,361,7929,261,769,281,303,322,324,260,280,302,321,323,257,772,275,299,333,491,493,363,490,370,371,263,347,378,380,367,379,268,262,272,270,282,327,344,356,366,271,283,328,345,357,317,313,340,318,314,341,256,274,290,298,310,315,325,332,342,362,291,311,316,326,343,278,279,7842,7840,7856,7858,7860,7854,7862,7846,7848,7850,7844,7852,7866,7864,7872,7874,7876,7870,7878,7880,7882,7886,7884,7890,7892,7894,7888,7896,416,7900,7902,7904,7898,7906,7910,7908,431,7914,7916,7918,7912,7920,7926,7924,273,7843,7841,7857,7859,7861,7855,7863,7847,7849,7851,7845,7853,7867,7865,7873,7875,7877,7871,7879,7881,7883,7887,7885,7891,7893,7895,7889,417,7901,7903,7905,7899,7907,7911,7909,432,7915,7917,7919,7913,7921,7927,7925,42903,277,335,7620,913,945,914,946,915,947,916,948,917,949,918,950,919,951,920,952,921,953,922,954,923,955,924,956,925,957,926,958,927,959,928,960,929,961,931,963,962,932,964,933,965,934,966,935,967,936,968,937,969,1049,1065,1068,1070,1071,1066,1025,1067,1069,1038,1048,1168,1028,1030,1031,1033,1034,1039,1027,1036,1035,1026,42562,42560,1047,42568,1054,1091,42570,1120,42576,1122,42582,1124,1126,1128,1130,1132,1134,1136,1138,1140,1152,1217,1488,1489,1490,1491,1492,1493,1494,1495,1496,1497,1499,1500,1502,1504,1505,1506,1508,1510,1511,1512,1513,1514,1471,21270,28450,22280,12549,12550,12551,12552,12553,12554,12555,12556,12557,12558,12559,12563,12584,12579,12576,12586,12587,12588,6016,6017,6018,6019,6020,6021,6022,6023,6024,6025,6026,6027,6028,6029,6030,6031,6032,6033,6034,6035,6036,6037,6038,6039,6040,6047,6048,6041,6042,6043,6049,6050,6044,6098,6082,1329,1330,1331,1332,1333,1334,1335,1336,1337,1338,1339,1340,1341,1342,1343,1344,1345,1346,1347,1348,1349,1350,1351,1352,1353,1354,1355,1356,1357,1358,1359,1360,1361,1362,1363,1364,1365,1366,4304,4305,4306,4307,4308,4309,4310,4337,4311,4312,4313,4314,4315,4316,4338,4317,4318,4319,4320,4321,4322,4339,4323,4324,4325,4326,4327,4328,4329,4330,4331,4332,4333,4334,4340,4335,4336,4341,4342,4343,1582,1581,1580,1579,1578,1576,1575,7723,7717,7791,1589,1588,1587,1586,1585,1584,1583,7779,7695,1602,1601,1594,1593,1592,1591,1590,289,8216,7827,7789,7693,1610,1608,1607,1606,1605,1604,1603,4344,537,539,29233,34108,23433,32013,26062,23453,33502,30887,24425,32418,26149,33452,28023,27054,33457,27426,20976,24935,38748,32681,38745,24609,33738,23071,22372,20848,34174,20029,28789,38083,32654,26757,24800,26519,26262,23425,23068,38738,28165,31179,26376,28113,39034,32032,32899,24494,34183,31168,33521,38634,38597,33395,23159,38639,20202,38134,33643,29577,24841,38632,20113,20801,29645,30495,36126,22269,30333,26575,27874,21338,26124,30021,38271,36229,28526,26216,36784,25104,35802,24535,35946,26126,20426,20625,36798,24503,19996,26635,23500,33433,29995,21083,28009,28982,23431,27827,21644,24658,34425,24344,40511,23439,20339,20581,37329,31934,26230,20140,20975,24320,38283,21855,20142,24179,24378,19992,33635,34701,23481,23454,21490,30707,28059,20255,27494,32724,31077,39321,27915,38451,27901,36713,28085,52292,50896,45796,51008,44221,51648,51452,51204,49436,50689,55148,48120,54616,50980,51652,54812,54788,51221,50500,48124,50864,54868,49440,50672,49688,48712,50696,50976,48337,52384,45824,46020,46041,54644,44148,54840,51456,51116,54980,54984,49453,44508,49437,49345,49548,49849,49884,49457,53468,50857,48148,48372,50577,53440,46972,50748,50840,51060,50504,45397,12643,50836,49569,46375,49328,46356,49828,44608,47000,50640,47533,47560,54028,50872,45208,269,51228,47536,49324,50900,50528,54532,47540,44057,47532,52852,53944,53444,45815,47928,45576,51200,46988,51064,51236,52380,47588,52824,35199,44609,12619,52768,24859,12354,12356,12450,12452,33673,26792,12522,12513,12456,20025,20955,37324,29702,26417,20124,12363,12426,26447,12531,12474,33909,12362,12458,21315,24693,31505,38525,33756,12498,12490,12289,12479,12495,12523,12461,12494,36965,26228,12402,12414,20037,33545,20161,20809,23515,35029,23551,12385,20285,26654,22856,19968,24950,25964,21843,32854,24515,23567,12467,21332,37111,33310,40635,34915,24339,30001,12422,12415,12510,12518,12511,12417,12368,26716,26410,26469,21682,12469,19971,22799,24076,23455,20956,24184,12463,12521,31680,26234,26379,33391,24742,32080,12454,20778,26397,27193,36637,36628,12399,12427,12392,38588,20154,21521,12525,12488,12516,12477,12460,21191,12388,12365,20108,37070,26007,20171,28193,21213,25935,20063,22826,36066,28147,35488,27491,38596,28234,12459,12487,30452,20462,34030,12524,20278,12428,38520,31452,40845,24736,39423,12471,12517,31354,26122,12381,12425,39087,36914,21280,24039,25299,23389,38534,23815,23562,21746,24505,37444,32764,12520,36020,32000,35914,31331,1112,1113,1114,1119,1106,1115,24352,8211,29579,26446,21016,30922,20891,26480,1098,1097,1103,1102,1081,1089,1088,1087,1082,1080,1072,1111,1085,1100,1108,1110,1169,1105,1099,1101,970,912,971,944,943,940,8048,8118,7936,7937,8115,8165,1415,399,601,941,942,972,973,974,1073,1077,1083,1118,1096,1095,1074,1090,1086,1107,1116,1109,12616,12618,12621,12627,6070,6113,6114,6115,6116,6117,6118,6119,6120,6121,1075,1084,1076,12610,54620,44397,50612,51312,47568,12398,12434,12364,12401,12404,12497,29694,27161,28310,35486,31925,32321,39636,31616,35821,39277,38382,35744,38021,39267,32415,38376,37504,39151,21839,35329,37330,39136,31993,38272,36825,23545,20851,20070,19975,36793,36710,20799,22283,26371,36889,20358,23565,38364,26178,20491,26360,38263,33836,37002,26481,36554,20818,22021,21655,21633,22175,21874,21780,20322,20060,22050,26082,26085,12394,12375,12419,12421,12423,12387,12390,12515,12519,12483,12486,12391,12378,1032,1029,267,295,330,331,415,629,418,419,2437,2438,2439,2440,2441,2442,2443,2447,2448,2451,2452,5025,5026,5027,5028,5029,5030,5031,5032,5033,5034,5035,5036,5037,5038,5039,5040,5041,5042,5043,5044,5045,5046,5047,5048,5049,5050,5051,5052,5053,5054,5055,5056,5057,5058,5059,5060,5061,5062,5063,5064,5065,5066,5067,5068,5069,5070,5071,5072,5073,5074,5075,5076,5077,5078,5079,5080,5081,5082,5083,5084,5085,5086,5087,5088,5089,5090,5091,5092,5093,5094,5095,5096,5097,5098,5099,5100,5101,5102,5103,5104,5105,5106,5107,5108,1662,1670,1688,1711,2453,2494,2495,2496,2497,2498,2499,2503,2504,2507,2508,2509,2468,8205,2434,2435,2433,2454,2455,2456,2457,2458,2459,2460,2461,2462,2463,2464,2465,2466,2467,2469,2470,2471,2472,2474,2475,2476,2477,2478,2479,2480,2544,2482,2545,2486,2487,2488,2489,2492,2534,2535,2536,2537,2538,2539,2540,2541,2542,2543,2309,2310,2311,2312,2313,2314,2315,2400,2316,2401,2317,2318,2319,2320,2321,2322,2323,2325,2326,2327,2328,2329,2330,2331,2332,2333,2334,2335,2336,2337,2338,2339,2340,2341,2342,2343,2344,2346,2347,2348,2349,2350,2351,2352,2354,2355,2357,2358,2359,2360,2361,2406,2407,2408,2409,2410,2411,2412,2413,2414,2415,2381,2305,2306,2307,2364,2365,2565,2566,2567,2568,2569,2570,2575,2576,2579,2580,2581,2582,2583,2584,2585,2586,2587,2588,2589,2590,2591,2592,2593,2594,2595,2596,2597,2598,2599,2600,2602,2603,2604,2605,2606,2607,2608,2610,2620,2613,2616,2617,2693,2694,2695,2696,2697,2698,2699,2700,2701,2703,2704,2705,2707,2708,2709,2710,2711,2712,2713,2714,2715,2716,2717,2718,2719,2720,2721,2722,2723,2724,2725,2726,2727,2728,2730,2731,2732,2733,2734,2735,2736,2738,2739,2741,2742,2743,2744,2745,2784,2785,2786,2787,3904,3905,3906,3908,3909,3910,3911,3913,3919,3920,3921,3923,3924,3925,3926,3928,3929,3930,3931,3933,3934,3935,3936,3937,3938,3939,3940,3942,3943,3944,1040,1041,1042,1043,1044,1045,1046,1050,1051,1052,1053,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,12358,12360,2995,3021,2980,3009,2965,3007,2993,2985,2990,2996,2949,2997,2992,2953,2970,2994,2950,2951,2952,2954,2958,2959,2960,2962,2963,2964,2969,2974,2975,2979,2984,2986,2991,2510,1808,1810,1811,1813,1815,1816,1817,1818,1819,1821,1823,1824,1825,1826,1827,1829,1830,1832,1833,1834,1836,1729,1746,8238,1657,1672,1681,1722,1705,1835,1740,1577,1573,1609].map(r=> String.fromCharCode(r)).reduce((a,b)=> a+b)
            const x = new RegExp('^[^'+specialchar+'abcdefghijklmnopqrstuvwxyz\s]+','ig');
            const w = new RegExp('[^'+specialchar+'abcdefghijklmnopqrstuvwxyz\s]+$','ig');
            const y = new RegExp('(?=[^'+specialchar+'a-zA-Z])\\b','i');
            return s && typeof s == 'string' ? s.replace(x,'').replace(w,'').split(y).map(el=> el.replace(/\w\S*/g, txt=> txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('').replace(/(?<=\bMc)\w/ig, t=> t.charAt(0).toUpperCase()) : s;
        }
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
                            column_order: 0,
                        }
                    }
                    
                }
            })
        })
        return object_definitions;

    }
/*
    ********************************************************
                TABLE OPTIONS USER INTERFACE  
    ********************************************************
*/

    function initTableOptionsUIfromObjectDefinitions(object_definition){

        function createDraggableFormContainer(params){
            const {id,head_text} = params;
            const window_zoom = window.devicePixelRatio;
            const height = (window.innerHeight * 0.9) / window_zoom;
            const width = (window.innerWidth <= 800 ? window.innerWidth * 0.9 : window.innerWidth > 800 && window.innerWidth < 1161 ? window.innerWidth * 0.7 : window.innerWidth * 0.6) / window_zoom;
        
            if(gi(document,id)) gi(document,id).outerHTML = '';
            const cont = ele('div');
            a(cont,[['id',id]]);
            let shadow = 'box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;';
            inlineStyler(cont,`{display: grid; grid-template-columns: 32px 1fr; grid-gap: 12px; ${shadow} text-align: left; max-height: ${height}px; max-width: ${width}px; background: #ffffff; color: #374552; border-radius: 1em; padding: 12px; transition: all 111ms; position: fixed; z-index: ${topZIndexer()}; top: 500px; left: 0px;}`);
            document.body.appendChild(cont);
            
            const panel = ele('div');
            a(panel,[['class','mover-left-gradient']]);
            inlineStyler(panel,`{display: grid; grid-template-rows: 32px ${height-60}px; grid-gap: 12px; user-select: none;}`);
            cont.appendChild(panel);
        
            const cls = ele('div');
            panel.appendChild(cls);
            a(cls,[['class','quickli_job_btn h32']]);
            cls.innerHTML = `<svg style="border-radius: 2em; height: 30px; width: 30px;" x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`;
            cls.onclick = async () => {
                updateStoredColumnPosition(object_definition,id);
                await delay(11);
                cont.outerHTML = '';
            };
        
            const mover = ele('div');
            inlineStyler(mover,`{cursor: move; user-select: none;}`);
            panel.appendChild(mover);
            mover.onmouseover = dragElement;
        
            const left = ele('div');
            inlineStyler(left,`{padding: 0px;}`);
            cont.appendChild(left);

            const head_label = ele('div');
            a(head_label,[['class','centertext pad8']]);
            head_label.innerText = head_text;
            left.appendChild(head_label);

            const cbod = ele('div');
            inlineStyler(cbod,`{display: grid; grid-template-rows: auto; grid-gap: 12px; max-width: ${width-40}px; max-height: ${height-80}px; overflow: auto;}`);
            left.appendChild(cbod);
            return cbod;
        }
        
        function createOptionTypeCard(d,ref,container_id){
            if(d[1].view_key){
                const ob = {};
                ob[d[0]] = d[1];
                const current_obj_save_value = d[1].is_user_selected;
                const cont = ele('div');
                a(cont,[['class','dragged_item'],['style',`user-select: none; display: grid; grid-template-columns: 30px 21px 21px 1fr 1fr; grid-gap: 12px; transition: all 111ms; border-radius: 0.4em; padding 12px; user-select: none;`]]);
                ref.appendChild(cont);

                let move = ele('div');
                a(move,[['class','draggable_option_item'],['style','user-select: none; cursor: move;']]);
                cont.appendChild(move);
                move.innerHTML = svgs.mover;
                move.onmouseenter = initMoveHandler;
                
                var check = ele('div');
                a(check,[['container_id',container_id],['class','option_object_element_info'],['jdat',`${JSON.stringify(d[1])}`],['selection',(current_obj_save_value === true ? 'on' : 'off')],['style',`user-select: none; text-align: center; width: 21px; height: 21px; border: 1px solid #2e2e2e; border-radius: 0.2em; background: transparent; color: #fff; cursor: pointer; transition: all 76ms;`]]);
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
                    dropDownHTML({mainobj: d[1], label: d[1].view_key, id: 'number_select_'+d[1].key, ref:cont, items: [1,2,3,4,5,6,7,8,9,Infinity], def: `Pull ${d[1].number_to_display} ${d[1].view_key}`},container_id);
                }
            }
        }//createOptionTypeCard

            
        function createDownloadOptionsContainer(options_object){
            const main_params = {id: 'json_conversion_main',head_text:'Select Data Columns'};
            const ref = createDraggableFormContainer(main_params);
            var options = Object.entries(options_object);
            for(var i=0; i<options.length; i++){
                createOptionTypeCard(options[i],ref,main_params.id);
            }
            const run_btn = ele('div');
            a(run_btn,[['class','quickli_job_btn centertext pad8']]);
            ref.appendChild(run_btn);
            run_btn.onclick = async ()=> {
                updateStoredColumnPosition(object_definition,main_params.id);
                await delay(11);
                initSearchConversion(); //initSearchResultsDownload;
            }
            const midpad = ele('div');
            inlineStyler(midpad,`{height: 8px;}`);
            ref.appendChild(midpad);
            run_btn.innerText = 'Download Conversion';
            const bottompad = ele('div');
            inlineStyler(bottompad,`{height: 8px;}`);
            ref.appendChild(bottompad);
            keepElmInBoundary(gi(document,main_params.id));
        }
        function createSubOptions(){
            var jdat = JSON.parse(this.getAttribute('jdat'));
            var options = Object.entries(jdat.in_array);
            const sub_params = {id: 'json_conversion_sub',head_text:`Select ${jdat.view_key} Data Columns`};
            var ref = createDraggableFormContainer(sub_params);
            for(var i=0; i<options.length; i++){
                var d = options[i];
                createOptionTypeCard(d,ref,sub_params.id);
            }
            keepElmInBoundary(gi(document,sub_params.id));
        }
        function typeOptionSelector(){
            var elm = this;
            var jdat = JSON.parse(this.getAttribute('jdat'));
            var container_id = this.getAttribute('container_id');
            updateStoredClientPreferences({data:jdat},object_definition,container_id);
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
        
        function dropDownHTML(obj,container_id){
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
                    let updated = await updateStoredClientPreferences({data:jdat.mainobj,updated_number:parseFloat(d)},object_definition,container_id);
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
        createDownloadOptionsContainer(object_definition)
    }


/*
    ********************************************************
              COLUMN ORGANIZATION      
    ********************************************************
*/
    async function updateStoredColumnPosition(saved_client_data_object,container_id){
        // updateStoredClientPreferences({data:jdat.mainobj,updated_number:parseFloat(d)},object_definition,container_id)
        let container_elm = gi(document,container_id);
        let option_object_elements = Array.from(cn(container_elm,'option_object_element_info'));
        let option_object_properties = option_object_elements.map(i=> JSON.parse(i.getAttribute('jdat'))).filter(i=> i.is_user_selected);
        option_object_properties.forEach((o,i,r)=> {
            if(o.parent_key){
                saved_client_data_object[o.parent_key]['in_array'][o.key]['column_order'] = i;
            }else{
                saved_client_data_object[o.key]['column_order'] = i;
            }
        })
    }
    async function updateStoredClientPreferences(obj,saved_client_data_object,container_id){       
        const {data,updated_number} = obj;
        if(data?.parent_key){
            saved_client_data_object[data.parent_key]['in_array'][data.key].is_user_selected = !saved_client_data_object[data.parent_key]['in_array'][data.key].is_user_selected;
            //may need a delay to allow for DOM update, but will also cause a stutter. 
            await delay(11);
            let container_elm = gi(document,container_id);
            let option_object_elements = Array.from(cn(container_elm,'option_object_element_info'));
            let option_object_properties = option_object_elements.map(i=> JSON.parse(i.getAttribute('jdat'))).filter(i=> i.is_user_selected);
            option_object_properties.forEach((o,i,r)=> {
                saved_client_data_object[o.parent_key]['in_array'][o.key]['column_order'] = i;
            })
            return saved_client_data_object;
        }
        if(!data?.parent_key && data.key && updated_number) {
            saved_client_data_object[data.key].number_to_display = updated_number;
            //may need a delay to allow for DOM update, but will also cause a stutter. 
            await delay(11);
            let container_elm = gi(document,container_id);
            let option_object_elements = Array.from(cn(container_elm,'option_object_element_info'));
            let option_object_properties = option_object_elements.map(i=> JSON.parse(i.getAttribute('jdat'))).filter(i=> i.is_user_selected);
            option_object_properties.forEach((o,i,r)=> {
                saved_client_data_object[o.key]['column_order'] = i;
            })
        }
        if(!data?.parent_key && data.key && updated_number == undefined) {
            saved_client_data_object[data.key].is_user_selected = !saved_client_data_object[data.key].is_user_selected;
            //may need a delay to allow for DOM update, but will also cause a stutter. 
            await delay(11);
            let container_elm = gi(document,container_id);
            let option_object_elements = Array.from(cn(container_elm,'option_object_element_info'));
            let option_object_properties = option_object_elements.map(i=> JSON.parse(i.getAttribute('jdat'))).filter(i=> i.is_user_selected);
            option_object_properties.forEach((o,i,r)=> {
                saved_client_data_object[o.key]['column_order'] = i;
            })
        }
        console.log(saved_client_data_object);
    }

    
    async function initSearchConversion(){
        const processed = processUserSelectedOptions(client_options_object,client_json_data);
        updateColumnOrderAndDownload(client_options_object,processed,`${new Date().getTime()}.tsv`);
    }
  
    // function convert2TsvAndDownload(records, named_file){

    function updateColumnOrderAndDownload(client_options_object,processed_flat_records,filename){
        const tsvReady = (s) => typeof s == 'string' ? s?.replace(/\t|\u0009|&#9;/g, ' ').replace(/[\r\n]+/g, '\n').replace(/\u2029|\u2028|\x85|\x1e|\x1d|\x1c|\x0c|\x0b/g,'\n').replace(/"/g, "'") : s;
        const unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));
        var first_level = processed_flat_records.map(r=> Object.entries(r));
        var sorted_header = unqHsh(first_level.map(r=> r.map(kv=> kv[0])).flat(),{}).map(h=> {
            if(client_options_object[h]){
                return {
                    header: h, 
                    column_order: parseInt(client_options_object[h].column_order),
                    parent_col_start: parseInt(client_options_object[h].column_order),
                };
            }
            let sub_key = client_options_object[h.replace(/_\d+_.+/,'s')] ? client_options_object[h.replace(/_\d+_.+/,'s')] : client_options_object[h.replace(/_\d+_.+/,'')];
            let sub_i = parseInt(h.replace(/\D+/g,'')) - 1;
            if(sub_key){
                let parent_order = parseInt(sub_key.column_order);
                let col_order = parent_order + parseInt(sub_key['in_array'][h.replace(/^.+\d+_/,'')]['column_order']);
                let parent_span = Object.entries(sub_key.in_array).length;
                return {
                    parent_col_start: sub_key.column_order,
                    parent_span: parent_span,
                    header: h,
                    column_order : col_order + (sub_i * parent_span),
                }
            }
        }).filter(i=> i).sort((a,b)=> a.column_order - b.column_order).sort((a,b)=> a.parent_col_start - b.parent_col_start)
    // this is kind of a cheat, but works. We set the child ordering to the parent, sort the child order, then the parent order.
        var header = sorted_header.map(h=> h.header);
        var table = [header.map(i=> i.replace(/timestamp/,'date').replace(/m[il]+seconds/,'years'))];
        for (let i = 0; i < first_level.length; i++) { //first_level is the list of records which are [key, value]
            let arr = [];
            let row = [];
            let record = first_level[i];
            for (let s = 0; s < record.length; s++) {
                let record_kv = record[s];
                let col_key = record_kv[0];      
                let place = header.indexOf(col_key);
                let col_val = typeof record_kv[1] == 'string' ? tsvReady(record_kv[1]) : typeof record_kv[1] == 'object' ? JSON.stringify(record_kv[1]) : record_kv[1];
                arr[place] = col_val;
            }
            for (let a = 0; a < arr.length; a++) {
                if (arr[a]) {
                    row.push(arr[a]);
                } else {
                    row.push('');
                }
            }
            table.push(row);
        }
        
        function downloadr(arr2D, filename) {
            var data = arr2D.map(el => el.map(i=> tsvReady(i)).reduce((a, b) => a + '\t' + b)).reduce((a, b) => a + '\r' + b);
            var type = 'data:text/plain;charset=utf-8,';
            var file = new Blob([data], { type: type });
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
        downloadr(table,filename);
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
                    let current_key = `${key.replace(/s$/,'')}_${(i+1)}_${kv[0]}`; // <= need to accound for this key change in the column ordering function
                    //.replace(/timestamp/,'date').replace(/m[il]+seconds/,'years'); //<= update = this will be moved to another function which sorts the column ordering
                    obj[current_key] = arr[i][kv[0]]; //this runs first because the subsiquent if conditions will overwrite if they are true.
                    if(/timestamp/i.test(kv[0])) obj[current_key] = dateString(arr[i][kv[0]]);
                    if(/m[il]+seconds/i.test(kv[0])) obj[current_key] = milsec2years(arr[i][kv[0]]);
                });
            }
            return obj;
        }else{ return {} }
    }
    /*
        TODO: 
            Here we need to get a saved client options object and merge it (before or after?) the processed items. 
            that or address it within the processObjectOptions function as we are presently doing with the static unchecked keys.
    */
    var client_options_object = processObjectOptions(client_json_data.map(p=> cleanObject(p)), {}, {is_top_level: true});
    console.log(client_options_object);    
    initTableOptionsUIfromObjectDefinitions(client_options_object);

    // var column_order = {

    // }

/*
    ********************************************************
                    
    ********************************************************
*/

/*
    ********************************************************
                    
    ********************************************************
*/

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
        convertJsonUserInterface(deduped);
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

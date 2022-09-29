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

        function getEveryMonthInRage(o){
            const unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
            function getDateObjects(d,pre){
                let obj = {};
                let date = new Date(d);
                obj[`${pre}_date`] = date
                obj[`${pre}_year`] = date.getFullYear();
                obj[`${pre}_month`] = date.getMonth()+1;
                obj[`${pre}_day`] = date.getDate();
                return obj;
            }
            function ymdFormat(d){
                let date = new Date(d);
                let yr = date.getFullYear();
                let mo = date.getMonth()+1;
                let day = date.getDate();
                return `${yr}-${(mo < 10 ? '0'+mo.toString() : mo)}-${(day < 10 ? '0'+day.toString() : day)}`;
            }
            const everyNth = (i,n) => /\./.test((i/n).toString()) === false && i != 0;

            const {target_end_date,target_end_year,target_end_month,target_end_day} = getDateObjects(o.end_date,'target_end');
            const {target_start_date,target_start_year,target_start_month,target_start_day} = getDateObjects(o.start_date,'target_start');

            const month_days = [31,29,31,30,31,30,31,31,30,31,30,31];
            const daymonth = Array(12).fill().map((_,i)=> i+1).map((a,i,r)=> Array(month_days[i]).fill().map((_,ii)=> [(ii+1),a])).flat();
            const every_day = Array(target_end_year-target_start_year+1).fill().map((_,i)=> i+target_start_year).map(yr=> daymonth.map(dm=> [...dm,...[yr]])).flat();

            const all_dates = every_day.map(dmy=> `${dmy[2]}-${(dmy[1] < 10 ? '0'+dmy[1].toString() : dmy[1])}-${(dmy[0] < 10 ? '0'+dmy[0].toString() : dmy[0])}`).map(dstring=> /\d+-02-29/.test(dstring) && !everyNth(parseInt(/^\d+/.exec(dstring)[0]),4) ? null : dstring).filter(i=> i);
            const target_start_datestring = ymdFormat(o.start_date);
            const target_end_datestring = ymdFormat(o.end_date);
            const start_index = all_dates.indexOf(target_start_datestring);
            const end_index = all_dates.indexOf(target_end_datestring);
            return unqHsh(all_dates.slice(start_index,end_index+1).map(r=> r.replace(/-\d+$/,'-01')),{}).map(r=> new Date(r).getTime()+43200000);
        }

    async function createDateRangeSlider(ref_elm,ref_html,date_range,unq_id){
        const reg = (o, n) => o ? o[n] : '';
        const cn = (o, s) => o ? o.getElementsByClassName(s) : null;
        const tn = (o, s) => o ? o.getElementsByTagName(s) : null;
        const gi = (o, s) => o ? o.getElementById(s) : null;
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        const rando = (n) => Math.round(Math.random() * n);
        const ele = (t) => document.createElement(t);
        const attr = (o, k, v) => o.setAttribute(k, v);
        const unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
        const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
        function inlineStyler(elm,css){
        Object.entries(JSON.parse(
            css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g,'"')
            .replace(/(?<=:\s*.+?);/g,'",')
            .replace(/[a-zA-Z-]+(?=:)/g, k=> k.replace(/^\b/,'"').replace(/\b$/,'"'))
            .replace(/\s*,\s*}/g,'}')
        )).forEach(kv=> { elm.style[kv[0]] = kv[1]});
        }
        function topZIndexer(){
        let n = new Date().getTime() / 1000000;
        let r = (n - Math.floor(n)) * 100000;
        return (Math.ceil(n+r) * 10);
        }
        
        function ifTimestampYmdFormat(d){
                if(typeof d == 'number' && d > 111111){
            let date = new Date(d);
            let yr = date.getFullYear();
            let mo = date.getMonth()+1;
            let day = date.getDate();
            return `${yr}-${(mo < 10 ? '0'+mo.toString() : mo)}-${(day < 10 ? '0'+day.toString() : day)}`;
        }else{
            return d;
        }
        }
        function setQuickliCSS(style_id){
            if(gi(document,`${style_id}_style`)) gi(document,`${style_id}_style`).outerHTML = '';
            let csselm = ele('style');
            a(csselm,[['class',`${style_id}_style`]]);
            document.head.appendChild(csselm);
            csselm.innerHTML = `
            .slide_parent {
                border-radius: 2em;
            }
            
            .slide_container {
                height: 20px;
                border-radius: 2em;
                box-shadow: -8px -4px 8px 0px #ffffff,
                6px 2px 6px 0px rgb(204, 219, 232),
                4px 4px 4px 0px rgb(204, 219, 232) inset,
                -4px -4px 4px 0px #ffffff inset;
                background: transparent;
            }
            .slide_cover {
                background: #23a6d5;
            }
            .slide_cover_animate {
                background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23a6d5, #23d5ab);
                background-size: 400% 400%;
                animation: gradient_quickli_slider 5s ease infinite;
            }
            @keyframes gradient_quickli_slider {
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
    
            .slide_ball {
                position: fixed;
                font-size: 0.7em;
                width: 18px;
                height: 18px;
                background: #ffffff;
                border-radius: 2em;
                cursor: move;
                box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 6px 0px, rgba(255, 255, 255, 0.8) -6px -2px 6px -3px;
            }
            .slide_ball:active {
                box-shadow: -1px -1px 1px 0px #ffffff, 2px 1px 2px 0px rgb(204, 219, 232), 4px 4px 4px 0px rgb(204, 219, 232) inset, -4px -4px 4px 0px #ffffff inset;
            }
            `;
            }
        setQuickliCSS(`${unq_id}quickli_slider_`);
        
        function timestampIfString(str){
        if(typeof str == 'string' && /[a-zA-Z]|-|\s/.test(str)){
            return new Date(str).getTime();
        }else{
                    if(/^[\d+\.]+$|^\d+$/) return parseFloat(str);
            else return str;
        }
        }
        function resetIntialCondition(l1,l2){
            let min = timestampIfString(mapped_dates[1]);
            if(timestampIfString(l1) <= min && timestampIfString(l2) <=  min){
                ref_elm.innerHTML = ref_html;
                tn(ref_elm,'div')[1].onclick = async ()=>{
                    inlineStyler(tn(ref_elm,'div')[0],`{transform:translate(302px,0px);}`);
                    inlineStyler(cn(ref_elm,'quickli_job_btn')[0],`{width:300px; background: #23a6d5; transform:translate(1px,-20px);}`);
                await delay(111);
                ref_elm.innerHTML = '';
                createDateRangeSlider(ref_elm,ref_html,date_range,unq_id);
                }
            }
        }
        function dragSlider() {
        var el = this;
        var cont_rect = this.parentElement.getBoundingClientRect();
        var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
        if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
        else this.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
        slide_cover.setAttribute('class','slide_cover_animate');
            pos3 = e.clientX;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            inlineStyler(el,`{z-index: ${topZIndexer()};}`);
        }
        function elementDrag(e) {
            pos1 = pos3 - e.clientX;
            pos3 = e.clientX;
            let ref_left = ref_elm.getBoundingClientRect().left;
            let updatedX = ((el.offsetLeft - pos1)-ref_left) <= cont_rect.width && ((el.offsetLeft - pos1)) >= cont_rect.left ? ((el.offsetLeft - pos1)) : el.offsetLeft;
            inlineStyler(el,`{left: ${updatedX}px; opacity: 0.85; transition: opacity 100ms;}`);
            let label1 = document.getElementById(`${unq_id}date_range_label_1`);
            let label2 = document.getElementById(`${unq_id}date_range_label_2`);
            let ball1 = document.getElementById(`${unq_id}slide_ball_1`);
            let ball2 = document.getElementById(`${unq_id}slide_ball_2`);
            let target_label = el.getAttribute('id') == `${unq_id}slide_ball_1` ? label1 : label2;
            target_label.innerText = mapped_dates[Math.floor(updatedX-ref_left)] 
            || mapped_dates[Math.floor(updatedX-ref_left-1)] 
            || mapped_dates[Math.floor(updatedX-ref_left+1)];
            fillCenterBackground(updatedX);
            if(timestampIfString(label1.innerText) > timestampIfString(label2.innerText)){
                ball1.setAttribute('id',`${unq_id}slide_ball_2`);
                ball2.setAttribute('id',`${unq_id}slide_ball_1`);
            }
        }
        function closeDragElement() {
            let label1 = document.getElementById(`${unq_id}date_range_label_1`);
            let label2 = document.getElementById(`${unq_id}date_range_label_2`);
            resetIntialCondition(label1.innerText,label2.innerText);
            document.onmouseup = null;
            document.onmousemove = null;
            el.style.opacity = "1";
            slide_cover.setAttribute('class','slide_cover');
        }
        }
        function fillCenterBackground(offset){
        let left = document.getElementById(`${unq_id}slide_ball_1`).getBoundingClientRect().x;
        let right = document.getElementById(`${unq_id}slide_ball_2`).getBoundingClientRect().x;
        inlineStyler(slide_cover,`{transform:translate(${left-ref_elm.getBoundingClientRect().left+10}px,-16.5px); width: ${(right-left)}px; height: 15px;}`);
        }
        
        const given_slide_cont = Math.floor(ref_elm.getBoundingClientRect().width);
        var slide_chop = Math.floor(given_slide_cont/date_range.length);
        var slide_index_chops = Array(given_slide_cont).fill().map((_,i)=>i++);
        var subArr = (r, n) => r.reduceRight((a,b,c,d) => [...a, d.splice(0,n)],[]);
        var date_indexes = subArr(slide_index_chops,slide_chop);
        var date_data = date_range.map((d,i,r)=> {
        return { date: ifTimestampYmdFormat(d), pixels: date_indexes[i] };
        })
        var mapped_dates = date_data.map(d=> d.pixels).flat().map(d=> {
            let n = date_data.findIndex(i=> i.pixels.some(p=> p == d));
            return date_data[n].date;
        })
    /* console.log(mapped_dates) */
        const max_slide_cont = mapped_dates.length;
    
        const slide_parent = ele('div');
        ref_elm.appendChild(slide_parent);
        a(slide_parent,[['class','slide_parent']]);
        inlineStyler(slide_parent,`{user-select: none; width:${max_slide_cont}px;}`);
    
        const slide_container = ele('div');
        a(slide_container,[['class','slide_container']]);
        inlineStyler(slide_container,`{user-select: none; width:${max_slide_cont}px;}`);
        slide_parent.appendChild(slide_container);
        
        const slide_cover = ele('div');
        a(slide_cover,[['class','slide_cover']]);
        inlineStyler(slide_cover,`{border-radius: 2em; transform:translate(0px,-16.5px); width: ${max_slide_cont}px; height: 15px;}`);
        slide_parent.appendChild(slide_cover);
    
        const slide_ball_1 = ele('div');
        a(slide_ball_1,[['class','slide_ball'],['id',`${unq_id}slide_ball_1`]]);
        inlineStyler(slide_ball_1,`{transform:translate(-7px,0px); left:${ref_elm.getBoundingClientRect().left}px; z-index:${topZIndexer()};}`);
        slide_container.appendChild(slide_ball_1);
        slide_ball_1.onmouseenter = dragSlider;
    
        const slide_ball_2 = ele('div');
        a(slide_ball_2,[['class','slide_ball'],['id',`${unq_id}slide_ball_2`]]);
        inlineStyler(slide_ball_2,`{transform:translate(-7px,0px); left:${ref_elm.getBoundingClientRect().x + max_slide_cont}px; z-index:${topZIndexer()};}`);
        slide_container.appendChild(slide_ball_2);
        slide_ball_2.onmouseenter = dragSlider;
        
        const slide_range_label = ele('div');
        slide_parent.appendChild(slide_range_label);
        a(slide_range_label,[['class','slide_range_label']]);
        inlineStyler(slide_range_label,`{z-index: ${topZIndexer()+topZIndexer()}; background: transparent; display: grid; grid-template-columns: 1fr 1fr; grid-gap: 8px; text-align: left; pading: 8px; height:0px; transform: translate(${max_slide_cont*0.25}px,-17px);}`);
        slide_range_label.innerHTML = `<div class="slider_value_label" id="${unq_id}date_range_label_1">${mapped_dates[0]}</div><div class="slider_value_label" id="${unq_id}date_range_label_2">${mapped_dates[(mapped_dates.length-1)]}</div>`;
    }  

let query_cont = ele('div');
document.body.appendChild(query_cont);
inlineStyler(query_cont,`{display: block;}`);
let date_range_cont = ele('div');
query_cont.appendChild(date_range_cont);
inlineStyler(date_range_cont,`{padding: 0px; width: ${document.body.getBoundingClientRect().width}px;}`);

let label_date_html = `<div class="textarea" style="height: 20px; width: 64px; color: #1a1a1a; text-align: right; border-radius: 2em; transition: all 73ms;"><i>Dates&nbsp;&nbsp;</i></div>    <div class="quickli_job_btn" style="transform:translate(1px,-20px); z-index: 5; height: 18px; width: 18px; background: #ffffff; transition: all 73ms;"></div>`;



createDateRangeSlider(
  date_range_cont,
  label_date_html,
  getEveryMonthInRage({
    start_date:'1 Jan 1995',
    end_date:new Date(new Date().getTime()+(2629800000*2))
  }),
  'date_95_current_slider_'+1,
);



//

/* 				Array(20).fill().map((_,i)=> i++) */




  var reg = (o, n) => o ? o[n] : '';
  var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
  var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
  var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
  var rando = (n) => Math.round(Math.random() * n);
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
    let n = new Date().getTime() / 1000000;
    let r = (n - Math.floor(n)) * 100000;
    return (Math.ceil(n+r) * 10);
  }
    
function getEveryDateInRage(o){
  /*
          note: is accounting for leap years, but not accounting for the 100 year, but not 400 year condition.
      */
  function getDateObjects(d,pre){
    let obj = {};
    let date = new Date(d);
    obj[`${pre}_date`] = date
    obj[`${pre}_year`] = date.getFullYear();
    obj[`${pre}_month`] = date.getMonth()+1;
    obj[`${pre}_day`] = date.getDate();
    return obj;
  }
  function ymdFormat(d){
    let date = new Date(d);
    let yr = date.getFullYear();
    let mo = date.getMonth()+1;
    let day = date.getDate();
    return `${yr}-${(mo < 10 ? '0'+mo.toString() : mo)}-${(day < 10 ? '0'+day.toString() : day)}`;
  }
  const everyNth = (i,n) => /\./.test((i/n).toString()) === false && i != 0;

  const {target_end_date,target_end_year,target_end_month,target_end_day} = getDateObjects(o.end_date,'target_end');
  const {target_start_date,target_start_year,target_start_month,target_start_day} = getDateObjects(o.start_date,'target_start');

  const month_days = [31,29,31,30,31,30,31,31,30,31,30,31];
  const daymonth = Array(12).fill().map((_,i)=> i+1).map((a,i,r)=> Array(month_days[i]).fill().map((_,ii)=> [(ii+1),a])).flat();
  const every_day = Array(target_end_year-target_start_year+1).fill().map((_,i)=> i+target_start_year).map(yr=> daymonth.map(dm=> [...dm,...[yr]])).flat();

  const all_dates = every_day.map(dmy=> `${dmy[2]}-${(dmy[1] < 10 ? '0'+dmy[1].toString() : dmy[1])}-${(dmy[0] < 10 ? '0'+dmy[0].toString() : dmy[0])}`).map(dstring=> /\d+-02-29/.test(dstring) && !everyNth(parseInt(/^\d+/.exec(dstring)[0]),4) ? null : dstring).filter(i=> i);
  const target_start_datestring = ymdFormat(o.start_date);
  const target_end_datestring = ymdFormat(o.end_date);
  const start_index = all_dates.indexOf(target_start_datestring);
  const end_index = all_dates.indexOf(target_end_datestring);
  return all_dates.slice(start_index,end_index+1)
}

const date_rages = getEveryDateInRage({
  start_date:'10 Feb 2020',
  end_date:new Date(),
});
const slide_container = ele('div');
a(slide_container,[['class','slide_container']]);
document.body.appendChild(slide_container);

inlineStyler(slide_container,`{user-select: none; display: grid; grid-template-columns: ${Array(date_rages.length).fill().map((_,i)=> '6px').reduce((a,b)=> a+' '+b)}; grid-gap:2px; background:#dc88fc; width:${(date_rages.length*8)}px; border-radius: 2em; max-width:90%; overflow-y: auto;}`);

date_rages.forEach((d,i,r)=> {
	let opt = ele('div');
	let slider_style = i == 0 || i == (r.length - 1) ? `{font-size: 0.5em; transform: scale(1.75,1.75); width: 20px; height: 20px; background: #4287f5; border-radius: 2em; z-index: ${topZIndexer()};}` : `{width: 9px; height:5}px; background:transparent;}`;
	a(opt,[['class',`slide_item_ ${(i == 0 || i == (r.length - 1) ? 'slider_ball_' : '')}`],['val',d]]);
	inlineStyler(opt,slider_style);
  
	slide_container.appendChild(opt);
  if(i == 0 || i == (r.length - 1) ){
  	opt.onmouseenter = initMoveHandler;
  }
})

function reLabelSliders(){
	Array.from(cn(document,'slide_item_')).forEach((a,i,r)=> {
		let is_ball = /slider_ball_/.test(a.getAttribute('class'));
		let ball_timestamps = Array.from(cn(document,'slider_ball_')).map(v=> new Date(v.getAttribute('val')).getTime());
  	if(is_ball) {
    	a.innerText = date_rages[i];
      inlineStyler(a,`{background:#4287f5;}`);
    }
    /* else{
      r.forEach(v=> {
    let tm = new Date(v.getAttribute('val')).getTime();
    let is_white = (ball_timestamps[0] > tm && tm < ball_timestamps[1]) || (ball_timestamps[1] > tm && tm < ball_timestamps[2]);
    inlineStyler(v,(is_white ? `{background:#ffffff;}` : `{background:#dc88fc;}`))
      })
    } */
		a.setAttribute('val',date_rages[i]);
  })
}
        
        
/*
        ********************************************************
                        VERTICAL MOVE HANDLER
        ********************************************************
    */
function initMoveHandler(){
  var target_el = this;
	var target_jdat = JSON.parse(this.getAttribute('jdat'));
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
    return (rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2);
  };
  const mouseDownHandler = function(e) {
    draggingEle = target_el;
    const rect = draggingEle ? draggingEle.getBoundingClientRect() : placeholder.getBoundingClientRect();
    y = e.pageX - rect.left;
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    document.removeEventListener('mouseenter', initMoveHandler);
  };

  const mouseMoveHandler = function(e) {
    const draggingRect = draggingEle.getBoundingClientRect();
reLabelSliders()
draggingEle.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    if (!isDraggingStarted) {
      isDraggingStarted = true;
      placeholder = document.createElement('div');
      placeholder.classList.add('placeholder');
      draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
      placeholder.style.width = `${draggingRect.width}px`;
    }
    const rect = draggingEle ? draggingEle.getBoundingClientRect() : placeholder.getBoundingClientRect();
    draggingEle.style.position = 'fixed';
    draggingEle.style.left = `${e.pageX - y}px`; 
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






//version2
function createDualRangeSlider(parmas){
	const {min,max,offset,type,displayTranslation,id,parent_element} = params;
  const raw_differential = (max-min);
  //const offset_differential = (max-min)/(offset ? offset : 1);
  
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

  function setCSS(style_id){
    if(gi(document,`${style_id}_style`)) gi(document,`${style_id}_style`).outerHTML = '';
    let csselm = ele('style');
    a(csselm,[['class',`${style_id}_style`]]);
    document.head.appendChild(csselm);
    csselm.innerHTML = `
			.slider_parent {
      	height:22px;
        width:${parent_element.getBoundingClientRect().width}px;
        border-radius:0.2em;
        user-select: none; 
      }
      .slider_container {
      	height:22px;
        width:${parent_element.getBoundingClientRect().width}px;
        border-radius:0.2em; 
      }
		`;
	}
	setCSS(`${id}_slider_css`);
        
  const slider_parent = ele('div');
  parent_element.appendChild(slider_parent);
  a(slider_parent,[['class','slider_parent']]);
  
    const slider_container = ele('div');
    a(slider_parent,[['class','slider_container']]);
    slide_parent.appendChild(slider_container);
  
        const slide_ball_1 = ele('div');
        a(slide_ball_1,[['class','slide_ball'],['id',`${id}_slide_ball_1`]]);
        inlineStyler(slide_ball_1,`{transform:translate(-7px,0px); left:${ref_elm.getBoundingClientRect().left}px; z-index:${topZIndexer()};}`);
        slide_container.appendChild(slide_ball_1);
        slide_ball_1.onmouseenter = dragSlider;
    
        const slide_ball_2 = ele('div');
        a(slide_ball_2,[['class','slide_ball'],['id',`${id}_slide_ball_2`]]);
        inlineStyler(slide_ball_2,`{transform:translate(-7px,0px); left:${ref_elm.getBoundingClientRect().x + max_slide_cont}px; z-index:${topZIndexer()};}`);
        slide_container.appendChild(slide_ball_2);
        slide_ball_2.onmouseenter = dragSlider;
  
}

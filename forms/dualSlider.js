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

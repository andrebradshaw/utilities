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
  start_date:'10 Mar 2021',
  end_date:new Date(),
});
const slide_container = ele('div');
a(slide_container,[['class','slide_container']]);
document.body.appendChild(slide_container);

inlineStyler(slide_container,`{user-select: none; display: grid; grid-template-columns: ${Array(date_rages.length).fill().map((_,i)=> '6px').reduce((a,b)=> a+' '+b)}; grid-gap:2px; background:#dc88fc; width:${(date_rages.length*8)}px; border-radius: 2em;}`);
date_rages.forEach((d,i,r)=> {
	let opt = ele('div');
	let slider_style = i == 0 || i == (r.length - 1) ? `{transform: scale(1.2,1.2); width: 20px; height: 20px; background: #4287f5; border-radius: 2em; z-index: ${topZIndexer()};}` : `{width: 9px; height:5}px; background:transparent;}`;
	
	inlineStyler(opt,slider_style);
  
	slide_container.appendChild(opt);
  if(i == 0 || i == (r.length - 1) ){
  	opt.onmouseenter = initMoveHandler;
  }
})
				
        
        
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
console.log(draggingRect);
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

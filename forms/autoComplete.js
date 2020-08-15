const reg = (o, n) => o ? o[n] : '';
const cn = (o, s) => o?.getElementsByClassName(s);
const tn = (o, s) => o?.getElementsByTagName(s);
const gi = (o, s) => o?.getElementById(s);
const rando = (n) => Math.round(Math.random() * n);
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const ele = (t) => document.createElement(t);
const attr = (o, k, v) => o.setAttribute(k, v);
const d = () => ele('div');
 

const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));


const regXready = (str) => str && typeof str == 'string' ? str
.replace(/\[/g,'\[')
.replace(/\]/g,'\]')
.replace(/\{/g,'\{')
.replace(/\}/g,'\}')
.replace(/\\/g,'\\')
.replace(/\//g,'\/')
.replace(/\?/g,'\?')
.replace(/\+/g,'\+').replace(/\*/g, '.{0,4}').trim() : '';


function searchAllowedList(){//allowed_list
  let allowed_list = [{username: 'sourcingsupport', can_speak: true},{username: '27dollars', can_speak: true,}];
  if(e.key == 'ArrowUp' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'ArrowDown' || e.key == 'Enter'){
    autoKeySelector(this,'form_data_auto_search_res_pill',e.key);
  }else{
    if(this.value.trim().length > 2){
      var matches = allowed_list.filter(r=> new RegExp(regXready(this.value.trim()),'i').test(r));
    }
  }
}



function createAutoDopDown(items,text_key,ref){
  let rgb = {r:219, g:213, b:245};
  let hover_obj = {background: '#dbd5f5',color: '#05001c', border: '4px solid #dbd5f5', background_in: '#05001c', color_in: '#dbd5f5', border_in: '4px solid #dbd5f5'}
  let rect = ref.getBoundingClientRect();
  let itm_height = 21;
  let bod = ele('div');
  a(bod,[['id','custom_dropdown_'],['style',`position: fixed; width: ${rect.width}px; top: ${rect.top}px; left: ${rect.left}px; display: grid; grid-template-rows: auto; grid-gap: 4px; border: ${hover_obj.border}; border-radius: 0.2em; background: ${hover_obj.background}; color: ${hover_obj.color} z-index: ${new Date().getTime()}; transition: all 63ms;`]]);
  ref.appendChild(bod);
  bod.onmouseleave = killOptions;

  for(var i=0; i<items.length; i++){
    let itm = ele('div');
    a(itm,[['class','form_data_auto_search_res_pill'],['hover_obj',`${JSON.stringify(hover_obj)}`],['jdat',`${(items[i])}`],['text_key',items[i][key]],['style',`height: ${itm_height}px; background: rgb(${rgb.r},${rgb.g},${rgb.b}); text-align: center; padding 0px; cursor: pointer; font-family: "Lucida Console", Monaco, monospace; transition: all 63ms;`]]);
    itm.innerText = items[i][text_key];
    bod.appendChild(itm);
    itm.onmouseenter = hoverIn;
    itm.onmouseleave = hoverOut;
    itm.onclick = selection;
  }
}

function killOptions(){
  if(gi(document,'custom_dropdown_')) gi(document,'custom_dropdown_').outerHTML = '';
}

function hoverOut(){
  let style_obj = JSON.parse(this.getAttribute('hover_obj'));
  this.style.background = style_obj.background;
}
function hoverIn(){
  let style_obj = JSON.parse(this.getAttribute('hover_obj'));
  this.style.background = style_obj.background_in;
}

function selection(){
  let jdat = JSON.parse(this.getAttribute('jdat'));
  let text_key = this.getAttribute('text_key');
  tn(gi(document,id),'div')[0].innerText = jdat[text_key];
  this.parentElement.style.height = (this.parentElement.getBoundingClientRect().height * 0.5) +'px';
  Array.from(tn(this.parentElement,'div')).forEach(r=> {
    r.style.height = (r.getBoundingClientRect().height * 0.5) +'px';
    r.style.fontSize = '0.5em';
  });
  this.parentElement.style.bottom = (this.parentElement.getBoundingClientRect().bottom) + 'px';
  this.parentElement.ontransitionend = killOptions;
}


async function autoKeySelector(ref,classname,keyinput){
  let elms = cn(document,classname);
  if(elms && elms.length){
    let arr = Array.from(elms);
    let selectors = arr.map(el=> el.getAttribute('isSelected'));
    let i = selectors.indexOf('yes');
    let forward_i = i < 0 || i == (selectors.length-1) ? 0 : i+1;
    let reverse_i = i < 1 ? (selectors.length-1) : i-1; 
    if(keyinput == 'ArrowDown' || keyinput == 'ArrowRight') {
      await arr.forEach(el=> {attr(el,'isSelected','no'); el.style.border = '1px solid #fff';});
      arr[forward_i].setAttribute('isSelected','yes');
      arr[forward_i].style.border = '1px solid #004471';
    }
    if(keyinput == 'ArrowUp' || keyinput == 'ArrowLeft') {
      await arr.forEach(el=> {attr(el,'isSelected','no'); el.style.border = '1px solid #fff';});
      arr[reverse_i].setAttribute('isSelected','yes');
      arr[reverse_i].style.border = '1px solid #004471';
    }
    if(keyinput == 'Enter') {
      let index = arr.map(el=> el.getAttribute('isSelected')).indexOf('yes');
      let seti = index > -1 ? index : 0;
      ref.value = arr[seti].innerText.trim();
      arr[0].parentElement.outerHTML = '';
    }
  }
}

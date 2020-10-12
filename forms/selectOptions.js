var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : null;
var tn = (o, s) => o ? o.getElementsByTagName(s) : null;
var gi = (o, s) => o ? o.getElementById(s) : null;
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
var reChar = (s) => s?.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el=> [el,String.fromCharCode(/d+/.exec(el)[0])]).map(m=> s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;
var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));

function dropDownHTML(obj){
  var rgb = {r:219, g:213, b:245, change: 1};
  
  var { ref, items, id } = obj;
  if(gi(document,id)) gi(document,id).outerHTML = '';
  var cont = ele('div');
  a(cont,[['id',id],['items',`${JSON.stringify(items)}`],['style',`display: grid; grid-template-columns: 1fr 20px; grid-gap: 4px; border: 1px solid #004471; border-radius: 0.2em; cursor: pointer;`]]);
  ref.appendChild(cont);
  cont.onclick = createOptions;

  var text = ele('div');
  a(text,[['style',`color: #004471; text-align: center;`]]);
  cont.appendChild(text);
  text.innerText = '0';
  
  var sel = ele('div');
  cont.appendChild(sel);
  sel.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" transform="rotate(180)" version="1.1" viewBox="0 0 15 15">  <path d="M7.5385,2&#10;&#9;C7.2437,2,7.0502,2.1772,6.9231,2.3846l-5.8462,9.5385C1,12,1,12.1538,1,12.3077C1,12.8462,1.3846,13,1.6923,13h11.6154&#10;&#9;C13.6923,13,14,12.8462,14,12.3077c0-0.1538,0-0.2308-0.0769-0.3846L8.1538,2.3846C8.028,2.1765,7.7882,2,7.5385,2z"/></svg>`;

  function hoverOut(){
    this.style.background = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
  }
  function hoverIn(){
    this.style.background = '#ffffff';
  }
  function createOptions(){
    var rect = this.getBoundingClientRect();
    console.log(rect.bottom);
    if(gi(document,'custom_dropdown_')) gi(document,'custom_dropdown_').outerHTML = '';
    var itm_height = 21;
    var top_pos = document.body.getBoundingClientRect().bottom > (rect.bottom - (items.length * itm_height))? (rect.top - (items.length * itm_height))+itm_height : rect.top;
    var bod = ele('div');
    a(bod,[['id','custom_dropdown_'],['style',`position: fixed; width: ${rect.width}px; top: ${top_pos}px; left: ${rect.left}px; display: grid; grid-template-rows: auto; grid-gap: 4px; border: 4px solid rgb(${rgb.r},${rgb.g},${rgb.b}); border-radius: 0.2em; background: rgb(${rgb.r},${rgb.g},${rgb.b}); z-index: ${new Date().getTime()}; transition: all 133ms;`]]);
    document.body.appendChild(bod);
    bod.onmouseleave = killOptions;

    for(var i=0; i<items.length; i++){
      var itm = ele('div');
      a(itm,[['dat',items[i]],['style',`height: ${itm_height}px; background: rgb(${rgb.r},${rgb.g},${rgb.b}); text-align: center; padding 0px; cursor: pointer; font-family: "Lucida Console", Monaco, monospace; transition: all 133ms;`]]);
      itm.innerText = items[i];
      bod.appendChild(itm);
      itm.onmouseenter = hoverIn;
      itm.onmouseleave = hoverOut;
      itm.onclick = selection;
    }

    function selection(){
      var d = this.getAttribute('dat');
      tn(gi(document,id),'div')[0].innerText = d;
      this.parentElement.style.height = (this.parentElement.getBoundingClientRect().height * 0.5) +'px';
      Array.from(tn(this.parentElement,'div')).forEach(r=> {
        r.style.height = (r.getBoundingClientRect().height * 0.5) +'px';
        r.style.fontSize = '0.5em';
      });
      this.parentElement.style.top = (this.parentElement.getBoundingClientRect().top +      this.parentElement.getBoundingClientRect().height) + 'px';
      this.parentElement.ontransitionend = killOptions;
    }
  }
  function killOptions(){
    if(gi(document,'custom_dropdown_')) gi(document,'custom_dropdown_').outerHTML = '';
  }

}


dropDownHTML({id: 'number_select_', ref:document.body, items: [0,1,2,3,4,5]})




/*
    **** ADDON ****
    add a pill that can be deleted for multiple selections
put addSelectionPillToReferenceElement(ref,val) within the selection function after the array.forEach
*/
function addSelectionPillToReferenceElement(ref,val){
  let quickli_company_size_selections = cn(document,'quickli_company_size_selections')?.length ? Array.from(cn(document,'quickli_company_size_selections')).map(r=> r.getAttribute('data-value')) : [];
  if(quickli_company_size_selections.every(v=> v != val)){
    let val_int = parseInt(/^\d+/.exec(val)[0]);
    let target_elm = Array.from(cn(document,'quickli_company_size_selections')).filter(v=> val_int < parseInt(/^\d+/.exec(v.getAttribute('data-value'))[0]));
    addPillElm(val,target_elm)
  }
  function addPillElm(val,target_elm){
      let pill = ele('div');
      a(pill,[['class','quickli_company_size_selections'],['data-value',val]]);
      inlineStyler(pill,`{padding: 8px; border-radius: 0.2em; background: #00cf45; color: #ffffff; cursor: pointer; text-align: center;}`);
      pill.innerText = val;
      pill.onclick = deleteThisElement;
      if(target_elm?.length) ref.insertBefore(pill,target_elm[0]) 
      else ref.appendChild(pill);
  }
}
function deleteThisElement(){
  this.outerHTML = ''; //TODO, could be an interesting opportunity here for a function that takes an integer and runs up that many parents to delete
}

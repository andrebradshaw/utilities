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
  var { ref, items } = obj;
  var cont = ele('div');
  a(cont,[['items',`${JSON.stringify(items)}`],['style',`display: grid; grid-template-columns: 1fr 20px; grid-gap: 4px; border: 1px solid #004471; border-radius: 0.2em; cursor: pointer;`]]);
  ref.appendChild(cont);
  cont.onclick = createOptions;

  var text = ele('div');
  a(text,[['style',`color: #004471; text-align: center;`]]);
  cont.appendChild(text);
  text.innerText = '0';
  
  var sel = ele('div');
  cont.appendChild(sel);
  sel.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" transform="rotate(180)" version="1.1" viewBox="0 0 15 15">  <path d="M7.5385,2&#10;&#9;C7.2437,2,7.0502,2.1772,6.9231,2.3846l-5.8462,9.5385C1,12,1,12.1538,1,12.3077C1,12.8462,1.3846,13,1.6923,13h11.6154&#10;&#9;C13.6923,13,14,12.8462,14,12.3077c0-0.1538,0-0.2308-0.0769-0.3846L8.1538,2.3846C8.028,2.1765,7.7882,2,7.5385,2z"/></svg>`;

  function createOptions(){
    var rect = this.getBoundingClientRect();
    console.log(rect.bottom);
    if(gi(document,'custom_dropdown_')) gi(document,'custom_dropdown_').outerHTML = '';

    var top_pos = (document.body.getBoundingClientRect().bottom -(items.length * 16)) >rect.bottom ? rect.top -(items.length * 16) : rect.top;
    var bod = ele('div');
    a(bod,[['id','custom_dropdown_'],['style',`position: fixed; height: 16px; width: ${rect.width}px; bottom: ${rect.bottom}px; left: ${rect.left}px; display: grid; grid-template-rows: auto; grid-gap: 4px; border: 1px solid #004471; border-radius: 0.2em; background: #dae6ed; z-index: ${new Date().getTime()}`]]);
    document.body.appendChild(bod);
    bod.onmouseleave = ()=> {bod.innerHTML = ''};

    for(var i=0; i<items.length; i++){
      var itm = ele('div');
      a(itm,[['style',`background: #ffffff; text-align: center; padding 4px; cursor: pointer;`]]);
      itm.innerText = items[i];
      bod.appendChild(itm);
    }
  }

}


dropDownHTML({ref:document.body, items: [0,1,2,3,4,5]})

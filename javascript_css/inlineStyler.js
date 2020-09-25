function inlineStyler(elm,css){
  Object.entries(JSON.parse(
  css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g,'"')
    .replace(/(?<=:\s*.+?);/g,'",')
    .replace(/[a-zA-Z-]+(?=:)/g, k=> k.replace(/^\b/,'"').replace(/\b$/,'"'))
    .replace(/\s*,\s*\}/g,'}')
  )).forEach(kv=> { elm.style[kv[0]] = kv[1]});
}
var style = `{text-align: center; font-size: 1.3em; padding: 6px; border: 1px solid #transparent; border-radius: 0.4em; background: #26bd7e; color: #fff; width: 100%; cursor: pointer;}`;

inlineStyler(document.getElementById('ID_HERE_head'),style)

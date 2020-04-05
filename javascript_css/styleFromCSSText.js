var css2Json = (s)=> JSON.parse(
  s.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g,'"')
    .replace(/(?<=:\s*.+?);/g,'",')
    .replace(/[a-zA-Z-]+(?=:)/g, k=> k.replace(/\W+/g, '_').replace(/^\b/,'"').replace(/\b$/,'"'))
    .replace(/\s*,\s*\}/g,'}')
);

function styleFromJson(jcss,elm){
  var styleArr = Object.entries(jcss);
  styleArr.forEach(s=> {
    var key = s[0].replace(/_\w/g, s=> s.charAt(1).toUpperCase());
    elm.style[key] = s[1];
  });
}

var style = `{text-align: center; font-size: 1.3em; padding: 6px; border: 1px solid #transparent; border-radius: 0.4em; background: #26bd7e; color: #fff; width: 100%; cursor: pointer;}`;

function initTest(style, elm){
  var jcss = css2Json(style);
  styleFromJson(jcss,elm);
}

var target_elm = gi(document,'zip_code_search_btn');
initTest(style,target_elm);

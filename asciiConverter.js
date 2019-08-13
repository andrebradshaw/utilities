var reChar = (s) => s.match(/&.+?;/g) ? s.match(/&.+?;/g).map(el=> [el,String.fromCharCode(/\d+/.exec(el)[0])]).map(m=> s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;
reChar('T&#233;cnica en Administraci&#243;n y Finanzas')
// output: "Técnica en Administración y Finanzas"

function rgb2cmyk(s){
  const cmy = (x) => 1 - (x / 255);
  const cmyk = (x) => Math.round(((x - k) / (1 - k)) * 100);
  const rgb = /(?<=rgb\()(\d+),\s*(\d+),\s*(\d+)/i.exec(s);
  let k = Math.min(cmy(rgb[1]), Math.min(cmy(rgb[2]), cmy(rgb[3])));  
  return `cmyk(${cmyk(cmy(rgb[1]))}%, ${cmyk(cmy(rgb[2]))}%, ${cmyk(cmy(rgb[3]))}%, ${Math.round(k * 100)}%)`
}


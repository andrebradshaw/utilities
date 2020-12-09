async function parseURI(d){
  var reader = new FileReader();    /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
  reader.readAsDataURL(d);          /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
  return new Promise((res,rej)=> {  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
    reader.onload = (e) => {        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
      res(e.target.result)
    }
  })
} 

async function getDataBlob(url){
  var res = await fetch(url);
  var blob = await res.blob();
  var uri = await parseURI(blob);
  return uri;
}

getDataBlob(your_url);

function extractLinkedInURLS(){
    var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
    var ele = (t) => document.createElement(t);
    var attr = (o, k, v) => o.setAttribute(k, v);

    function createUploadHTML(){

        if(gi(document,'pop_FileUploader')) gi(document,'pop_FileUploader').outerHTML = '';

        var popCont = ele("div");
        document.body.appendChild(popCont);
        attr(popCont, "id", "pop_FileUploader");
        attr(popCont, 'style','position: fixed; top: 20%; left: 50%; width: 280px; height: 100px; background: lightgrey; border: 1px solid #616161; border-radius: .5em; padding: 6px; z-index: 12000;');

        var closeBtn = ele("div");
        attr(closeBtn, "id", "note_btn_close");
        attr(closeBtn, 'style','background: transparent; width: 15px; height: 15px; transform: scale(1.8, 1.2); border-radius: 1em; padding: 0px; color: Crimson; cursor: pointer');
        popCont.appendChild(closeBtn);
        closeBtn.innerText = "X";
        closeBtn.addEventListener("click", close);

        var uploadElm = ele("input");
        attr(uploadElm, "id", "customFileInput");
        attr(uploadElm, "type", "file");
        attr(uploadElm, "name", "file[]");
        attr(uploadElm, "multiple", "true");
        popCont.appendChild(uploadElm);
        uploadElm.style.transform = "scale(1.1, 1.1) translate(5%, 80%)";
        uploadElm.addEventListener("change", handleFiles);

        function close() {
          document.body.removeChild(popCont);
        }
    }

    createUploadHTML();


    async function handleFiles() {
      var files = this.files;
      var contain_arr = [];
      for(var i=0; i<files.length; i++){
        let uri = await getDataBlob(files[i]);
        contain_arr.push(uri);
      }
      console.log(contain_arr);
      gi(document,'pop_FileUploader').outerHTML = '';
      getLinkedIURLs(contain_arr.reduce((a,b)=> a+','+b))
    }

    async function parseURI(d){
      var reader = new FileReader();    /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
      reader.readAsText(d);
      return new Promise((res,rej)=> {  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
        reader.onload = (e) => {        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
          res(e.target.result)
        }
      })
    }

    async function getDataBlob(url){
      var uri = await parseURI(url);
      return uri;
    }

    function downloadr(arr2D, filename) {
      var data = arr2D;
      var type = 'data:text/plain;charset=utf-8,';
      var file = new Blob([data], {    type: type  });
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
      } else {
        var a = document.createElement('a'),
        url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 10);
      }
    }

    function getLinkedIURLs(text){
        var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
        let matches = text.match(/linkedin.\w+\/in\/.+?(?=\/|\?|,|\t|")|linkedin\.com\/talent\/profile\/.{39}(?=\?|\/|,|\t|")|linkedin\.com\/sales\/people\/.{39}(?=\?|\/|,|\t|")/gi);
        let urls = matches?.length ? Array.from(matches).map(i=> `https://www.${i}`) : [];
        downloadr([...['linkedin_urls'],...unqHsh(urls,{})].map(i=> i+'\n').reduce((a,b)=> a+b),'Extracted LinkedIn URLS.tsv');
    }
}
extractLinkedInURLS()

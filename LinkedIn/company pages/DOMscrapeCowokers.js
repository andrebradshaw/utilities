async function getLinkedInDialogPopUp(){
    function downloadr(arr2D, filename) {
      var data = /.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el=> el.reduce((a,b) => a+'	'+b )).reduce((a,b) => a+''+b);
      var type = /.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
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
    var delay = (ms) => new Promise(res => setTimeout(res, ms));
    var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
    var dialog = Array.from(document.getElementsByTagName('div')).filter(elm=> elm.getAttribute('role') == 'dialog')?.[0];
    var hrefs = Array.from(dialog?.getElementsByTagName('a')).map(a=> a.href);
    var scrollable = document.getElementsByClassName('scaffold-finite-scroll--infinite')?.[0];
    let header_text = dialog.getElementsByTagName('h2')?.[0]?.innerText;
    let loop_count = /\d+/.exec(header_text)?.[0] ? parseInt(/\d+/.exec(header_text)?.[0]) : 100;
    let loop_degradiation_ratio = loop_count * 0.15;
    for(let i=0; i<loop_count; i++){
        await delay(500);
        Array.from(document.getElementsByClassName('scaffold-finite-scroll--infinite')?.[0]?.getElementsByTagName('a'))?.at(-1)?.scrollIntoViewIfNeeded({block: "end", inline: "end"});
        let urls = unqHsh(hrefs,{});
        if((urls?.length - loop_degradiation_ratio) >= loop_count) {
            i=loop_count;
            break;
        }
    }
    Array.from(document.getElementsByClassName('scaffold-finite-scroll--infinite')?.[0]?.getElementsByTagName('a'))?.at(-1)?.scrollIntoViewIfNeeded({block: "end", inline: "end"});
    let tbody = Array.from(Array.from(document.getElementsByTagName('div')).filter(elm=> elm.getAttribute('role') == 'dialog')?.[0]?.getElementsByTagName('a')).filter(a=> !/message/i.test(a.className)).map(a=> {
            let arr = [...[a.href],...a.innerText?.split(/\n/)?.map(cell=> cell.trim()?.replace(/\t/g,' '))];
            let degrees = arr.splice(2,2);
            return [...arr,...[degrees.at(-1)]];
    }).map(cells=> cells.map(cell=> cell+'\t').reduce((a,b)=> a+b)).reduce((a,b)=> a+'\n'+b);
    let table = 'url\tfull_name\theadline\tdegree_connection\n'+ tbody;
    downloadr(table,/(?<=\/company\/)\S+(\/)/.exec(window.location.href)?.[0]+' - '+header_text+'.tsv');
}
getLinkedInDialogPopUp()

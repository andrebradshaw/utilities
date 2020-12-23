async function handleMultiFetch(arr,type){
    let res = await Promise.all(arr.map(e => fetch(e.url,e.obj)));
    if(type == 'json') return await Promise.all(res.filter(r=> (r.status > 199 && r.status < 305)).map(e => e.json()));
    if(type == 'text') return await Promise.all(res.filter(r=> (r.status > 199 && r.status < 305)).map(e => e.text()));
    if(type == 'html') {
        let text = await Promise.all(res.filter(r=> (r.status > 199 && r.status < 305)).map(e => e.text()));
        return new DOMParser().parseFromString(text,'text/html');
    } else { return false; }
}

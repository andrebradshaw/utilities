        async function multiFetchDoc(urls){
            const response_arr = [];
            let res = await Promise.all(urls.map(e => fetch(e)));
            let text = await Promise.all(res.filter(r=> (r.status > 199 && r.status < 305)).map(e => e.text()));
            return text.map(t=> new DOMParser().parseFromString(t,'text/html'));
        }

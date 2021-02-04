async function autoScrollLinkedIn(){
    const cn = (o, s) => o ? o.getElementsByClassName(s) : null;
    const tn = (o, s) => o ? o.getElementsByTagName(s) : null;
    const gi = (o, s) => o ? o.getElementById(s) : null;
    const rando = (n) => Math.round(Math.random() * n);
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    async function clickMore(){
        let expanders = Array.from(document.querySelectorAll('button, span')).filter(b=> /^(see more|show \d+ more|show more)/i.test(b.innerHTML) && b.getAttribute('class') != 'visually-hidden');
        if(expanders?.length) {
            let spot = Math.floor(rando(expanders.length));
            if(expanders[spot]){
                expanders[spot].scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
            }
        }
        expanders.forEach(x=> x.click());
        await delay(333);
        return expanders.length ? false : true;
    }
    async function clickSeeMore(){
        Array.from(document.querySelectorAll('button')).filter(r=> /see more/.test(r.innerText) && r.getAttribute('aria-expanded') === 'false').forEach(i=> i.click());
    }
    async function clickRecMore(){
        Array.from(cn(document,'recommendations-inlining')).map(r=> Array.from(tn(r,'a')).filter(i=> /^(see more|show \d+ more|show more)/i.test(i.innerHTML))).flat().forEach(i=> i.click())
    }
    for(let i=0; i<20; i++){
        let more = await clickMore();
        if(more) {
            await clickMore();
            clickSeeMore();
            clickRecMore();
            window.scrollTo(0,0);
            break;
        }
    }
    await delay(333);
    window.scrollTo(0,0);
}
autoScrollLinkedIn()

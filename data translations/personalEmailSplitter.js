async function buildContainer(){
    const reg = (o, n) => o ? o[n] : '';
    const cn = (o, s) => o ? o.getElementsByClassName(s) : null;
    const tn = (o, s) => o ? o.getElementsByTagName(s) : null;
    const gi = (o, s) => o ? o.getElementById(s) : null;
    const rando = (n) => Math.round(Math.random() * n);
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const ele = (t) => document.createElement(t);
    const attr = (o, k, v) => o.setAttribute(k, v);
    const reChar = (s) => typeof s == 'string' && s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el=> [el,String.fromCharCode(/d+/.exec(el)[0])]).map(m=> s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;
    const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
    const unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
    function inlineStyler(elm,css){
    Object.entries(JSON.parse(
    css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g,'"')
        .replace(/(?<=:\s*.+?);/g,'",')
        .replace(/[a-zA-Z-]+(?=:)/g, k=> k.replace(/^\b/,'"').replace(/\b$/,'"'))
        .replace(/\s*,\s*}/g,'}')
    )).forEach(kv=> { elm.style[kv[0]] = kv[1]});
    }
    function topZIndexer(){
        let n = new Date().getTime() / 100000;
        let r = (n - Math.floor(n)) * 1000;
        return Math.round(n+r);
    }
    function dragElement() { 
        var el = this.parentElement.parentElement;
        var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
        if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
        else this.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            inlineStyler(el,`{z-index: ${topZIndexer()};}`);
        }
        function elementDrag(e) {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            inlineStyler(el,`{top: ${(el.offsetTop - pos2)}px; left: ${(el.offsetLeft - pos1)}px; opacity: 0.85; transition: opacity 100ms;}`);
        }
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            el.style.opacity = "1";
        }
    }
    function setQuickliCSS(style_id){
        if(gi(document,`${style_id}_style`)) gi(document,`${style_id}_style`).outerHTML = '';
        let csselm = ele('style');
        a(csselm,[['class',`${style_id}_style`]]);
        document.head.appendChild(csselm);
        csselm.innerHTML = `
            .pad2 {
                padding: 2px;
            }
            .pad4 {
                padding: 4px;
            }
            .pad6 {
                padding: 6px;
            }
            .pad8 {
                padding: 8px;
            }
            .centertext {
                text-align: center;
            }
            .h32 {
                height: 32px;
            }
            .mover-left-gradient {
                background-image: linear-gradient(to bottom right, #ffffff, #ffffff, #f7f9fa);
                border-bottom-right-radius: 1em;
            }
            .textarea {
                outline: none;
                border-radius: 0.4em;
                border: 0px;
                background: transparent;
                box-shadow: rgb(204, 219, 232) 2px 2px 4px 1px inset, rgba(255, 255, 255, 0.5) -1px -2px 4px 2px inset;
                color: #788fa5;
            }
            .load_shiner {
                background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
                border-radius: 1em;
                background-size: 200% 100%;
                animation: 1.5s shine linear infinite;
            }
            
            @keyframes shine {
                to {
                  background-position-x: -200%;
                }
            }
   
            .label {
                display: inline-flex;
                align-items: center;
                cursor: pointer;
                color: #394a56;
            }
            
            .label-text {
                margin-left: 16px;
            }
            
            .toggle {
                isolation: isolate;
                position: relative;
                height: 30px;
                width: 60px;
                border-radius: 2em;
                overflow: hidden;
                box-shadow:
                -8px -4px 8px 0px #ffffff,
                8px 4px 12px 0px #d1d9e6,
                4px 4px 4px 0px #d1d9e6 inset,
                -4px -4px 4px 0px #ffffff inset;
            }
            
            .toggle-state {
                display: none;
            }
            
            .indicator {
                height: 100%;
                width: 200%;
                background: #ecf0f3;
                border-radius: 2em;
                transform: translate3d(-75%, 0, 0);
                transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
                box-shadow:
                -8px -4px 8px 0px #ffffff,
                8px 4px 12px 0px #d1d9e6;
            }
            
            .toggle-state:checked ~ .indicator {
                transform: translate3d(25%, 0, 0);
                background: #d0f2e5;
            }
            .${style_id} {
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                font-size: 1.2em;
                cursor: pointer;
                background: #ffffff;
                color: #788fa5;
                border-radius: 2em;
                transition: all 111ms;
                user-select: none;
            }
            .${style_id}:hover {
                box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 6px 0px, rgba(255, 255, 255, 0.8) -6px -2px 6px -3px;
                color: #788fa5;
            }
            .${style_id}:active {
                box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
                color: #788fa5;
            }
            `;
    }
    function keepElmInBoundary(elm){ 
        if(elm.getBoundingClientRect().right >= window.innerWidth){
            inlineStyler(elm,`{left: ${(window.innerWidth - (elm.getBoundingClientRect().width+30))}px;}`);
        }
        if(elm.getBoundingClientRect().bottom >= window.innerHeight){
            inlineStyler(elm,`{top: ${(window.innerHeight - (elm.getBoundingClientRect().height+60))}px;}`);
        }
    }

    setQuickliCSS('quickli_job_btn');

    const height = window.innerHeight <=600 ? window.innerHeight * 0.9 : window.innerHeight > 600 && window.innerHeight < 1100 ? window.innerHeight * 0.7 : window.innerHeight * 0.6;
    const width = window.innerWidth <= 800 ? window.innerWidth * 0.9 : window.innerWidth > 800 && window.innerWidth < 1161 ? window.innerWidth * 0.7 : window.innerWidth * 0.6;
    const left_p_h = 500;

    if(cn(document,'quickli_flash_info_card')) Array.from(cn(document,'quickli_flash_info_card')).forEach(r=> { r.outerHTML = ''; });
    const cont = ele('div');
    a(cont,[['class','quickli_flash_info_card']]);

    let shadow = 'box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;';

    inlineStyler(cont,`{position: fixed; z-index: ${topZIndexer()}; top: 500px; left: 0px; display: grid; grid-template-columns: 32px 1fr 92px; grid-gap: 12px; ${shadow} text-align: left; max-height: ${height}px; max-width: ${width}px; background: #ffffff; color: #374552; border-radius: 1em; padding: 12px; transition: all 111ms;}`);
    document.body.appendChild(cont);
    
    const panel = ele('div');
    a(panel,[['class','mover-left-gradient']]);
    inlineStyler(panel,`{display: grid; grid-template-rows: 32px 1fr; grid-gap: 12px; user-select: none;}`);
    cont.appendChild(panel);

    const cls = ele('div');
    panel.appendChild(cls);
    a(cls,[['class','quickli_job_btn h32']]);
    cls.innerHTML = `<svg style="border-radius: 2em; height: 30px; width: 30px;" x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`;
    cls.onclick = () => cont.outerHTML = '';

    const mover = ele('div');
    inlineStyler(mover,`{cursor: move; user-select: none;}`);
    panel.appendChild(mover);
    mover.onmouseover = dragElement;

    const left = ele('div');
    inlineStyler(left,`{padding: 0px;}`);
    cont.appendChild(left);

    const textarea = ele('textarea');
    a(textarea,[['class','query_item textarea pad8'],['placeholder','Copy/paste your column here.\nOne Column only.']]);
    inlineStyler(textarea,`{width: ${left_p_h-16}px; height: ${left_p_h}px;}`);
    left.appendChild(textarea);

    const btn = ele('div');
    a(btn,[['class','quickli_job_btn centertext pad8']]);
    left.appendChild(btn);
    btn.innerText = 'Split Emails and Sort';
    btn.onclick = personalEmailSort;

    const right = ele('div');
    inlineStyler(right,`{display: grid; grid-template-rows: 60px minmax(30px,60px) 300px 30px; grid-gap: 8px;}`);
    cont.appendChild(right);
    right.innerHTML = `<div title="Select if you want to remove corporate emails" style="user-select: none; font-size: 0.9em; text-align: center;">Remove Corporate Emails</div>    <div style="border: 0px;">        <label  style="border: 0px;" title="Select if you want to remove corporate emails" class="label">            <div class="label-text"></div>            <div class="toggle">                <input id="remove_corp_email_btn" class="toggle-state" type="checkbox" name="check" value="check" />                <div class="indicator"></div>            </div>        </label>    </div>  <div></div><div style="font-size: 0.6em; text-align: center;"><a rel="nofollow" href="https://www.patreon.com/andrebradshaw">made by Andre B.</a></div>`;
    keepElmInBoundary(cont);
    inlineStyler(cont,`{left: ${((window.innerWidth - cont.getBoundingClientRect().width) * 0.5)}px;}`);
    keepElmInBoundary(cont);    
}

function personalEmailSort(){
    const p_o = document.getElementById('remove_corp_email_btn')?.checked;
    var col = this.parentElement.getElementsByTagName('textarea')[0].value;
    var main_domains = ['\\bgmail\\b','\\bprotonmail\\b','\\byahoo\\b','\\bymail\\b','\\bhotmail\\b','\\blive\\b','\\boutlook\\b','\\brocketmail\\b','\\bcomcast\\b','\\bbellsouth\\b','\\baol\\b','\\bicloud\\b','\\bmac\\b','\\bmsn\\b','\\bsbcglobal\\b','\\bedu\\b'];
    var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
    var xx = /gmail|yahoo|hotmail|outlook|\blive\b|ymail|bellsouth|mindspring|comcast|\baol\b|rocketmail|windstream|earthlink|aol.com|att.net|comcast.net|facebook.com|gmail.com|gmx.com|googlemail.com|hotmail.com|hotmail.co.uk|mac.com|me.com|mail.com|msn.com|live.com|sbcglobal.net|verizon.net|yahoo.com|yahoo.co.uk|email.com|fastmail.fm|games.com|gmx.net|hush.com|hushmail.com|icloud.com|iname.com|inbox.com|lavabit.com|love.com|outlook.com|pobox.com|protonmail.ch|protonmail.com|tutanota.de|tutanota.com|tutamail.com|tuta.io|keemail.me|rocketmail.com|safe-mail.net|wow.com|ygm.com|ymail.com|zoho.com|yandex.com|bellsouth.net|charter.net|cox.net|\bcox\b|earthlink.net|juno.com|btinternet.com|virginmedia.com|blueyonder.co.uk|freeserve.co.uk|live.co.uk|ntlworld.com|o2.co.uk|orange.net|sky.com|talktalk.co.uk|tiscali.co.uk|virgin.net|wanadoo.co.uk|bt.com|sina.com|sina.cn|qq.com|naver.com|hanmail.net|daum.net|nate.com|yahoo.co.jp|yahoo.co.kr|yahoo.co.id|yahoo.co.in|yahoo.com.sg|yahoo.com.ph|163.com|yeah.net|126.com|21cn.com|aliyun.com|foxmail.com|hotmail.fr|live.fr|laposte.net|yahoo.fr|wanadoo.fr|orange.fr|gmx.fr|sfr.fr|neuf.fr|free.fr|gmx.de|hotmail.de|live.de|online.de|t-online.de|web.de|yahoo.de|libero.it|virgilio.it|hotmail.it|aol.it|tiscali.it|alice.it|live.it|yahoo.it|email.it|tin.it|poste.it|teletu.it|mail.ru|rambler.ru|yandex.ru|ya.ru|list.ru|hotmail.be|live.be|skynet.be|voo.be|tvcablenet.be|telenet.be|hotmail.com.ar|live.com.ar|yahoo.com.ar|fibertel.com.ar|speedy.com.ar|arnet.com.ar|yahoo.com.mx|live.com.mx|hotmail.es|hotmail.com.mx|prodigy.net.mx|yahoo.ca|hotmail.ca|bell.net|shaw.ca|sympatico.ca|rogers.com|yahoo.com.br|hotmail.com.br|outlook.com.br|uol.com.br|bol.com.br|terra.com.br|ig.com.br|itelefonica.com.br|r7.com|zipmail.com.br|globo.com|globomail.com|oi.com.br|rediffmail.com|yahoo.es|live.nl|bigpond.com|yahoo.in|yahoo.com.au|optonline.net|freenet.de|aliceadsl.fr|home.nl|voila.fr|planet.nl|arcor.de|frontiernet.net|hetnet.nl|live.com.au|zonnet.nl|club-internet.fr|optusnet.com.au|bluewin.ch|windstream.net|centurytel.net|chello.nl|live.ca|aim.com|bigpond.net.au|123mail.org|2-mail.com|4email.net|50mail.com|9mail.org|aapt.net.au|adam.com.au|airpost.net|allmail.net|anonymous.to|asia.com|berlin.com|bestmail.us|bigpond.com.au|comic.com|consultant.com|contractor.net|dodo.com.au|doglover.com|doramail.com|dr.com|dublin.com|dutchmail.com|elitemail.org|elvisfan.com|emailaccount.com|emailcorner.net|emailengine.net|emailengine.org|emailgroups.net|emailplus.org|emailsrvr.org|emailuser.net|eml.cc|everymail.net|everyone.net|excite.com|execs.com|exemail.com.au|f-m.fm|fast-email.com|fast-mail.org|fastem.com|fastemail.us|fastemailer.com|fastest.cc|fastimap.com|fastmail.cn|fastmail.co.uk|fastmail.com.au|fastmail.es|fastmail.im|fastmail.in|fastmail.jp|fastmail.mx|fastmail.net|fastmail.nl|fastmail.se|fastmail.to|fastmail.tw|fastmail.us|fastmailbox.net|fastmessaging.com|fastservice.com|fea.st|financier.com|fireman.net|flashmail.com|fmail.co.uk|fmailbox.com|fmgirl.com|fmguy.com|ftml.net|galaxyhit.com|hailmail.net|icqmail.com|iinet.net.au|imap-mail.com|imap.cc|imapmail.org|innocent.com|inorbit.com|inoutbox.com|internet-e-mail.com|internet-mail.org|lycos.com|mybox.xyz|netzero.net|postmaster.co.uk|reddif.com|runbox.com|sync.xyz|thexyz.ca|thexyz.co.uk|thexyz.com|thexyz.eu|thexyz.in|thexyz.mobi|thexyz.net|vfemail.net|webmail.wiki|xyz.am|z9mail.com|zilladog.com|zooglemail.com|\.edu/i;
    var ix = (arr,s) => arr.findIndex(i=> new RegExp(i,'i').test(s)) > -1 ? arr.findIndex(i=> new RegExp(i,'i').test(s)) : xx.test(s) ? 10 : 20;

    var split_emails = col.split(/\n/).map(r=> /\[/.test(r) ? JSON.parse(r.trim().replace(/^\['/g,'["').replace(/'\]$/g,'"]').replace(/','/g,'","')) : ['']).map(r=> r.filter(t=> p_o ? xx.test(t) : t).sort((a,b)=> ix(main_domains,a) - ix(main_domains,b))).map(r=> r.length ? r : ['']).map(r=> unqHsh(r.map(r=> r.toLowerCase()),{}).reduce((a,b)=> a+'\t'+b) ).reduce((a,b)=> a+'\n'+b);

    var max_header = Math.max(...split_emails.split(/\n/).map(r=> r.match(/\t/g) ? r.match(/\t/g).length : 0).flat());
    var header = Array((max_header+1)).fill().map((_,i)=> `Email ${i+1}`).reduce((a,b)=> a+'\t'+b);
    this.parentElement.getElementsByTagName('textarea')[0].value = header+'\n'+split_emails;
    this.parentElement.getElementsByTagName('textarea')[0].select();
    document.execCommand('copy');
}
buildContainer()

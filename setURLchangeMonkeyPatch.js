    function setURLchangeMonkeyPatch(id){
        const reg = (o, n) => o ? o[n] : '';
        const cn = (o, s) => o ? o.getElementsByClassName(s) : null;
        const tn = (o, s) => o ? o.getElementsByTagName(s) : null;
        const gi = (o, s) => o ? o.getElementById(s) : null;
        const ele = (t) => document.createElement(t);
        const attr = (o, k, v) => o.setAttribute(k, v);
        const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
        const monitor = ele('div');
        a(monitor,[['id',id],['current_url_displayed',window.location.href],['style','display: fixed;']]);
        document.body.appendChild(monitor);
    }

    function hasPageUrlChanged(id){
        const url = window.location.href;
        const monitor_elm = gi(document,id);
        const url_onlast_state = main_cont_elm?.getAttribute('current_url_displayed');
        if(url_onlast_state != url) {
            gi(document,id).setAttribute('current_url_displayed',url);
        }
    }


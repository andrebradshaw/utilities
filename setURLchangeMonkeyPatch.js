function dosomething(){
    console.log(this);
}
const page_change_monitor_object = {
    id: 'page_change_monitor',
    fn: dosomething,
    page_context: {
        href: window.location.href
    }
};
function monitorURLChanges(){
    const url = window.location.href;
    if(page_change_monitor_object?.page_context?.href != url) {
        page_change_monitor_object.fn();
        console.log('has changed',url);
        page_change_monitor_object['page_context']['href'] = url;
    }
}
document.body.onmousemove = monitorURLChanges;

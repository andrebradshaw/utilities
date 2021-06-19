async function getVimeoMp4(){
    var res = await fetch(`https://player.vimeo.com/video/${/vimeo\.com\/(\d+)/.exec(window.location.href)?.[1]}/config`);
    var d = await res.json();
    var vids = d?.request?.files?.progressive;
    var max_size = Math.max(...vids.map(i=> i.width));
    var target_index = vids.findIndex(i=> i.width == max_size);
    var target_mp4 = vids[target_index]?.url;
    window.open(target_mp4,'_self');
}
getVimeoMp4()

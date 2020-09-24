
function createDraggableResizableContainer(edit) {
    let {
      main_cont_id,
      cbod_bg_color,
      head_text
    } = edit;
    if (gi(document, main_cont_id)) gi(document, main_cont_id).outerHTML = '';
  
    let cont = ele('div');
    a(cont, [
      ['dragme', 'true'],
      ['id', main_cont_id],
      ['style', `position: fixed; top: 80px; left: 40px; z-index: ${new Date().getTime()}; max-height: ${(window.innerHeight * 0.9)}px; width: ${(window.innerWidth > 799 ? 500: window.innerWidth * 0.6 )}px; border: 1px solid #0a1114; border-radius: 0.45em; background: #0a1114; font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;`]
    ]); //"Lucida Console", Monaco, monospace
    document.body.appendChild(cont);
  
    let head = ele('div');
    a(head, [
      ['id',main_cont_id+'_head'],['style', `display: grid; grid-template-columns: 1fr 29px; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]
    ]);
    cont.appendChild(head);
    head.onmouseover = dragElement;
  
    let txt = ele('div');
    a(txt, [
      ['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; color: #fff; text-align: center;`]
    ]);
    head.appendChild(txt);
    txt.innerText = head_text;
  
    let cls = ele('div');
    a(cls, [
      ['style', `cursor: pointer;`]
    ]);
    head.appendChild(cls);
    cls.innerHTML = svgs.close;
    cls.onclick = () => cont.outerHTML = '';
    cls.onmouseenter = aninCloseBtn;
    cls.onmouseleave = anoutCloseBtn;
  
    let cont_rect = cont.getBoundingClientRect();
    let edge = 15;
  
    let mainbod = ele('div');
    cont.appendChild(mainbod);
  
    let cbod = ele('div');
    a(cbod, [
      ['id',main_cont_id+'_body'],['style', `background: ${cbod_bg_color}; padding: 8px; overflow-y: auto;`]
    ]);
    mainbod.appendChild(cbod);
  
    let footer = ele('div');
    a(footer, [
      ['dragme', 'true'],
      ['style', `display: grid; grid-template-columns: ${(cont_rect.width - (edge+4))}px ${edge}px; background: #0a1114; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; height: ${edge+4}px;`]
    ]);
    mainbod.appendChild(footer);
  
    let footertext = ele('div');
    footer.appendChild(footertext);
  
    let resizer = ele('div');
    a(resizer, [
      ['style', `background: transparent; cursor: nw-resize; text-align: left; border-radius: 0.4em;`]
    ]);
    footer.appendChild(resizer);
    resizer.innerHTML = svgs.resize_hover;
    resizer.onmouseover = adjustElementSize;
    return cbod;
  }
    let cont_obj = {
      main_cont_id: 'ID_HERE',
      cbod_bg_color: '#f5f5f2',
      head_text: 'HEADER TEXT HERE'
    }
    
    let ref = createDraggableResizableContainer(cont_obj);
  

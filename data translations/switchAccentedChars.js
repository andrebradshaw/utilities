var accents = [{        codes:[224, 225, 226, 228, 230, 227, 229, 257],        char:'a'    },{        codes:[192, 193, 194, 196, 198, 195, 197, 256],        char:'A'    },{        codes:[232, 233, 234, 235, 275, 279, 281],        char:'e'    },{        codes:[200, 201, 202, 203, 274, 278, 280],        char:'E'    },{        codes:[206, 207, 205, 298, 302, 204],        char:'I'    },{        codes:[238, 239, 237, 299, 303, 236],        char:'i'    },{        codes:[209, 323],        char:'N'    },{        codes:[241, 324],        char:'n'    },{        codes:[244, 246, 242, 243, 339, 248, 333, 245],        char:'o'    },{        codes:[212, 214, 210, 211, 338, 216, 332, 213],        char:'O'    },{        codes:[223, 347, 353],        char:'s'    },{        codes:[346, 352],        char:'S'    },{        codes:[219, 220, 217, 218, 362],        char:'U'    },{        codes:[251, 252, 249, 250, 363],        char:'u'    },{        codes:[255],        char:'y'    },{        codes:[376],        char:'Y'    },{        codes:[322],        char:'l'    },{        codes:[321],        char:'L'    },{        codes:[199, 262, 268],        char:'C'    },{        codes:[231, 263, 269],        char:'c'    },{        codes:[381, 377, 379],        char:'Z'    },{        codes:[382, 378, 380],        char:'z'    }].map(r=> {
    return {
        ...r,
        ...{x:  new RegExp(r.codes.map(d=> String.fromCharCode(d)).reduce((a,b)=> a+'|'+b),'g')}
    }
});
function switchAccentedChars(s){
     accents.forEach(i=> {
        s = s.replace(i.x,i.char)
    })
    return s;
}

switchAccentedChars('AîôóúÇoĆopČ')



/*
alternate 
*/
// var accent_map = [{        codes:[224, 225, 226, 228, 230, 227, 229, 257],        char:'a'    },{        codes:[192, 193, 194, 196, 198, 195, 197, 256],        char:'A'    },{        codes:[232, 233, 234, 235, 275, 279, 281],        char:'e'    },{        codes:[200, 201, 202, 203, 274, 278, 280],        char:'E'    },{        codes:[206, 207, 205, 298, 302, 204],        char:'I'    },{        codes:[238, 239, 237, 299, 303, 236],        char:'i'    },{        codes:[209, 323],        char:'N'    },{        codes:[241, 324],        char:'n'    },{        codes:[244, 246, 242, 243, 339, 248, 333, 245],        char:'o'    },{        codes:[212, 214, 210, 211, 338, 216, 332, 213],        char:'O'    },{        codes:[223, 347, 353],        char:'s'    },{        codes:[346, 352],        char:'S'    },{        codes:[219, 220, 217, 218, 362],        char:'U'    },{        codes:[251, 252, 249, 250, 363],        char:'u'    },{        codes:[255],        char:'y'    },{        codes:[376],        char:'Y'    },{        codes:[322],        char:'l'    },{        codes:[321],        char:'L'    },{        codes:[199, 262, 268],        char:'C'    },{        codes:[231, 263, 269],        char:'c'    },{        codes:[381, 377, 379],        char:'Z'    },{        codes:[382, 378, 380],        char:'z'    }].map(r=> 
//     r.codes.map(c=> {
//         return {
//             [String.fromCharCode(c)]:r.char
//         }
//     })
// ).flat().reduce((a,b)=> {return {...a,...b}})

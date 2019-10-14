var table = (arr) =>  arr.map(el=> el.reduce((a,b)=> a+'\t'+b)).reduce((a,b)=> a+'\n'+b);


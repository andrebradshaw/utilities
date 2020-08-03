var everyMutual = (arr)=> arr.map( (s,i,r)=>  r.map( z=> i == (r.length-1) ? [r[0],z] : [r[(i+1)],z] ) ).flat()

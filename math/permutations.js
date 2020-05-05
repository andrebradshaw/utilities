  function permutations(n){
    for(var i=(n-1); i>0; i--){
      n = n*i;
    }
    return n;
  } 

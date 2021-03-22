function commaNumber(n){
    const everyNth = (i,n) => /\./.test((i/n).toString()) === false && i != 0;
    return n.toString().split('').reverse().map((t,i,r)=> everyNth(i,3) ? t+',' : t).reverse().reduce((a,b)=> a+b);
}

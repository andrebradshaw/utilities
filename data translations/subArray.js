var subArr = (r, n) => r.reduceRight((a,b,c,d) => [...a, d.splice(0,n)],[]);

function generatePassword(l){
    const rando = (n) => Math.round(Math.random() * n);
    var chars = ['qwertyuiopasdfghjklzxcvbnm','1234567890','QWERTYUIOPASDFGHJKLZXCVBNM','!@#$%^&*'];
    var allchars = chars.flat().reduce((a,b)=> a+b).split('');
    var pass = Array((l >= 8 ? l-4 : 10)).fill().map(i=> allchars[rando(allchars.length-1)]);
    if(chars.every(r=> r.split('').some(i=> pass.some(p=> p == i)))){ let string_pass = pass.reduce((a,b)=> a+b); return btoa(string_pass).slice((btoa(string_pass).length-5),(btoa(string_pass).length-1)) + string_pass; }else{ return generatePassword(14); }
}
generatePassword(20)

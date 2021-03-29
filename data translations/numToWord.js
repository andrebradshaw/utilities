function wordToNum(word){
    return word.match(/zero|one|two|three|four|five|six|seven|eight|nine/g).map(n=> ['zero','one','two','three','four','five','six','seven','eight','nine'].indexOf(n)).map(r=> r.toString()).reduce((a,b)=> a+b)
}

function numToWord(num){
    return (num+'').replace(/\D+/g,'').trim().split('').map(n=> ['zero','one','two','three','four','five','six','seven','eight','nine'][parseInt(n)]).reduce((a,b)=> a+''+b);
}

console.log([
    numToWord(20245677891),
    wordToNum('twozerotwofourfivesixsevenseveneightnineone')
])
/*
  expected output
  ["twozerotwofourfivesixsevenseveneightnineone", "20245677891"]
*/

var linkString = "https://www.linkedin.com/recruiter/api/smartsearch?reset=I_SWR&reset=CCNTL&reset=PATL&reset=ECTL&reset=LRTL&reset=OOTL&reset=sortBy&searchHistoryId=3379780924&searchSessionId=3379780924&linkContext=Controller%3AsmartSearch%2CAction%3Asearch%2CID%3A3379780924&doExplain=false&origin=SRFS&start=0&facet.I_SWR=80";

var url2list = (s) => s.match(/(?<=&|\?)(.+?)\=(.+?)(?=&|$)/g).map(i=> i.split('='));



function two2json(arr){
  var temp = [];
  for(var i=0; i<arr.length; i++){
    var path = {};
    var val = /\D/.test(arr[i][1]) ? arr[i][1] : parseInt(arr[i][1]);
    Object.defineProperty(path, arr[i][0], {
      value: val,
      writable: true
    });
     temp.push(path);
  }
  return temp;
}

two2json(url2list(linkString))

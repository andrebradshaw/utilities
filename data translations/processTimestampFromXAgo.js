/*
  processes "11 months ago" strings and returns a date.
*/

function dateString(d){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var date = new Date(d);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
function processTimestampFromXAgo(str){
    const now = new Date().getTime();
    var timestamp_;
    const query = [{x:/year/i,t:3.154e+10},
    {x:/month/i,t:2.628e+9},
    {x:/week/i,t:6.048e+8},
    {x:/day/i,t:8.64e+7},
    {x:/hour/i,t:3.6e+6},
    {x:/minute/i,t:60000},
    {x:/second/i,t:1000},
    {x:/just.+?now/i,t:1}]
    for(let i=0; i<query.length; i++){
        if(query[i].x.test(str)) {
            return dateString((now - (/\d/.test(str) ? parseInt(str.replace(/\D+/g,'')) * query[i].t : 0)));
        }
    }
}

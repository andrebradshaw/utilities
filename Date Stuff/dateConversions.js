function yearMonthDate(d){
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var date = new Date(d);
  return `${date.getUTCFullYear()}-${months[date.getUTCMonth()]}-${(date.getUTCDate() < 10 ? '0'+date.getUTCDate() : date.getUTCDate() )}`;
}
function dateMonthYear(d){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var date = new Date(d);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

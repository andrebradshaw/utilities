function dateString(d){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var date = new Date(d);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
`millsec_column`.split(/\n/).map(d=> dateString(parseInt(d))).reduce((a,b)=> a+'\n'+b)

function parseReadableDate(t) {
  var d = new Date(t);
  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()} ${(d.getHours() < 10 ? '0'+d.getHours() : d.getHours())}:${(d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes())}:00`;
}

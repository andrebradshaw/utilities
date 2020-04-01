function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var secs_ = /\d\d/.test(secs.toString()) ? secs.toString() : '0'+secs.toString();
  var mins = s % 60;
  var mins_ = /\d\d/.test(mins.toString()) ? mins.toString() : '0'+mins.toString();
  var hrs = (s - mins) / 60;
  var hrs_ = /\d\d/.test(hrs.toString()) ? hrs.toString() : '0'+hrs.toString();
  return hrs_+':'+mins_+':'+secs_;
}

function domplate() {
  var output = `YOUR SINGLE LINE SCRIPTS GO HERE`;
  var el = document.createElement('textarea');
  document.body.appendChild(el);
  el.value = output;
  el.select();
  document.execCommand('copy');
  el.outerHTML = '';
}
domplate()

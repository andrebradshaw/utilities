var options = ['Athens', 'Dunwoody', 'Macon', 'Atlanta', 'Sandy Springs', 'Brookhaven', 'Atlantis'];

function autocomplete(optionsArr, colorArr) {
  var borderColor = colorArr[0];
  var bgColor = colorArr[1];

  var cDiv = document.createElement('div');
  cDiv.setAttribute('id', 'pop_container');
  document.body.appendChild(cDiv);
  cDiv.style.display = 'inline-block';
  cDiv.style.position = 'fixed';
  cDiv.style.top = '300px';
  cDiv.style.left = '50%';
  cDiv.style.width = '25%';
  cDiv.style.height = '33%';
  cDiv.style.border = '1px solid Transparent';
  cDiv.style.background = 'Transparent';
  cDiv.style.borderRadius = '1em';
  cDiv.style.zIndex = '10000';
  cDiv.style.fontFamily = 'monospace';

  var textbox_1 = document.createElement('input');
  textbox_1.setAttribute('id', 'textbox_code');
  document.getElementById('pop_container').appendChild(textbox_1);
  textbox_1.style.width = '100%';
  textbox_1.style.height = '10%';
  textbox_1.style.padding = '6px';
  textbox_1.style.border = '1px solid ' + borderColor;
  textbox_1.style.borderRadius = '.2em';
  textbox_1.style.background = 'FloralWhite';
  textbox_1.style.fontSize = '1.2em';
  textbox_1.style.userSelect = 'none';
  textbox_1.style.fontFamily = 'monospace';

  function createDivsFromArray(arr) {
    var heightCont = (arr.length * 10);
    var autoCompl = document.createElement('div');
    autoCompl.setAttribute('id', 'autoCompl');
    document.getElementById('pop_container').appendChild(autoCompl);
    autoCompl.style.width = '100%';
    autoCompl.style.height = heightCont + '%';
    autoCompl.style.padding = '6px';
    autoCompl.style.border = '1px solid Transparent';
    autoCompl.style.background = 'Transparent';
    autoCompl.style.fontFamily = ' monospace';

    for (i = 0; i < arr.length; i++) {
      var iDiv = document.createElement('div');
      document.getElementById('autoCompl').appendChild(iDiv);
      iDiv.setAttribute('id', 'idiv_' + arr[i]);
      iDiv.innerText = arr[i];
      iDiv.style.width = "90%";
      iDiv.style.height = Math.floor(100 / (arr.length)) + "%";
      iDiv.style.background = bgColor;
      iDiv.style.border = "1px solid " + borderColor;
      iDiv.style.borderRadius = ".2em";
      iDiv.style.color = "white";
      iDiv.style.opacity = '.9';
      iDiv.style.padding = '2%';
      iDiv.style.cursor = "pointer";
      iDiv.style.transition = "all 193ms";
      iDiv.addEventListener('mouseover', hoverIn);
      iDiv.addEventListener('mouseout', hoverOut);
      iDiv.addEventListener('click', selectItem);
    }
  }

  function hoverIn() {
    this.style.opacity = '1';
    this.style.transform = 'scale(1.1, 1.1)';
  }

  function hoverOut() {
    this.style.opacity = '.9';
    this.style.transform = 'scale(1, 1)';
  }

  function getMatchesFromArray(str, arr) {
    var containArr = [];
    var regX = new RegExp(str.replace(/\W/g, '.{0,1}?'), 'i');
    for (i = 0; i < arr.length; i++) {
      if (regX.test(arr[i])) {
        containArr.push(arr[i]);
      }
    }
    return containArr;
  }

  function clearAutoCompl() {
    if (document.getElementById('autoCompl') != null) {
      document.getElementById('pop_container').removeChild(document.getElementById('autoCompl'))
    }
  }

  function curLocVal() {
    var inp = this.value;
    clearAutoCompl()
    if (inp.length > 2) {
      createDivsFromArray(getMatchesFromArray(inp, optionsArr))
    }
  }

  function selectItem() {
    new Promise(() => {
      document.getElementById('textbox_code').value = this.innerText
    }).then(clearAutoCompl())
  }
  document.getElementById('textbox_code').addEventListener('keyup', curLocVal);
}

autocomplete(options, ['DarkSlateGrey', 'DarkCyan'])

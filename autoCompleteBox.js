var options = ['Athens', 'Dunwoody', 'Macon', 'Atlanta', 'Sandy Springs', 'Brookhaven', 'Atlantis'];

function autocomplete(optionsArr) {
  var cDiv = document.createElement("div");
  cDiv.setAttribute("id", "pop_container");
  document.body.appendChild(cDiv);
  cDiv.style.display = "inline-block";
  cDiv.style.position = "fixed";
  cDiv.style.top = "300px";
  cDiv.style.left = "50%";
  cDiv.style.width = "25%";
  cDiv.style.height = "33%";
  cDiv.style.border = "1px solid Transparent";
  cDiv.style.background = "Transparent";
  cDiv.style.borderRadius = "1em";
  cDiv.style.padding = "3px";
  cDiv.style.zIndex = "10000";
  cDiv.style.fontFamily = '"Courier New", monospace';

  var textbox_1 = document.createElement("input");
  textbox_1.setAttribute("id", "textbox_code");
  document.getElementById("pop_container").appendChild(textbox_1);
  textbox_1.style.width = "99%";
  textbox_1.style.height = "10%";
  textbox_1.style.padding = "6px";
  textbox_1.style.border = "1px solid DarkSlateGrey";
  textbox_1.style.borderRadius = ".2em";
  textbox_1.style.background = "FloralWhite";
  textbox_1.style.fontSize = "1.2em";
  textbox_1.style.userSelect = "none";
  textbox_1.style.fontFamily = '"Courier New", monospace';

  function createDivsFromArray(arr) {
    var heightCont = (arr.length * 10);
    var autoCompl = document.createElement("div");
    autoCompl.setAttribute("id", "autoCompl");
    document.getElementById("pop_container").appendChild(autoCompl);
    autoCompl.style.width = "100%";
    autoCompl.style.height = heightCont + "%";
    autoCompl.style.padding = "6px";
    autoCompl.style.border = "1px solid Transparent";
    autoCompl.style.background = "Transparent";
    autoCompl.style.fontFamily = '"Courier New", monospace';

    for (i = 0; i < arr.length; i++) {
      var iDiv = document.createElement('div');
      document.getElementById('autoCompl').appendChild(iDiv);
      iDiv.setAttribute('id', 'idiv_' + arr[i]);
      iDiv.innerText = arr[i];
      iDiv.style.width = "90%";
      iDiv.style.height = Math.floor(100 / (arr.length)) + "%";
      iDiv.style.background = "DarkCyan";
      iDiv.style.border = "1px solid DarkSlateGrey";
      iDiv.style.borderRadius = ".2em";
      iDiv.style.color = "white";
      iDiv.style.padding = '2%';
      iDiv.style.cursor = "pointer";
      iDiv.style.transition = "all 193ms";
      iDiv.addEventListener('mouseover', hoverIn);
      iDiv.addEventListener('mouseout', hoverOut);
      iDiv.addEventListener('click', selectItem);
    }
  }

  function hoverIn() {
    this.style.background = 'CadetBlue';
  }

  function hoverOut() {
    this.style.background = 'DarkCyan';
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

autocomplete(options)

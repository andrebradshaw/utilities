var delay = (ms) => new Promise(res => setTimeout(res, ms));
async function loadingElm() {
  if (document.getElementById('loader-elm')) {
    document.body.removeChild(document.getElementById('loader-elm'));
  }
  var quickCont = document.createElement('div');
  quickCont.setAttribute('id', 'loader-elm')
  quickCont.style.position = 'fixed';
  quickCont.style.top = '300px';
  quickCont.style.right = '400px';
  quickCont.style.width = '0px';
  quickCont.style.height = '0px';
  quickCont.style.background = 'transparent';
  quickCont.style.zIndex = '12222';
  quickCont.addEventListener('click', animateQuickli);
  document.body.appendChild(quickCont);

  var circ = document.createElement('div');
  circ.setAttribute('id', 'quickliCirc');
  circ.style.width = '90px';
  circ.style.height = '90px';
  circ.style.background = 'transparent';
  circ.style.borderRadius = '50%';
  circ.style.border = '10px solid #2c2c2c';
  circ.style.transform = 'scale(1, 1) translate(0px, 0px) rotate(0deg)';
  circ.style.transition = 'all 311ms ease-in-out';
  quickCont.appendChild(circ);

  var dot = document.createElement('div');
  dot.style.background = '#2c2c2c';
  dot.style.opacity = '1';
  dot.style.height = '15px';
  dot.style.width = '15px';
  dot.style.borderRadius = '50%';
  dot.style.transform = 'translate(124px, -16px)';
  quickCont.appendChild(dot);

  var pivot1 = document.createElement('div');
  pivot1.setAttribute('id', 'quickliPivot1');
  pivot1.style.background = 'transparent';
  pivot1.style.opacity = '1';
  pivot1.style.height = '1px';
  pivot1.style.width = '1px';
  pivot1.style.borderRadius = '50%';
  pivot1.style.transform = 'translate(130px, -1px) rotate(0deg)';
  quickCont.appendChild(pivot1);

  var pivot2 = document.createElement('div');
  pivot2.setAttribute('id', 'quickliPivot2');
  pivot2.style.background = 'transparent';
  pivot2.style.opacity = '1';
  pivot2.style.height = '1px';
  pivot2.style.width = '1px';
  pivot2.style.borderRadius = '50%';
  pivot2.style.transform = 'translate(130px, -21px) rotate(0deg)';
  quickCont.appendChild(pivot2);

  var around1 = document.createElement('div');
  around1.style.background = 'transparent';
  around1.style.height = '15px';
  around1.style.width = '15px';
  around1.style.borderRadius = '50%';
  around1.style.transform = 'translate(-3px, 3px)';
  pivot1.appendChild(around1);

  var around2 = document.createElement('div');
  around2.style.background = 'transparent';
  around2.style.height = '15px';
  around2.style.width = '15px';
  around2.style.borderRadius = '50%';
  around2.style.transform = 'translate(-3px, 3px)';
  pivot2.appendChild(around2);


  var mark1 = document.createElement('div');
  mark1.setAttribute('id', 'quicklimark1');
  mark1.style.background = '#2c2c2c';
  mark1.style.width = '10px';
  mark1.style.height = '50px';
  mark1.style.borderRadius = '8%';
  mark1.style.transform = 'translate(-3px, -106px) rotate(0deg)';
  mark1.style.transformOrigin = "top center";
  pivot1.appendChild(mark1);

  var mark2 = document.createElement('div');
  mark2.style.background = '#2c2c2c';
  mark2.style.height = '10px';
  mark2.style.width = '50px';
  mark2.style.borderRadius = '8%';
  mark2.style.transform = 'translate(-70px, -20px) rotate(0deg)';
  mark2.style.transformOrigin = "top center";
  pivot2.appendChild(mark2);

  await delay(20);
  async function animateQuickli() {
    circ.style.transform = 'scale(1.12, 1.12) translate(65px, 39px) rotate(0deg)';
    circ.style.transition = 'all 311ms ease-in-out';

    pivot1.style.transform = 'translate(130px, -1px) rotate(0deg)';

    pivot2.style.transform = 'translate(130px, -21px) rotate(0deg)';

    around1.style.transform = 'translate(-3px, 3px)';

    around2.style.transform = 'translate(-3px, 3px)';

    mark1.style.background = '#2c2c2c';
    mark1.style.width = '10px';
    mark1.style.height = '50px';
    mark1.style.borderRadius = '8%';
    mark1.style.transform = 'translate(-3px, -106px) rotate(0deg)';
    mark1.style.transformOrigin = "top center";

    mark2.style.height = '10px';
    mark2.style.width = '50px';
    mark2.style.borderRadius = '8%';
    mark2.style.transform = 'translate(-70px, -20px) rotate(0deg)';
    mark2.style.transformOrigin = "top center";

    await delay(220);
    for (var i = 360; i > 1; i = i - 18) {
      circ.style.transform = 'scale(1.65, 1.65) translate(48px, 25px) rotate(0deg)';
      circ.style.border = '6px solid #2c2c2c';
      await delay(26);
      pivot2.style.transform = 'translate(130px, -21px) rotate(' + i + 'deg)';
      pivot2.style.transformOrigin = "top center";
    }
    circ.style.transform = 'translate(0px, 0px) rotate(0deg)';
    circ.style.border = '10px solid #2c2c2c';
    circ.style.transition = 'all 311ms ease-in-out';
    mark1.style.height = '69px';
    pivot1.style.transform = 'translate(130px, -21px) rotate(-10deg)';
    mark1.style.transition = 'all 311ms ease-in-out';
    pivot1.style.transition = 'all 311ms ease-in-out';
    pivot2.style.transform = 'translate(130px, -21px) rotate(0deg)';
  }
  animateQuickli();
}

loadingElm();

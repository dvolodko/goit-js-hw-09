const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let intervalId = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  bodyColorChanger();
  intervalId = setInterval(() => {
    bodyColorChanger();
  }, 1000);
  refs.stopBtn.disabled = false;
  refs.startBtn.disabled = true;
}

function onStopBtnClick() {
  clearInterval(intervalId);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
}

function bodyColorChanger() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

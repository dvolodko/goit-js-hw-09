import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysCounter: document.querySelector('span[data-days]'),
  hoursCounter: document.querySelector('span[data-hours]'),
  minutesCounter: document.querySelector('span[data-minutes]'),
  secondsCounter: document.querySelector('span[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);

refs.startBtn.disabled = true;

let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate > Date.now()) {
      refs.startBtn.disabled = false;
    } else {
      refs.startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    if (deltaTime > 0) {
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateTimerFace(days, hours, minutes, seconds);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFace(days, hours, minutes, seconds) {
  refs.daysCounter.textContent = days;
  refs.hoursCounter.textContent = hours;
  refs.minutesCounter.textContent = minutes;
  refs.secondsCounter.textContent = seconds;
}

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
};

const formData = {
  delay: 0,
  step: 0,
  amount: 0,
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  collectData(e);
  for (let index = 0; index < formData.amount; index++) {
    const delay = Number(formData.delay) + Number(formData.step) * index;
    createPromise(index + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          useIcon: false,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          useIcon: false,
        });
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function collectData(e) {
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  formData.delay = delay.value;
  formData.step = step.value;
  formData.amount = amount.value;
}

// Створити функцію яка буде створювати проміс.
// Створити функцію яка буде створювати масив промісів з різними ділей і позиціями

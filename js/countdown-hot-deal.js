const countDownDays = document.querySelector('.countdown-number-days');
const countDownHours = document.querySelector('.countdown-number-hours');
const countDownMinutes = document.querySelector('.countdown-number-minutes');
const countDownSeconds = document.querySelector('.countdown-number-seconds');

const countDown = () => {
  const now = new Date();
  const end = new Date('2023-01-10T00:00:00');
  const timeLeft = end - now;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  countDownDays.innerHTML = days;
  countDownHours.innerHTML = hours;
  countDownMinutes.innerHTML = minutes;
  countDownSeconds.innerHTML = seconds;
}

setInterval(countDown, 1000);




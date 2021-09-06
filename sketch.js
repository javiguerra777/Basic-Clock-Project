class DigitalClock {
  constructor(element) {
    this.element = element;
  }

  start() {
    this.update();

    setInterval(() => {
      this.update();
    }, 500)
  }

  update() {
    const parts = this.getTimeParts();
    const minuteFormatted = parts.minute.toString().padStart(2, "0");
    const secondFormatted = parts.seconds.toString().padStart(2, "0");
    const timeFormatted = `${parts.hour}:${minuteFormatted}:${secondFormatted} `;
    const amPm = parts.isAm ? "AM" : "PM";

    this.element.querySelector('.clock-time').textContent = timeFormatted;
    this.element.querySelector('.clock-ampm').textContent = amPm;
  }

  getTimeParts() {
    const now = new Date();

    return{
      hour: now.getHours() % 12 || 12,
      minute: now.getMinutes(),
      seconds: now.getSeconds(),
      isAm: now.getHours() < 12
    };
  }
}
let alarmEnd;
const timerDisplay = document.querySelector('.display__time-left');
function countDown(seconds){
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  alarmEnd = setInterval(() =>{
    const secondsLeft = Math.round((then - Date.now())/1000);
    //check if we should stop
    if(secondsLeft < 0){
      clearInterval(alarmEnd);
      return;
    }
    //display it
    displayTimeLeft(secondsLeft);
  }, 1000)
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds/60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes} minutes ${remainderSeconds < 10 ? '0': ''}${remainderSeconds} seconds`;
  timerDisplay.textContent = display;
}
const clockElement = document.querySelector('.clock');

const clockObject = new DigitalClock(clockElement);


document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minute.value;
  countDown(mins * 60);
  this.reset();
});


clockObject.start();
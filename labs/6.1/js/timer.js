const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;

// Початково кнопка "Start" неактивна
startButton.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight'
            });
            startButton.disabled = true;
            userSelectedDate = null;
        } else {
            userSelectedDate = selectedDate;
            startButton.disabled = false;
            // Якщо таймер уже запущено і користувач вибрав нову дату,
            // зупиняємо попередній таймер та очищаємо відображення
            if (countdownInterval) {
                clearInterval(countdownInterval);
                updateTimerDisplay(0, 0, 0, 0); // Скидаємо відображення
            }
        }
    }
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
    if (!userSelectedDate) {
        return; // Не повинно трапитися, оскільки кнопка буде неактивна
    }

    startButton.disabled = true;
    dateTimePicker.disabled = true; // Блокуємо поле вибору дати

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = userSelectedDate - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            updateTimerDisplay(0, 0, 0, 0);
            dateTimePicker.disabled = false;
            iziToast.success({
                title: 'Finished!',
                message: 'Countdown has reached the end.',
                position: 'topRight'
            });
            return;
        }

        const time = convertMs(timeLeft);
        updateTimerDisplay(time.days, time.hours, time.minutes, time.seconds);
    }, 1000);
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimerDisplay(days, hours, minutes, seconds) {
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
}

document.addEventListener('DOMContentLoaded', () => {
    // Знаходимо форму в документі
    const form = document.querySelector('.form');

    // Додаємо слухача події 'submit' до форми
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Запобігаємо стандартній поведінці форми (перезавантаженню сторінки)

        // Отримуємо доступ до елементів форми
        const delayInput = this.elements.delay;
        const stateInput = this.elements.state; // Це RadioNodeList для групи радіокнопок 'state'

        // Отримуємо значення затримки та конвертуємо його в число
        const delay = parseInt(delayInput.value, 10);
        // Отримуємо значення вибраної радіокнопки ('fulfilled' або 'rejected')
        const selectedStateValue = stateInput.value;

        // Перевірка, чи введена затримка є валідним позитивним числом
        if (isNaN(delay) || delay <= 0) {
            iziToast.warning({
                title: 'Увага',
                message: 'Будь ласка, введіть дійсну позитивну затримку.',
                position: 'topRight'
            });
            return; // Виходимо з функції, якщо затримка невалідна
        }

        // Перевірка, чи обрано стан (fulfilled або rejected)
        if (!selectedStateValue) {
            iziToast.warning({
                title: 'Увага',
                message: 'Будь ласка, оберіть стан (Fulfilled або Rejected).',
                position: 'topRight'
            });
            return; // Виходимо, якщо стан не обрано
        }

        // Створюємо проміс
        const promise = new Promise((resolve, reject) => {
            // Встановлюємо таймер, який спрацює через вказану затримку
            setTimeout(() => {
                if (selectedStateValue === 'fulfilled') {
                    resolve(delay); // Виконуємо проміс зі значенням затримки
                } else {
                    reject(delay); // Відхиляємо проміс зі значенням затримки
                }
            }, delay);
        });

        // Обробляємо результат виконання промісу
        promise
            .then((delayMs) => {
                // Проміс виконано успішно
                iziToast.success({
                    title: 'Успішно', // Заголовок українською
                    message: `✅ Проміс виконано через ${delayMs}мс`, // Повідомлення українською
                    position: 'topRight',
                    backgroundColor: '#59A10D',
                    titleColor: 'white',
                    messageColor: 'white',
                    iconColor: 'white'
                });
            })
            .catch((delayMs) => {
                // Проміс відхилено
                iziToast.error({
                    title: 'Помилка', // Заголовок українською
                    message: `❌ Проміс відхилено через ${delayMs}мс`, // Повідомлення українською
                    position: 'topRight',
                    backgroundColor: '#FF5050',
                    titleColor: 'white',
                    messageColor: 'white',
                    iconColor: 'white'
                });
            });

        delayInput.value = ''; // Очищаємо поле затримки
        // Перевіряємо, чи є вибрана радіокнопка, і знімаємо вибір
        if (document.querySelector('input[name="state"]:checked')) {
            document.querySelector('input[name="state"]:checked').checked = false;
        }
    });
});

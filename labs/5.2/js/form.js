const formData = {
    email: '',
    message: ''
};

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.elements.email;
const messageTextarea = feedbackForm.elements.message;
const localStorageKey = 'feedback-form-state';

// Функція для збереження даних у локальне сховище
const saveToLocalStorage = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
};

// Функція для завантаження даних з локального сховища
const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            // Переконуємося, що parsedData існує і є об'єктом
            if (parsedData && typeof parsedData === 'object') {
                formData.email = parsedData.email || '';
                formData.message = parsedData.message || '';
                emailInput.value = formData.email;
                messageTextarea.value = formData.message;
            } else {
                // Якщо дані некоректні, ініціалізуємо formData порожніми значеннями
                formData.email = '';
                formData.message = '';
            }
        } catch (error) {
            console.error('Error parsing data from localStorage:', error);
            // У випадку помилки парсингу, ініціалізуємо formData порожніми значеннями
            formData.email = '';
            formData.message = '';
        }
    }
};

// Обробник події input для форми
feedbackForm.addEventListener('input', (event) => {
    const { name, value } = event.target;
    if (name === 'email' || name === 'message') {
        formData[name] = value.trim();
        saveToLocalStorage();
    }
});

// Обробник події submit для форми
feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Запобігаємо стандартній відправці форми

    if (!formData.email || !formData.message) {
        alert('Fill please all fields');
        return;
    }

    console.log('Form Data Submitted:', formData);

    localStorage.removeItem(localStorageKey);
    formData.email = '';
    formData.message = '';
    feedbackForm.reset(); // Очищуємо поля форми
});

// Завантажуємо дані з локального сховища при завантаженні сторінки
// DOMContentLoaded спрацьовує, коли початковий HTML-документ повністю завантажений та розібраний
// без очікування завершення завантаження таблиць стилів, зображень та підфреймів.
window.addEventListener('DOMContentLoaded', loadFromLocalStorage);

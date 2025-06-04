document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const gallery = document.getElementById('gallery');
    const loader = document.getElementById('loader');

    const PIXABAY_API_KEY = '50478710-88dd05c853b8d70e91dd29e22';
    const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

    let lightbox; // Змінна для зберігання екземпляра SimpleLightbox

    // Функції для показу/приховування індикатора завантаження
    function showLoader() {
        loader.style.display = 'block';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    // Ініціалізація SimpleLightbox
    function initializeLightbox() {
        if (lightbox) {
            lightbox.destroy(); // Знищуємо попередній екземпляр, якщо він є
        }
        // Використовуємо селектор, що відповідає структурі карток
        lightbox = new SimpleLightbox('.gallery a.gallery-link', {
            captionsData: 'alt',
            captionDelay: 250
        });
    }

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchQuery = event.target.elements.searchQuery.value.trim();

        if (!searchQuery) {
            iziToast.error({
                title: 'Помилка',
                message: 'Будь ласка, введіть пошуковий запит.',
                position: 'topRight'
            });
            return;
        }

        if (PIXABAY_API_KEY !== '50478710-88dd05c853b8d70e91dd29e22') {
            iziToast.error({
                title: 'Помилка конфігурації',
                message: 'Будь ласка, встановіть ваш API ключ для Pixabay у файлі search.js',
                position: 'topRight',
                timeout: 7000
            });
            return;
        }

        showLoader();
        gallery.innerHTML = ''; // Очищаємо попередні результати

        const params = new URLSearchParams({
            key: PIXABAY_API_KEY,
            q: searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: 20 // Можете налаштувати кількість результатів
        });

        try {
            const response = await fetch(`${PIXABAY_BASE_URL}?${params}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.hits.length === 0) {
                iziToast.info({
                    title: 'Немає результатів',
                    message: 'На жаль, зображень, що відповідають вашому запиту, не знайдено. Спробуйте ще раз.',
                    position: 'topRight'
                });
            } else {
                renderImageCards(data.hits);
                initializeLightbox(); // Ініціалізуємо/оновлюємо лайтбокс ПІСЛЯ додавання карток
            }
        } catch (error) {
            return;
        } finally {
            hideLoader();
            event.target.reset(); // Очищаємо форму
        }
    });

    function renderImageCards(images) {
        const fragment = document.createDocumentFragment();
        images.forEach((image) => {
            const card = createImageCard(image);
            fragment.appendChild(card);
        });
        gallery.appendChild(fragment); // Додаємо всі картки за одну операцію
    }

    function createImageCard(image) {
        // Обертаємо зображення в посилання для SimpleLightbox
        const link = document.createElement('a');
        link.classList.add('gallery-link');
        link.href = image.largeImageURL;
        link.setAttribute('data-alt', image.tags); // `alt` для підпису в SimpleLightbox

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('photo-card');

        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;
        img.loading = 'lazy'; // Додаємо ліниве завантаження

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
        infoDiv.innerHTML = `
            <p class="info-item"><b>Лайки</b> ${image.likes}</p>
            <p class="info-item"><b>Перегляди</b> ${image.views}</p>
            <p class="info-item"><b>Коментарі</b> ${image.comments}</p
            <p class="info-item"><b>Завантаження</b> ${image.downloads}</p>
        `;

        link.appendChild(img); // Додаємо img в посилання
        cardDiv.appendChild(link); // Додаємо посилання (з img всередині) в картку
        cardDiv.appendChild(infoDiv);

        return cardDiv; // Повертаємо всю структуру картки (div > a > img, div > info)
    }
});

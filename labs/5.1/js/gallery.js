document.addEventListener('DOMContentLoaded', () => {
    const images = [
        {
            preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
            original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
            description: 'Блакитний гімалайський мак'
        },
        {
            preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
            original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
            description: 'Вантажний контейнер'
        },
        {
            preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
            original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
            description: 'Пляж з висоти пташиного польоту'
        },
        {
            preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
            original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
            description: 'Рожеві квіти'
        },
        {
            preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
            original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
            description: 'Альпійські гори'
        },
        {
            preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
            original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
            description: 'Гірське озеро та вітрильник'
        },
        {
            preview: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg',
            original: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
            description: 'Яскравий осінній ліс'
        },
        {
            preview: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287__340.jpg',
            original: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg',
            description: 'Гірська річка та квіти'
        },
        {
            preview: 'https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285__340.jpg',
            original: 'https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_1280.jpg',
            description: 'Захід сонця над океаном'
        }
    ];

    const galleryContainer = document.querySelector('.gallery');

    function createGalleryItemsMarkup(items) {
        return items
            .map(({ preview, original, description }) => {
                return `
                <li class="gallery-item">
                    <img
                        src="${preview}"
                        data-original="${original}"
                        alt="${description}"
                    />
                </li>
            `;
            })
            .join('');
    }

    if (galleryContainer) {
        const galleryMarkup = createGalleryItemsMarkup(images);
        galleryContainer.innerHTML = galleryMarkup;
        galleryContainer.addEventListener('click', onGalleryItemClick);
    } else {
        console.error("Елемент галереї '.gallery' не знайдено!");
    }

    function onGalleryItemClick(event) {
        if (event.target.nodeName !== 'IMG') {
            return;
        }

        const originalImageURL = event.target.dataset.original;
        const imageDescription = event.target.alt;

        if (originalImageURL) {
            const instance = basicLightbox.create(`
                <img src="${originalImageURL}" alt="${imageDescription}">
            `);
            instance.show();
        }
    }
});

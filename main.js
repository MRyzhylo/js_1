var promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    var url = "https://api.unsplash.com/photos/?per_page=30&client_id=ca5a2a324ba06f2cf8bede88a989bb6c2f5f87730032b3c6256b72888f2cc94c";

    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open('GET', url, true);

    // 3. Отсылаем запрос
    xhr.send();

    xhr.onload = function () {
        if(this.status === 200) {
            resolve(this.responseText)
        } else {
            reject('error!' + this.status)
        }
    }
})

var renderImages = function (dataImages) {
    var html = dataImages.join('');
    document.querySelector('#images_block').innerHTML = html;
}

var htmlFormat = dataHtml => dataHtml.map(image => `<img src="${image.urls.small}" />`);

var jsonFormat = dataJson => JSON.parse(dataJson);

promise
    .then(jsonFormat)
    .then(htmlFormat)
    .then(renderImages)

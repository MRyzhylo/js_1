function sendQuery (pageValue, limit) {
 
var promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var clientId = 'ca5a2a324ba06f2cf8bede88a989bb6c2f5f87730032b3c6256b72888f2cc94c';
    var page = pageValue;
    var perPage = limit;
    var url = `https://api.unsplash.com/photos/?page=${page}&per_page=${perPage}&client_id=${clientId}`;

    xhr.open('GET', url, true);
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
}
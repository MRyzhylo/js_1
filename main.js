var inputNum = document.querySelector('#page_num');
var prevBtn = document.querySelector('#btn_prev');
var nextBtn = document.querySelector('#btn_next');
var limitPage = document.querySelector('#page_limit');
var ImgBlock = document.querySelector('#images_block');

function sendQuery(pageNumber, limit) {
    
    ImgBlock.className ='loading';

    var promise = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        var clientId = 'ca5a2a324ba06f2cf8bede88a989bb6c2f5f87730032b3c6256b72888f2cc94c';
        var page = pageNumber;
        var perPage = limit;
        var url = `https://api.unsplash.com/photos/?page=${page}&per_page=${perPage}&client_id=${clientId}`;

        xhr.open('GET', url, true);
        xhr.send();

        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.responseText)
            } else {
                reject('error!' + this.status)
            }
        }
    })

    var renderImages = function (dataImages) {
        var html = dataImages.join('');
        ImgBlock.innerHTML = html;
    }

    var htmlFormat = dataHtml => dataHtml.map(image => `<img src="${image.urls.small}" />`);

    var jsonFormat = dataJson => JSON.parse(dataJson);

    promise
        .then(jsonFormat)
        .then(htmlFormat)
        .then(renderImages)
        .then(()=>{
            setTimeout(()=> {
                ImgBlock.className = '';
            }, 1000);
        });
}
sendQuery(1, 6);

function changePrev() {
    inputNum.value > 1 
    ? inputNum.value--
    : inputNum.value = 1;

    sendQuery(inputNum.value, limitPage.value);
}

function changeNext() {
    inputNum.value++;

    sendQuery(inputNum.value, limitPage.value);
}

function changeLimit (){
    sendQuery(inputNum.value, limitPage.value);
}

function changeInput () {
    if(!inputNum.value || inputNum.value < 1) return;
    sendQuery(inputNum.value, limitPage.value);
}


prevBtn.onclick = changePrev;
nextBtn.onclick = changeNext;
limitPage.onchange = changeLimit;
inputNum.oninput = changeInput;

let galleryContent = document.querySelector(".gallery__content");
const galleryLoad = document.querySelector(".gallery__load");
let myStorage = JSON.parse(localStorage.getItem('inCart') ?? '[]')
let CategoryPosition = 'Architecture';
let startCounter=0; 
let headerCounter = document.querySelector(".header__counter");
let currentCounter = myStorage.length;


function cartDisplay (cart){
    headerCounter.textContent = cart;
    if (cart <= 0) 
        {headerCounter.style.display = "none";}
    else {headerCounter.style.display = "block";}
}

function loadMore (startNumber, filterPosition){
    
    cartDisplay (currentCounter); 
    const apiKey = "AIzaSyDm4Twyq7EIU0XpEWMI37zQxeAGpw3UX-A";
    const APIUrl = "https://www.googleapis.com/books/v1/volumes";
    fetch(`${APIUrl}?q=subject:${filterPosition}&startIndex=${startNumber}&maxResults=6&printType=books&&key=${apiKey}`)
    .then (data => data.json())
    .then (data => {
        
        data.items.forEach(item => {
            let ratingWidth = item.volumeInfo.averageRating==undefined? 0:item.volumeInfo.averageRating;
            let reviews = item.volumeInfo.ratingsCount==undefined? "":`${item.volumeInfo.ratingsCount} review`;
            const galleryBook = `
            <div class="gallery__book">
            <div class="book__cover">
            <img class="book__cover-img" src=${item.volumeInfo.imageLinks?.thumbnail ?? 'images/cover.png'} alt="Обложка книги">
            </div>
            <div class="book__description">
            <div class="book__author">${item.volumeInfo?.authors ?? "Unnown author"} </div>
            <div class="book__name">${item.volumeInfo.title}</div>
            <div class="book__reviews">
                <div class="book_rating">
                    <img src="output/images/rating.png">
                    <div class="rating__yellow" style="width:${ratingWidth*12.68}px"></div>
                </div>
                <div class="book__reviews-count">${reviews}</div>
            </div>
            <span class="book__summary">${item.volumeInfo?.description ?? " "}</span>
            <span class="book__price"> ${item.saleInfo.retailPrice?.amount ?? " "} ${item.saleInfo.listPrice?.currencyCode  ?? ''   }</span>
            <button class='book__button ${myStorage.includes(item.id)?"book__incart":"book__buy"}' book-id="${item.id}">${myStorage.includes(item.id) ? "In the cart" : "Buy now"}
            </button>
            </div>
            </div>`;
            galleryContent.innerHTML += galleryBook;
        })
    })
    .catch ((error) => {console.log(error), alert("ошибка загрузки, попробуйте позже")});
}

document.addEventListener("DOMContentLoaded", loadMore (startCounter, CategoryPosition));
galleryLoad.addEventListener('click', () => {
    startCounter=startCounter+6;
    loadMore(startCounter, CategoryPosition)});


document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains('book__button')){
        const bookId = event.target.getAttribute('book-id');
        if (event.target && event.target.classList.contains('book__buy')){
            
            event.target.classList.remove("book__buy");
            event.target.classList.add("book__incart");
            event.target.innerText = 'In the cart';
            
            currentCounter ++;
            cartDisplay (currentCounter);
            
            myStorage.push(bookId);
            }
        else {
            
            event.target.classList.remove("book__incart");
            event.target.classList.add("book__buy");
            event.target.innerText = 'Buy now';
           
            currentCounter--;
            
            cartDisplay (currentCounter);
            
            if(myStorage.includes(bookId)) {
                myStorage.splice(myStorage.indexOf(bookId),1)
            }
        }
        localStorage.setItem("inCart", JSON.stringify(myStorage)); 
    }
    if (event.target && event.target.classList.contains('categories__item') ){
        let galleryContent = document.querySelector('.gallery__content')
        galleryContent.innerHTML = ``;
        CategoryPosition = event.target.innerText;
        loadMore (0, CategoryPosition)
        document.querySelector(".category__active").classList.remove("category__active");
        event.target.classList.add("category__active")  

    }
});



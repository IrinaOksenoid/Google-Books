(()=>{var t={122:()=>{let t=document.querySelector(".gallery__content");const e=document.querySelector(".gallery__load");let o=JSON.parse(localStorage.getItem("inCart")??"[]"),n="Architecture",a=0,s=document.querySelector(".header__counter"),r=o.length;function i(t){s.textContent=t,s.style.display=t<=0?"none":"block"}function c(e,n){i(r),fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${n}&startIndex=${e}&maxResults=6&printType=books&&key=AIzaSyDm4Twyq7EIU0XpEWMI37zQxeAGpw3UX-A`).then((t=>t.json())).then((e=>{e.items.forEach((e=>{let n=null==e.volumeInfo.averageRating?0:e.volumeInfo.averageRating,a=null==e.volumeInfo.ratingsCount?"":`${e.volumeInfo.ratingsCount} review`;const s=`\n            <div class="gallery__book">\n            <div class="book__cover">\n            <img class="book__cover-img" src=${e.volumeInfo.imageLinks?.thumbnail??"images/cover.png"} alt="Обложка книги">\n            </div>\n            <div class="book__description">\n            <div class="book__author">${e.volumeInfo?.authors??"Unnown author"} </div>\n            <div class="book__name">${e.volumeInfo.title}</div>\n            <div class="book__reviews">\n                <div class="book_rating">\n                    <img src="output/images/rating.png">\n                    <div class="rating__yellow" style="width:${12.68*n}px"></div>\n                </div>\n                <div class="book__reviews-count">${a}</div>\n            </div>\n            <span class="book__summary">${e.volumeInfo?.description??" "}</span>\n            <span class="book__price"> ${e.saleInfo.retailPrice?.amount??" "} ${e.saleInfo.listPrice?.currencyCode??""}</span>\n            <button class='book__button ${o.includes(e.id)?"book__incart":"book__buy"}' book-id="${e.id}">${o.includes(e.id)?"In the cart":"Buy now"}\n            </button>\n            </div>\n            </div>`;t.innerHTML+=s}))})).catch((t=>{console.log(t),alert("ошибка загрузки, попробуйте позже")}))}document.addEventListener("DOMContentLoaded",c(a,n)),e.addEventListener("click",(()=>{a+=6,c(a,n)})),document.addEventListener("click",(function(t){if(t.target&&t.target.classList.contains("book__button")){const e=t.target.getAttribute("book-id");t.target&&t.target.classList.contains("book__buy")?(t.target.classList.remove("book__buy"),t.target.classList.add("book__incart"),t.target.innerText="In the cart",r++,i(r),o.push(e)):(t.target.classList.remove("book__incart"),t.target.classList.add("book__buy"),t.target.innerText="Buy now",r--,i(r),o.includes(e)&&o.splice(o.indexOf(e),1)),localStorage.setItem("inCart",JSON.stringify(o))}t.target&&t.target.classList.contains("categories__item")&&(document.querySelector(".gallery__content").innerHTML="",n=t.target.innerText,c(0,n),document.querySelector(".category__active").classList.remove("category__active"),t.target.classList.add("category__active"))}))}},e={};function o(n){var a=e[n];if(void 0!==a)return a.exports;var s=e[n]={exports:{}};return t[n](s,s.exports,o),s.exports}(()=>{"use strict";const t=[{url:"./output/images/banner1.png",alt:"Распродажа"},{url:"./output/images/banner2.png",alt:"топ 10 для предпринимателей"},{url:"./output/images/banner3.png",alt:"Выбор редакции"}],e=document.querySelector(".slider__image"),n=document.querySelectorAll(".slider__dot");let a=0;function s(o){e.src=t[o].url,e.alt=t[o].alt,n.forEach(((t,e)=>{t.classList.toggle("slider__dot-active",e===o)}))}s(a),n.forEach(((t,e)=>{t.addEventListener("click",(()=>{a=e,s(a)}))})),setTimeout((function e(){a=(a+1)%t.length,s(a),setTimeout(e,5e3)}),5e3),o(122)})()})();
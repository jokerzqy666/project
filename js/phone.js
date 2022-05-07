let logo = getEle(".nav p")
logo.addEventListener("click", () => {
    location.assign("./index.html")
})

let buyBut = getEle(".choosePhoneBox button");
buyBut.addEventListener("click", () => {
    location.assign("./phoneDetails1.html")
})


new lunBo;

let returnTop = getEle(".return");
const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
let topH = 0;

returnTop.onclick = function() {
    let timer = setInterval(function() {
        var topH = document.documentElement.scrollTop || document.body.scrollTop;
        var stepLength = Math.ceil(topH / 5);
        document.documentElement.scrollTop = document.body.scrollTop = topH - stepLength;
        if (topH == 0) {
            clearInterval(timer);
        }
    }, 30);
}
const chooseBox = getEle(".choosePhone")
window.addEventListener("scroll", () => {
    topH = document.documentElement.scrollTop || document.body.scrollTop;
    if (topH > clientHeight) {
        returnTop.style.display = "block";
    } else {
        returnTop.style.display = "none";
    }
})

new PuBu(images);
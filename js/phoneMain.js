let logo = getEle(".nav p")
logo.addEventListener("click", () => {
    location.assign("./index.html")
})

let buyBut = getEle(".choosePhoneBox button");
buyBut.addEventListener("click", () => {
    location.assign("./phoneDetails.html")
})
new lunBo;

let returnTop = getEle(".return");
const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
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
let topH = 0;
const chooseBox = getEle(".choosePhone")
window.addEventListener("scroll", () => {
    topH = document.documentElement.scrollTop || document.body.scrollTop;
    if (topH > clientHeight) {
        returnTop.style.display = "block";
    } else {
        returnTop.style.display = "none";
    }

    // if (topH >= 70) {
    //     chooseBox.style.position = "sticky";
    //     chooseBox.style.top = 0;
    //     chooseBox.style.zIndex = 999;
    // } else {
    //     chooseBox.style.position = "none";

    // }

})
new PuBu(images1);
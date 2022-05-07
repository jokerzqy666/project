let logo = getEle(".nav p")
logo.addEventListener("click", () => {
    location.assign("http://127.0.0.1:5500/myProject/index.html")
})
let head = getEle(".head");
let a = getEleAll(".head a");
let navUl = getEle(".nav>ul");
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
window.addEventListener("scroll", () => {
    topH = document.documentElement.scrollTop || document.body.scrollTop;
    if (topH > clientHeight) {
        returnTop.style.display = "block";
    } else {
        returnTop.style.display = "none";
    }
    if (document.documentElement.scrollTop >= 100) changeLogo('images/logo.png', 'black', 'white');
    else changeLogo('images/logo1.png', 'white', 'black');
})

new lunBo;
new Foot(".fo");
new navBox(".chooseList", "LI");
new navBox(".chooseList", "DL");

new storeList();
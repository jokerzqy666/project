let logo = getEle(".nav p")
logo.addEventListener("click", () => {
    location.assign("http://127.0.0.1:5500/myProject/index.html")
})
let head = getEle(".head");
let a = getEleAll(".head a");
let changeSpeed = 0.1;
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

navUl.addEventListener("mouseover", e => {
    e = e || window.event;
    const target = e.target || e.srcElement;
    changeLogo('images/logo1.png', 'white', 'black');
    if (target.tagName == "A") {
        let timer;
        const p = document.createElement("p");
        target.parentNode.appendChild(p);
        target.style.color = "rgb(240, 24, 36)";
        const pObj = getEle(".nav>ul>li>p")
        let pWidth = 10;
        if (timer) clearInterval(timer)
        timer = setInterval(() => {
            pWidth++;
            pObj.style.width = pWidth + "px";
            pObj.style.height = 5 + "px";
            pObj.style.background = "rgb(240, 24, 36)";
            pObj.style.marginTop = 14 + "px";
            if (pWidth == 80) {
                clearInterval(timer);
            }
        }, 1)
    }
})
navUl.addEventListener("mouseout", e => {
    e = e || window.event;
    const target = e.target || e.srcElement;
    if (document.documentElement.scrollTop < 100) changeLogo('images/logo.png', 'black', 'white');
    if (target.tagName == "A") {
        let timer;
        const pObj = getEle(".nav>ul>li>p")
        let pWidth = 80;
        if (timer) clearInterval(timer)
        timer = setInterval(() => {
            pWidth--;
            pObj.style.width = pWidth + "px";
            pObj.style.height = 5 + "px";
            pObj.style.background = "rgb(240, 24, 36)";
            pObj.style.marginTop = 14 + "px";
            if (!pWidth) {
                clearInterval(timer);
                getEle(".nav>ul>li>p").remove();
            }
        }, 1)
    }
})

window.addEventListener("scroll", () => {
    topH = document.documentElement.scrollTop || document.body.scrollTop;
    if (topH > clientHeight) {
        returnTop.style.display = "block";
    } else {
        returnTop.style.display = "none";
    }
    if (document.documentElement.scrollTop >= 100) changeLogo('images/logo1.png', 'white', 'black');
    else changeLogo('images/logo.png', 'black', 'white');
    if (document.documentElement.scrollTop >= 550) {
        move(".bannerBox", {
            opacity: 1,
            top: -100
        });
        move(".bannerBox>img", {
            opacity: 1,
        });
    }
    if (document.documentElement.scrollTop >= 1660) {
        move(".content button", {
            marginTop: 30
        }, 30);
    }
})

new lunBo;
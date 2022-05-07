let logo = getEle(".nav p")
logo.addEventListener("click", () => {
    location.assign("http://127.0.0.1:5500/myProject/index.html")
})
new Enlarge(".phoneBox");

new changeCard(".chooseColor", "DL");
new changeCard(".pay", "DL");

new changeCard(".chooseCard", "LI", "a");
new setAttr('.cardBoxList')
new changeCard(".cardBoxList", "LI");
new Foot(".fo");

let addCard = getEle('.addCard');
addCard.onclick = function() {
    layer.msg('加入购物车成功')
}
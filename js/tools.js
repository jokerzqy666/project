function getEle(ele) {
    return document.querySelector(ele);
}

function getEleAll(ele) {
    return document.querySelectorAll(ele);
}

function changeLogo(url, color, textColor) {
    logo.style.background = "url(" + url + ")";
    logo.style.backgroundSize = "100% 100%";
    head.style.background = color;
    a.forEach(val => {
        val.style.color = textColor;
    })
}

function move(element, object, cd = 30, callback = function() {}) {
    element = getEle(element);
    for (let type in object) {
        let startVal = (type === 'opacity') ? window.getComputedStyle(element)[type] * 100 : parseInt(window.getComputedStyle(element)[type]);
        let endVal = (type === 'opacity') ? object[type] * 100 : object[type];
        let time = setInterval(function() {
            let step = (endVal - startVal) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            startVal += step;
            element.style[type] = (type === 'opacity') ? startVal / 100 : startVal + 'px';
            if (startVal == endVal) {
                clearInterval(time);
            }
            callback();
        }, cd)
    }
}

class lunBo {
    constructor() {
        this.imgBox = getEle(".imageBox");
        this.pointBox = getEle(".banner1>ol");
        this.banner = getEle(".banner1");
        this.pointBoxChildren = this.pointBox.children;
        this.banner_width = this.banner.clientWidth;
        this.timer = 0;
        this.index = 0;
        this.flag = true;
        this.setPoint();
        this.copyEle();
        this.autoPlay();
        this.overOut();
        this.bindEvent();
        this.changeTab();
    }
    setPoint() {
        let num = this.imgBox.children.length;
        this.pointBox.style.width = (num * 80 + 100) + "px";
        const frg = document.createDocumentFragment();
        for (let i = 0; i < num; i++) {
            const li = document.createElement("li")
            li.setAttribute('type', 'point')
            li.setAttribute('point_index', i + 1)
            if (i == 0) li.classList.add("active")
            frg.appendChild(li);
        }
        this.pointBox.appendChild(frg)
    }
    copyEle() {
        let firstEle = this.imgBox.firstElementChild.cloneNode(true);
        let lastEle = this.imgBox.lastElementChild.cloneNode(true);
        this.imgBox.appendChild(firstEle);
        this.imgBox.insertBefore(lastEle, this.imgBox.firstElementChild);
        this.imgBox.style.width = this.imgBox.children.length * 100 + "%";
        this.imgBox.style.left = -this.banner_width + "px";
    }
    autoPlay() {
        this.timer = setInterval(() => {
            this.index++;
            move(".imageBox", { left: -this.index * this.banner_width }, 1, this.moveEnd.bind(this))

        }, 2000)
    }

    moveEnd() {
        if (this.index == this.imgBox.children.length - 1) {
            this.index = 1;
            this.imgBox.style.left = -this.index * this.banner_width + "px";
        }
        for (let i = 0; i < this.pointBox.children.length; i++) {
            this.pointBoxChildren[i].className = ""
        }
        this.pointBoxChildren[this.index - 1].className = "active";
        this.flag = true;
    }

    overOut() {
        this.banner.addEventListener("mouseover", () => clearInterval(this.timer))
        this.banner.addEventListener("mouseout", () => this.autoPlay())
    }
    bindEvent() {
        this.banner.addEventListener("click", e => {
            e = e || window.event;
            const target = e.target || e.srcElement;
            if (target.className == "iconfont icon-xiayiyeqianjinchakangengduo-yuankuang") {
                if (!this.flag) return;
                this.index++;
                move(".imageBox", { left: -this.index * this.banner_width }, 1, this.moveEnd.bind(this))
                this.flag = false;
            }
            if (target.className == "iconfont icon-shangyiye") {
                this.index--;
                if (this.index <= 0) this.index = this.imgBox.children.length - 2
                move(".imageBox", { left: -this.index * this.banner_width }, 1, this.moveEnd.bind(this))
            }
            if (target.getAttribute('type') == 'point') {
                this.index = target.getAttribute('point_index') - 0;
                move(".imageBox", { left: -this.index * this.banner_width }, 1, this.moveEnd.bind(this))
            }
        })
    }
    changeTab() {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState == 'hidden') {
                clearInterval(this.timer)
            }
        })
    }
}

class PuBu {
    constructor(images) {
        this.imagesList = images;
        this.box = this.getEle(".box");
        this.btn = this.getEle(".btn");
        this.boxWidth = this.box.offsetWidth;
        this.space = 0;
        this.page = 1;
        this.pageSize = 3;
        this.render(this.page);
        this.eve(this.btn, "click")
            // this.cliH = document.documentElement.clientHeight;
            // this.eve(window, "scroll")
    }
    getEle(a) {
        return document.querySelector(a)
    }
    render(curPage) {
        this.btn.innerHTML = "正在加载";
        this.btn.classList.add("loading");
        this.pageStart = (curPage - 1) * this.pageSize;
        this.pageEnd = this.pageStart + this.pageSize;
        setTimeout(() => {
            this.showImg = this.imagesList.slice(this.pageStart, this.pageEnd);
            if (!this.showImg.length) {
                this.btn.innerHTML = "没有啦";
                this.alert();
                this.btn.classList.remove("loading");
                return;
            }
            this.html = "";
            this.showImg.forEach((ele) => {
                this.html += `<img src="${ele.path}" width="${ele.width}" height="${ele.height}" alt="">`;
            })
            this.box.innerHTML += this.html;
            this.btn.innerHTML = "查看更多";
            this.btn.classList.remove("loading")
            this.sortImg();

        }, 500)
    }
    alert() {
        alert("了解了这么多 点击去购买快去购买叭!")
    }
    sortImg() {
        this.itemsList = this.box.children;
        this.imgWidth = this.itemsList[0].offsetWidth;
        this.colum = parseInt(this.boxWidth / this.imgWidth);
        this.imgHeight = [];
        Array.from(this.itemsList).forEach((v, t) => {
            if (t < this.colum) {
                v.style.left = t * (this.imgWidth + this.space) + "px";
                this.imgHeight.push(v.offsetHeight)
            } else {
                this.min = this.imgHeight[0];
                this.minIndex = 0;
                this.imgHeight.forEach((val, index) => {
                    if (this.min > val) {
                        this.min = val;
                        this.minIndex = index;

                    }
                })
                v.style.left = this.itemsList[this.minIndex].offsetLeft + "px"
                v.style.top = this.min + this.space + "px"
                this.imgHeight[this.minIndex] = this.imgHeight[this.minIndex] + v.offsetHeight;
            }
        })
        this.box.style.height = Math.max(...this.imgHeight) + "px"
    }
    eve(ele, eve) {
        ele.addEventListener(eve, () => {
            this.move();
        })
    }

    move() {
        if (!this.btn.classList.contains("loading")) {
            this.render(++this.page);
        }
    }
    onScroll() {
        this.sTop = document.documentElement.scrollTop;
        this.contH = this.itemsList[this.itemsList.length - 1].offsetTop;
        if ((this.cliH + this.sTop) > this.cliH) this.eve(this.btn, "click")
    }


}


class Enlarge {
    constructor(ele) {
        this.ele = this.getElement(ele);
        this.show = this.getElement(".show");
        this.mask = this.getElement(".mask");
        this.enlarge = this.getElement(".enlarge");
        this.list = this.getElement(".phoneList");
        this.getProp();
        this.overOut();
        this.setScale();
        this.move();
        this.bindEve();
    }


    getElement(a) {
        return document.querySelector(a);
    }

    overOut() {
        this.show.addEventListener("mouseover", () => {
            this.mask.classList.add("active");
            this.enlarge.classList.add("active");
        })
        this.show.addEventListener("mouseout", () => {
            this.mask.classList.remove("active");
            this.enlarge.classList.remove("active");
        })

    }

    getProp() {
        this.mask_width = parseInt(window.getComputedStyle(this.mask).width);
        this.mask_height = parseInt(window.getComputedStyle(this.mask).height);
        this.show_width = this.show.offsetWidth;
        this.show_height = this.show.offsetHeight;
        this.bg = window.getComputedStyle(this.enlarge).backgroundSize.split(' ');
        this.bg_width = parseInt(this.bg[0]);
        this.bg_height = parseInt(this.bg[1]);
        this.enlarge_width = this.mask_width / this.show_width * this.bg_width;
        this.enlarge_height = this.mask_height / this.show_height * this.bg_height;
    }

    setScale() {
        this.enlarge.style.width = this.enlarge_width + 'px';
        this.enlarge.style.height = this.enlarge_height + 'px';
    }


    move() {
        this.show.addEventListener("mousemove", e => {
            e = e || window.event;

            let x = e.offsetX - this.mask_width / 2;
            let y = e.offsetY - this.mask_height / 2;

            if (x <= 0) x = 0;
            if (y <= 0) y = 0;
            if (x >= this.show_width - this.mask_width) x = this.show_width - this.mask_width;
            if (y >= this.show_height - this.mask_height) y = this.show_height - this.mask_height;
            this.mask.style.left = x + 'px';
            this.mask.style.top = y + 'px';

            const moveX = this.enlarge_width * x / this.mask_width;
            const moveY = this.enlarge_height * y / this.mask_height;
            this.enlarge.style.backgroundPosition = `-${moveX}px -${moveY}px`
        })
    }

    bindEve() {
        this.list.addEventListener("click", e => {
            e = e || window.event;
            const target = e.target || e.srcElement;
            if (target.nodeName == 'IMG') {
                for (let i = 0; i < this.list.children.length; i++) {
                    this.list.children[i].classList.remove('active');
                }
                target.parentElement.classList.add("active");
                const showImg = target.dataset.show;
                const enlargeImg = target.dataset.big;
                this.show.firstElementChild.src = showImg;
                this.enlarge.style.backgroundImage = `url(${enlargeImg})`
            }
        })
    }



}

class setAttr {
    constructor(ele) {
        this.ele = getEle(ele);
        this.setAttribute();

    }
    setAttribute() {
        let num = this.ele.children.length;
        for (let i = 0; i < num; i++) {
            this.ele.children[i].setAttribute('type', 'point');
            this.ele.children[i].setAttribute('point_index', i + 1);

        }
    }
}


class changeCard {
    constructor(ele, type, test) {
        ele = getEle(ele);
        this.type = type;
        this.change(ele);
        this.test = test;
        if (this.test) {
            this.showImg = phoneText;
            this.count = this.showImg.length;
            this.cardPhoneBox = getEle(".cardPhoneBox");
            this.btn = getEle(".cardPhone>button");
            this.page = 1;
            this.pageSize = 2;
            this.addPhone(this.page);
            this.eve(this.btn, "click");
        }
    }

    change(ele) {
        ele.addEventListener("click", e => {
            e = e || window.event;
            const target = e.target || e.srcElement;
            if (target.nodeName == this.type) {
                for (let i = 0; i < ele.children.length; i++) {
                    ele.children[i].classList.remove('active')
                }
                target.classList.add('active')
                if (target.parentElement.className == "cardBoxList") {
                    switch (target.getAttribute('point_index') - 0) {
                        case 1:
                            target.parentElement.nextElementSibling.innerHTML = `<img src="./images/parameter1.png" alt="">`;
                            break;
                        case 2:
                            target.parentElement.nextElementSibling.innerHTML = `<img src="./images/parameter2.png" alt="">`;
                            break;
                        case 3:
                            target.parentElement.nextElementSibling.innerHTML = `<img src="./images/parameter3.png" alt="">`;
                            break;
                        case 4:
                            target.parentElement.nextElementSibling.innerHTML = `
                            <div id="star">
                            <span>感觉页面做的怎么样</span>
                            <ul>
                                <li>
                                    <a href="javascript:;">1</a>
                                </li>
                                <li>
                                    <a href="javascript:;">2</a>
                                </li>
                                <li>
                                    <a href="javascript:;">3</a>
                                </li>
                                <li>
                                    <a href="javascript:;">4</a>
                                </li>
                                <li>
                                    <a href="javascript:;">5</a>
                                </li>
                            </ul>
                            <span></span>
                            <p>注释</p>
                        </div>`
                            this.starScore();
                            break;
                        case 5:
                            target.parentElement.nextElementSibling.innerHTML = `                  
                            <div class="question">
                            <div class="userQuestion">
                            <p>小伙伴们都很懒 什么也没有留下...</p>
                            </div>
                            <form action="">
                                <textarea name="textQuestion" id="" cols="60" rows="10"placeholder="有什么问题或者意见发表一下叭 看到回复的!" style=" border-radius:20px;resize:none; padding:5px 20px; background-color: rgb(243, 243, 243);"></textarea>
                                <button type = 'button' ">提交</button>
                            </form>
                        </div>`;
                            this.textButton = getEle(".question>form>button");
                            this.addListen(this.textButton, "click");
                            break;
                    }
                }
                if (this.test) this.phoneCard(target);
            }
        })
    }
    phoneCard(target) {
        const target1 = target;
        if (target1.className == "left active") {
            this.showImg = phoneText;
        }
        if (target1.className == "right active") this.showImg = phoneText1;
        this.cardPhoneBox.innerHTML = '';
        this.page = 1;
        this.addPhone(this.page, this.showImg);


    }
    addPhone(curPage, showImg) {
        this.savaDate = this.showImg;
        this.showImg = showImg;
        if (!this.showImg) { this.showImg = this.savaDate; }
        this.btn.classList.add("loading");
        this.btn.innerHTML = "正在加载";
        this.pageStart = (curPage - 1) * this.pageSize;
        this.pageEnd = this.pageStart + this.pageSize;
        setTimeout(() => {
            this.showImgData = this.showImg.slice(this.pageStart, this.pageEnd);
            this.html = "";
            this.showImgData.forEach((ele) => {
                this.html += `<dl>
                <dt><img src=${ele.path} alt=""></dt>
                <dd>${ele.text}</dd>
                <dd>￥${ele.price}</dd>
                <span>${ele.id}</span>
            </dl>`
            })
            this.cardPhoneBox.innerHTML += this.html;
            this.btn.classList.remove("loading")
            this.btn.innerHTML = "查看更多";

        }, 500)
    }
    eve(ele, eve) {
        ele.addEventListener(eve, () => {
            console.log(this.showImgData.length)
            this.count -= this.pageSize;
            if (!this.count) {
                this.btn.innerHTML = "到头啦";
                this.alert();
                return;
            }
            this.move();

        })
    }

    move() {
        if (!this.btn.classList.contains("loading")) {
            this.addPhone(++this.page);
        }
    }
    alert() {
        alert("了解了这么多 点击去购买快去购买叭!")

    }
    starScore() {
        this.mag = [
            "很不满意|差得太离谱，页面太难看非常不满",
            "不满意|页面有bug,不满意",
            "一般|看着一般，没有想象的那么好",
            "满意|很不错，总体来说，还是挺满意的",
            "非常满意|非常好，哪里都好，非常满意"
        ];
        this.ulObj = getEle('#star ul');
        this.lisObj = getEleAll('#star ul li');
        this.spanObj = this.ulObj.nextElementSibling;
        this.pObj = this.spanObj.nextElementSibling;
        this.setScore = 0;
        this.lisObj.forEach((li, index) => {
            this.addListen(li, "mouseover", index);
            this.addListen(li, "mouseout", index);
            this.addListen(li, "click", index);
        })
    };
    addListen(ele, type, index) {
        ele.addEventListener(type, () => {
            if (type == "mouseover") this.overFn(index);
            if (type == "mouseout") this.outFn();
            if (ele.nodeName == "LI" && type == "click") this.clickFn(index);
            if (ele == this.textButton && type == "click") this.addText();
        })
    }

    overFn(index) {
        if (this.spanObj.innerHTML) return;
        this.index = index;
        this.pObj.style.display = 'block';
        this.pObj.style.left = this.ulObj.offsetLeft + this.lisObj[0].offsetWidth * (this.index + 1) + 'px';
        this.tmpMsg = this.mag[this.index].split('|');
        this.pObj.innerHTML = `<strong><em>${this.tmpMsg[0]}</em></strong> ${this.tmpMsg[1]}`;
        this.score(++this.index)
    }
    outFn() {
        this.pObj.style.display = 'none';
        this.score();
    }
    clickFn(index) {
        this.index = index;
        this.setScore = this.index + 1;
        this.tmpMsg = this.mag[this.index].split('|');
        this.spanObj.innerHTML = `<strong>${this.tmpMsg[0]}</strong> ${this.tmpMsg[1]}`;
        this.pObj.style.display = 'none';
        getEle(".cardBoxList span").innerHTML = "1";
    }
    score(index) {
        this.index = index;
        this.tmpIndex = this.index || this.setScore;
        this.lisObj.forEach((li, key) => {
            li.className = key < this.tmpIndex ? 'on' : '';
        })
    }
    addText() {
        this.text = this.textButton.previousElementSibling.value;
        this.time = new Date;
        this.num = Math.ceil(Math.random() * 3 + 1);
        this.userQuestion = getEle(".userQuestion");
        this.pText = getEle(".userQuestion>p");
        this.pText.innerHTML = '';
        this.userQuestion.innerHTML += `
        <div class="cardText">
            <div class="headImg">
                <img src="./images/头像` + this.num + `.png" alt="">
                <p>匿名用户</p>
            </div>

            <p>` + this.text + `</p>
            <span>` + this.time + `</span>
            <button>回复</button>

        </div>

        `
        this.textButton.previousElementSibling.value = '';
    }

}

class Foot {
    constructor(ele) {
        this.ele = getEle(ele);
        this.product();
    }
    product() {
        this.html = ` <div class="foot">
        <div class="footer container">
        <div class="footerLeft">
            <div class="fLeft">
                <ul>
                    <li>加入我们</li>
                    <li><a href="none">zqyjoker@163.com</a></li>
                </ul>
                <ul>
                    <li>媒体联系</li>
                    <li><a href="none">zqyjoker@163.com</a></li>
                </ul>
            </div>
            <div class="fMid">
                <ul>
                    <li>服务支持</li>
                    <li>电话号码:400-860-2369</li>
                    <li>售后政策</li>
                    <li>备件价格</li>
                    <li>办公地址</li>
                    <li>深圳市南山区酷派大厦</li>
                </ul>
            </div>
            <div class="fRight">
                <ul>
                    <li>企业动态</li>
                    <li>可持续发展报告</li>
                    <li>社会责任行为准则</li>
                    <li>廉洁声明</li>
                </ul>
            </div>
        </div>
        <div class="footerRight">
            <h6>关于酷派</h6>
            <img src="./images/erweima.png" alt="">
        </div>
    </div>
</div>
<div class="last">
    <span>粤ICP备15075056号|&copy;2021 coolPad 版权所有 用户隐私 | 隐私政策</span>
</div>`;
        this.ele.innerHTML = this.html;
    }
}


class navBox {
    constructor(ele, type) {
        this.ele = getEle(ele);
        this.ulObj = this.ele.children[0];
        this.dlBox = this.ele.children[1];
        this.type = type;
        this.change(ele);
    }
    change(ele) {
        this.ele = getEle(ele)
        this.ele.addEventListener('mouseover', e => {
            e = e || window.event;
            const target = e.target || e.srcElement;
            if (target.nodeName == this.type) {
                if (target.nodeName == "DL") {
                    for (let i = 0; i < this.dlBox.children.length; i++) {
                        this.dlBox.children[i].classList.remove('active')
                    }
                    target.classList.add('active');
                }
                if (target.nodeName == "LI") {
                    for (let i = 0; i < this.ulObj.children.length; i++) {
                        this.ulObj.children[i].classList.remove('active')
                    }
                    target.classList.add('active');
                    this.addDl();
                }


            }
        });
        this.ele.addEventListener('mouseout', e => {
            e = e || window.event;
            const target = e.target || e.srcElement;
            target.classList.remove('active')
        });



    }
    addDl() {
        this.dlBox.innerHTML = '';
        let count = 0;
        let num1 = parseInt(Math.random() * 6 + 20);
        let num = parseInt(Math.random() * 20 + 10);
        for (let i = num;; i++) {
            count++;
            if (count == num1) return;
            this.dlBox.innerHTML += ` <dl><dt><img src="./images/products/product${i}.png" alt=""></dt><dd>手机</dd></dl>`;
        };
    }
}

class storeList {
    constructor() {
        this.count = 1;
        this.current = 1;
        this.ele = getEle('.store');
        this.storeBanner = getEle('.storeBanner');
        this.getData();
        this.eve();
    }
    async getData() {
        let { data, status } = await axios.get('http://localhost:8888/goods/list?current=' + this.current + '&&pagesize=15')
        if (status == 200) {
            let html = '';
            data.list.forEach(item => {
                html += `  <dl data-id="${item.goods_id}">
                <dt><img src="${item.img_big_logo}" alt=""></dt>
                <dd>${item.title}</dd>
                <dd>${item.text}</dd>
                <dd>${item.price}<span>元起</span></dd>
                <button>加入购物车</button>
            </dl>`
            });
            this.ele.innerHTML = html;
        }
    }
    eve() {

        this.storeBanner.addEventListener("click", e => {
            e = e || window.event;
            const target = e.target || e.srcElement;
            if (target.nodeName == "BUTTON") {
                this.addCard(target);
            }
            if (target.nodeName == 'LI') {
                Array.from(target.parentNode.children).forEach(item => {
                    item.classList.remove('active');
                })
                target.classList.add('active');
                this.current = target.innerHTML - 0;
                this.getData();
            }
        })


    }



    async addCard(target) {
        let goodsId = parseInt(target.parentNode.dataset.id);
        let token = localStorage.getItem('token');
        if (!token) location.assign("./login.html?ReturnUrl=./store.html");
        let userId = parseInt(localStorage.getItem('user_id'));
        if (!userId || !goodsId) {
            layer.open({
                title: '温馨提示',
                content: '商品可能下架或检查登录信息是否失效😓'
            });
        }
        axios.defaults.headers.common['authorization'] = token;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let message = `id=${userId}&goodsId=${+goodsId}`;
        console.log(message)
        let { data, status } = await axios.post('http://localhost:8888/cart/add', message);
        if (data.code == 401) {
            layer.open({
                content: '您的登录状态失效',
                btn: ['去登录页面', '留在当前页面'],
                yes: function() {
                    location.assign('./login.html')
                },
                btn2: function() {}
            })
        }
        if (status == 200 && data.code == 1) {
            console.log(this.count)
            if (!(this.count % 3)) {
                layer.open({
                    content: '购物车已有多件商品',
                    btn: ['去购物车结算', '留在当前页面'],
                    yes: function() {
                        location.assign('./cart.html')
                    },
                    btn2: function() {}
                })

            } else {
                layer.msg('加入购物车成功')

            }
            this.count++;
        }

    }
}

class Login {
    constructor() {
        this.loginBut = getEle(".loginBut");
        this.checkBox = getEle(".checkBox");
        this.form = getEle(".formBox>form");
        this.eve();
    }
    eve() {
        this.loginBut.addEventListener('click', e => {
            e = e || window.event;
            let userName = this.form.uname.value;
            let userPassword = this.form.password.value
            if (!userName.trim() || !userPassword.trim()) {
                layer.open({
                    title: '登录提示',
                    content: '账号或者密码不能为空'
                });
            }
            if (userName.trim() && userPassword.trim()) {
                if (!this.checkBox.checked) {
                    layer.open({
                        title: '登录提示',
                        content: '请阅读并同意用户协议和隐私政策'
                    });
                } else {
                    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    let data = `username=${userName}&password=${userPassword}`;
                    axios.post('http://localhost:8888/users/login', data).then(res => {
                        let { status, data } = res;
                        if (status == 200) {
                            if (data.code == 1) {
                                localStorage.setItem('token', data.token);
                                localStorage.setItem('user_id', data.user.id);
                                let url = location.search.split('=')[1];
                                if (!url) url = './index.html'
                                location.assign(url);
                            } else {
                                layer.open({
                                    title: '登录提示',
                                    content: '用户名或密码错误'
                                });
                            }
                        }
                    });

                }
            }
        });
    }
}

class Cart {
    constructor(ele) {
        this.ele = getEle(ele);
        this.checkAll = getEle(".cartNav input");
        this.allMoney = getEle(".cartRight>span");
        this.storeCount = getEle(".cartLeft>span");
        this.checkLogin();
        this.getCart();
    }
    async checkLogin() {
        const TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = TOKEN;
        let userId = localStorage.getItem('user_id');
        let { data } = await axios.get('http://localhost:8888/users/info/' + userId);
        if (!TOKEN || data.code == 401) location.assign("./login.html?ReturnUrl=./cart.html");

    }
    async getCart() {
        const TOKEN = localStorage.getItem('token');
        let userId = localStorage.getItem('user_id');
        axios.defaults.headers.common['authorization'] = TOKEN;
        let { data, status } = await axios.get('http://localhost:8888/cart/list?id=' + userId);
        if (status == 200) {
            if (data.code == 401) location.assign('./login.html?ReturnUrl=./cart.html');
            if (data.code == 1) {
                let html = '';
                if (!data.cart) {
                    layer.open({
                        title: '登录提示',
                        content: '购物车为空,商品列表添加叭',
                        btn: ['商品页'],
                        yes: function() {
                            location.assign('./store.html')
                        }
                    })
                }
                data.cart.forEach(item => {
                    html += `
                    <ul data-id="${item.goods_id}">
                    <li><input type="checkbox"></li>
                    <li><img src="${item.img_small_logo}" alt="">${item.title}</li>
                    <li>${item.price}</li>
                    <li class='storeNumber'>1</li>
                    <li class='storePri'>${item.price}</li>
                    <li><button>删除</button></li>
                </ul>
                    `
                })
                this.ele.innerHTML = html;
                this.checkBtn = getEleAll(".cartList input");
                this.event();

            }
        }
    }
    event() {
        this.ele.addEventListener('click', e => {
            e = e || window.event;
            this.judge(e)
        })
        this.checkAll.addEventListener('click', this.allChecked.bind(this))

    }
    judge({ target }) {
        if (target.innerHTML == '删除') {
            this.delStore(target);
            this.storePrice();
        }
        if (target.type == 'checkbox') {
            this.checkList(target);
            this.storePrice();
        }
    }
    allChecked() {
        let checked = this.checkAll.checked;
        this.storeCheck(checked);
    }

    checkList(target) {
        if (!target.checked) {
            this.checkAll.checked = false;
            return;
        }
        let bol = Array.from(this.checkBtn).find(item => {
            return !item.checked;
        })
        if (!bol) this.checkAll.checked = true;
    }

    storeCheck(checked) {
        this.checkBtn.forEach(item => {
            item.checked = checked;
        })
        this.storePrice();
    }


    delStore(target) {
        let that = this;
        let layerBol = layer.confirm('确定删除吗?', {
            title: '温馨提示'
        }, function() {
            let ulObj = target.parentNode.parentNode;
            let id = ulObj.dataset.id;
            let userId = localStorage.getItem('user_id');
            const TOKEN = localStorage.getItem('token');
            axios.defaults.headers.common['authorization'] = TOKEN;
            axios.get('http://localhost:8888/cart/remove?id=' + userId + '&goodsId=' + id)
                .then(res => {
                    let { data } = res;
                    if (data.code == 1) {
                        layer.close(layerBol);
                        layer.msg('商品删除成功');
                        ulObj.remove();
                        that.storePrice();
                    }

                });
        });
    }
    storePrice() {
        let cartList = getEleAll(".cartList ul");
        let storeNum = 0;
        let allPrice = 0;
        cartList.forEach(item => {
            if (item.firstElementChild.firstElementChild.checked) {
                storeNum += item.querySelector(".storeNumber").innerHTML - 0;
                allPrice += (item.querySelector('.storePri').innerHTML - 0);
            }
        })
        this.allMoney.innerHTML = allPrice;
        this.storeCount.innerHTML = storeNum;
    }

}
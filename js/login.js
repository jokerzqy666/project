new Foot(".fo");
new Login;
let eye = document.querySelector('.eye');
let psd = document.querySelector('#password')
let count = 1;
eye.onclick = () => {
    psd.type = (count % 2) ? 'text' : 'password';
    count++
}
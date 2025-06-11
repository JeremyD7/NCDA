const button = document.querySelector('.header__nav ul li:nth-child(3) a');
const introduce = document.querySelector('.introduce')
button.addEventListener('click', function (e) {

  e.preventDefault()

  introduce.style.display = 'flex';
})
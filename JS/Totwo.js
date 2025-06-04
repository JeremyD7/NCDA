//导航点击切换页面

const nav = document.querySelector('.header__nav ul')
nav.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.tagName === 'A' && e.target.dataset.id === '2') {
    location.href = "html/web-1920-2.html"
    // console.log('yes');

  }
  // console.log(e.target);

})


// const body = document.querySelector(body)
// let left = 0
// function scroll() {
//   left = window.pageXOffset
//   if (left === 0) {
//     console.log(left);

//   }
//   else {
//     console.log(left);

//   }
// }
// window.addEventListener('scroll', scroll)
const container = document.getElementById("body");
const contentWidth = container.scrollWidth - container.clientWidth;

// 逐步滚动
function scrollRight() {
  let currentScroll = 0;
  const step = 10; // 每次滚动的步长（像素）
  const timer = setInterval(() => {
    currentScroll += step;
    if (currentScroll >= contentWidth) {
      clearInterval(timer);
    }
    container.scrollLeft = currentScroll;
  }, 50); // 每隔 50ms 滚动一次（调整时间控制速度）
}

scrollRight(); // 调用自动滚动函数
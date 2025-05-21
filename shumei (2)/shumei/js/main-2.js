var index = 1;
var curIndex = 1;
var hei = document.body.clientHeight;
var pageNum = document.querySelectorAll(".page").length;

//如果不加时间控制，滚动会过度灵敏，一次翻好几屏
var startTime = 0,
  endTime = 0,
  now = 0;
//浏览器兼容
if (navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
  document.addEventListener("DOMMouseScroll", scrollFun, false);
} else if (document.addEventListener) {
  document.addEventListener("mousewheel", scrollFun, false);
} else if (document.attachEvent) {
  document.attachEvent("onmousewheel", scrollFun);
} else {
  document.onmousewheel = scrollFun;
}

//滚动事件处理函数
function scrollFun(event) {
  startTime = new Date().getTime();
  var delta = event.detail || -event.wheelDelta;
  //mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
  //DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
  if (endTime - startTime < -2000) {
    // if (delta > 0 && parseInt(main.offsetTop) > -(hei * (pageNum - 1))) {
    if (delta > 0 && index < pageNum) {
      //向下滚动
      index++;
      toPage(index);
    }
    if (delta < 0 && index > 1) {
      //向上滚动
      index--;
      toPage(index);
    }
    endTime = new Date().getTime();
  }
  // 给当前视区page元素实现卷轴效果

  $(".page")
    .eq(index - 1)
    .children('[class ^="text"]')
    .animate(
      {
        width: "65vw",
      },
      2000
    );
}

function toPage(tempIndex) {
  //jquery实现动画效果
  if (tempIndex != curIndex) {
    var delta = tempIndex - 1;
    const toTop = -delta * window.innerHeight + "px";
    console.log("to top :" + toTop);
    // now = now - delta * hei;
    $(".main").animate(
      {
        top: toTop,
      },
      1000
    );
    $(".page").children(".p1").animate(
      {
        width: "65vw",
      },
      2000
    );
    curIndex = tempIndex;
    index = tempIndex;
    if (curIndex > 1) {
      gotop.style.display = "block";
    } else {
      gotop.style.display = "none";
    }
    //更改列表的选中项
    // $(".pageUlLi").css("color", "black");
    // $("#pageUlLi" + index).css("color", "red");
  }
}

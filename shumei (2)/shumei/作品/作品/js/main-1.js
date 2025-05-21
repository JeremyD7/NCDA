jQuery(document).ready(function ($) {
  //如果要更改缩放效果的速度，请更改此值
  var scaleSpeed = 0.3,
    //如果要为设置不同的初始不透明度，请更改 .cd-half-block
    boxShadowOpacityInitialValue = 0.7,
    animating = false;

  //检查媒体查询 'desktop','mobile'
  var MQ = window
    .getComputedStyle(document.querySelector("body"), "::before")
    .getPropertyValue("content")
    .replace(/"/g, "")
    .replace(/'/g, "");
  $(window).on("resize", function () {
    MQ = window
      .getComputedStyle(document.querySelector("body"), "::before")
      .getPropertyValue("content")
      .replace(/"/g, "")
      .replace(/'/g, "");
  });

  //将动画绑定到窗口滚动事件
  triggerAnimation();
  $(window).on("scroll", function () {
    triggerAnimation();
  });

  function triggerAnimation() {
    //触发动画
    if (MQ == "desktop") {
      //如果在桌面屏幕上-设置分区动画
      !window.requestAnimationFrame
        ? animateSection()
        : window.requestAnimationFrame(animateSection);
    } else {
      //在mobile上-删除jQuery添加的样式
      $(".cd-section")
        .find(".cd-block")
        .removeAttr("style")
        .find(".cd-half-block")
        .removeAttr("style");
    }
  }

  function animateSection() {
    //动画
    var scrollTop = $(window).scrollTop(),
      windowHeight = $(window).height(),
      windowWidth = $(window).width();

    $(".cd-section").each(function () {
      var actualBlock = $(this),
        offset = scrollTop - actualBlock.offset().top,
        scale = 1,
        translate = windowWidth / 2 + "px",
        opacity,
        boxShadowOpacity;

      if (offset >= -windowHeight && offset <= 0) {
        //移动两个 .cd-half-block朝向中心-无缩放/不透明度效果
        (scale = 1),
          (opacity = 1),
          (translate =
            (windowWidth * 0.5 * (-offset / windowHeight)).toFixed(0) + "px");
      } else if (offset > 0 && offset <= windowHeight) {
        //这两个.cd-half-block位于中央-刻度.cd-block 元素并降低不透明度
        (translate = 0 + "px"),
          (scale = (1 - (offset * scaleSpeed) / windowHeight).toFixed(5)),
          (opacity = (1 - offset / windowHeight).toFixed(5));
      } else if (offset < -windowHeight) {
        //section not yet visible
        (scale = 1), (translate = windowWidth / 2 + "px"), (opacity = 1);
      } else {
        //section not visible anymore
        opacity = 0;
      }

      boxShadowOpacity =
        (parseInt(translate.replace("px", "")) * boxShadowOpacityInitialValue) /
        20;

      //平移/缩放剖面块
      scaleBlock(actualBlock.find(".cd-block"), scale, opacity);

      var directionFirstChild = actualBlock.is(":nth-of-type(even)")
        ? "-"
        : "+";
      var directionSecondChild = actualBlock.is(":nth-of-type(even)")
        ? "+"
        : "-";
      if (actualBlock.find(".cd-half-block")) {
        translateBlock(
          actualBlock.find(".cd-half-block").eq(0),
          directionFirstChild + translate,
          boxShadowOpacity
        );
        translateBlock(
          actualBlock.find(".cd-half-block").eq(1),
          directionSecondChild + translate,
          boxShadowOpacity
        );
      }
      //适用于浏览各个部分
      offset >= 0 && offset < windowHeight
        ? actualBlock.addClass("is-visible")
        : actualBlock.removeClass("is-visible");
    });
  }

  function translateBlock(elem, value, shadow) {
    //平移块
    var position = Math.ceil(Math.abs(value.replace("px", "")));

    if (position >= $(window).width() / 2) {
      shadow = 0;
    } else if (position > 20) {
      shadow = boxShadowOpacityInitialValue;
    }

    elem.css({
      "-moz-transform": "translateX(" + value + ")",
      "-webkit-transform": "translateX(" + value + ")",
      "-ms-transform": "translateX(" + value + ")",
      "-o-transform": "translateX(" + value + ")",
      transform: "translateX(" + value + ")",
      "box-shadow": "0px 0px 40px rgba(0,0,0," + shadow + ")",
    });
  }

  function scaleBlock(elem, value, opac) {
    //缩放块
    elem.css({
      "-moz-transform": "scale(" + value + ")",
      "-webkit-transform": "scale(" + value + ")",
      "-ms-transform": "scale(" + value + ")",
      "-o-transform": "scale(" + value + ")",
      transform: "scale(" + value + ")",
      opacity: opac,
    });
  }

  function smoothScroll(target) {
    //滚动
    animating = true;
    //animate()通过 CSS 样式将元素从一个状态改变为另一个状态。CSS属性值是逐渐改变的，这样就可以创建动画效果。
    $("body,html").animate(
      { scrollTop: target.offset().top },
      500,
      function () {
        animating = false;
      }
    );
  }
});

const math = {
  lerp: (a, b, n) => {
    return (1 - n) * a + n * b;
  },
  norm: (value, min, max) => {
    return (value - min) / (max - min);
  },
};

const config = {
  height: window.innerHeight,
  width: window.innerWidth,
};

class Smooth {
  constructor() {
    this.bindAll();

    this.el = document.querySelector("[data-scroll]");
    this.content = [...document.querySelectorAll("[data-scroll-content]")];

    this.dom = {
      el: this.el,
      content: this.content,
      elems: [
        [...this.content[0].querySelectorAll(".js-slide")],
        [...this.content[1].querySelectorAll(".js-slide")],
      ],
      handle: this.el.querySelector(".js-scrollbar__handle"),
    };

    this.data = {
      total: this.dom.elems[0].length - 1,
      current: 0,
      last: {
        one: 0,
        two: 0,
      },

      on: 0,
      off: 0,
    };

    this.bounds = {
      elem: 0,
      content: 0,
      width: 0,
      max: 0,
      min: 0,
    };

    this.state = {
      dragging: false,
    };

    this.rAF = null;
    this.parallax = null;

    this.init();
  }

  bindAll() {
    ["scroll", "run", "resize"].forEach(
      (fn) => (this[fn] = this[fn].bind(this))
    );
  }

  setStyles() {
    this.dom.el.style.position = "fixed";
    this.dom.el.style.top = 0;
    this.dom.el.style.left = 0;
    this.dom.el.style.height = "100%";
    this.dom.el.style.width = "100%";
    this.dom.el.style.overflow = "hidden";
  }

  setBounds(elems) {
    let w = 0;

    elems.forEach((el, index) => {
      const bounds = el.getBoundingClientRect();

      el.style.position = "absolute";
      el.style.top = 0;
      el.style.left = `${w}px`;

      w = w + bounds.width;

      this.bounds.width = w;
      this.bounds.max = this.bounds.width - config.width;

      console.log(this.bounds.width, this.bounds.max);

      if (this.data.total === index && elems === this.dom.elems[0]) {
        this.dom.content[0].style.width = `${w}px`;
        this.dom.content[1].style.width = `${w}px`;
        document.body.style.height = `${w}px`;
      }
    });
  }

  // resize() {
  //   this.setBounds(this.dom.elems[0]);
  //   this.setBounds(this.dom.elems[1]);
  //   this.scroll();
  // }

  preload() {
    imagesLoaded(this.dom.content, (instance) => {
      this.setBounds(this.dom.elems[0]);
      this.setBounds(this.dom.elems[1]);
    });
  }

  scroll() {
    if (this.state.dragging) return;

    this.data.current = window.scrollY;
    this.clamp();
  }

  drag(e) {
    this.data.current = window.scrollY - (e.clientX - this.data.on);
    this.clamp();
  }

  clamp() {
    this.data.current = Math.min(
      Math.max(this.data.current, 0),
      this.bounds.max
    );
  }

  run() {
    this.data.last.one = math.lerp(
      this.data.last.one,
      this.data.current,
      0.085
    );
    this.data.last.one = Math.floor(this.data.last.one * 100) / 100;

    this.data.last.two = math.lerp(this.data.last.two, this.data.current, 0.08);
    this.data.last.two = Math.floor(this.data.last.two * 100) / 100;

    const diff = this.data.current - this.data.last.one;
    const acc = diff / config.width;
    const velo = +acc;
    const bounce = 1 - Math.abs(velo * 0.25);
    const skew = velo * 7.5;

    this.dom.content[0].style.transform = `translate3d(-${this.data.last.one.toFixed(
      2
    )}px, 0, 0) scaleY(${bounce}) skewX(${skew}deg)`;
    this.dom.content[1].style.transform = `translate3d(-${this.data.last.two.toFixed(
      2
    )}px, 0, 0) scaleY(${bounce})`;

    const scale = math.norm(this.data.last.two, 0, this.bounds.max);

    this.dom.handle.style.transform = `scaleX(${scale})`;

    this.requestAnimationFrame();
  }

  on() {
    this.setStyles();
    this.setBounds(this.dom.elems[0]);
    this.setBounds(this.dom.elems[1]);
    this.addEvents();

    this.requestAnimationFrame();
  }

  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.run);
  }

  resize() {
    this.setBounds();
  }

  addEvents() {
    window.addEventListener("scroll", this.scroll, { passive: true });

    this.dom.el.addEventListener(
      "mousemove",
      (e) => {
        if (!this.state.dragging) return;

        this.drag(e);
      },
      { passive: true }
    );

    this.dom.el.addEventListener("mousedown", (e) => {
      this.state.dragging = true;
      this.data.on = e.clientX;
    });

    window.addEventListener("mouseup", () => {
      this.state.dragging = false;
      window.scrollTo(0, this.data.current);
    });
  }

  init() {
    this.preload();
    this.on();
  }
}

class Transition {
  constructor() {
    this.dom = {
      slices: [...document.querySelectorAll(".js-mask__slice")],

      images: [...document.querySelectorAll(".js-transition-img")],
      imagesInner: [...document.querySelectorAll(".js-transition-img__inner")],
      titles: [...document.querySelectorAll(".js-transition-title")],
    };

    this.tl = null;

    this.state = false;
  }

  resetScroll() {
    window.scrollTo(0, 0);
  }

  addEvents() {
    this.dom.triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();

        if (this.state) return;

        this.dom.triggers.forEach((el) => {
          el.classList.remove("is-active");
        });
        trigger.classList.add("is-active");

        this.state = true;
        this.tl.restart();
      });
    });
  }
}

// Init classes
const smooth = new Smooth();
const transition = new Transition();

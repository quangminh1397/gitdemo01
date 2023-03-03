document.addEventListener('DOMContentLoaded', () => {
  var topSlider = new Swiper('.top_slider', {
    loop: true,
    autoplay: true,
    pagination: {
      el: '.slider-main .pagination',
      clickable: true,
      renderBullet: (index, className) => {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      }
    },
    speed: 500,
    centeredSlides: true,
    slidesPerView: 1,
    breakpoints: {
      1441: {
        slidesPerView: 1.32,
      }
    }
  });

  var swiper = null;
  function initSwiper() {
    swiper = new Swiper('.contents_slider', {
      loop: true,
      loopedSlides: 2,
      autoplay: true,
      pagination: {
        el: '.contents__main .pagination',
        clickable: true,
        renderBullet: (index, className) => {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 20,
      on: {
        slideChange: function () {
          let realLength = this.slides.length - 4;
          this.allowSlidePrev = this.activeIndex <= 2 ? false : true;
          this.allowSlideNext = this.activeIndex > realLength ? false : true;
        }
      },
      breakpoints: {
        1025: {
          slidesPerView: 'auto',
        }
      }
    });
  }

  initSwiper();

  var timer;
  window.addEventListener('resize', debounce(function () {
    if (window.innerWidth >= 1024 && window.innerWidth <= 1160) {

      if (swiper) {
        swiper.destroy(true, true);
      }

      if (timer) {
        clearTimeout(timer);
      }

      /** reInit swiper */
      timer = setTimeout(initSwiper, 500);
    }
  }, 500));

  function debounce(func, delay) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func(...args);
        timerId = null;
      }, delay);
    };
  }
});
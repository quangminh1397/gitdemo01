document.addEventListener('DOMContentLoaded', () => {

  let body = document.querySelector('body');
  var menuToggleElement = document.querySelector('.js-menu-content');
  var hamburgerButon = document.querySelector('.js-humburger-btn');

  /**
   * click event for hamburder button
   * common
   */

  hamburgerButon.addEventListener('click', () => {
    if (hamburgerButon.checked == true) {
      body.style.overflow = 'hidden';
      menuToggleElement.style.right = '0';
    } else {
      body.style.overflow = '';
      menuToggleElement.style.right = '-100%';
    }
  });

  /**
   * max length
   * common
   */

  var p = document.querySelectorAll(".js-text-length");
  var maxLength = 64;

  p.forEach(element => {
    if (element.textContent.length > maxLength) {
      element.textContent = element.textContent.substring(0, maxLength) + "...";
    }
  });

  /**
   * scrollToTop
   * scrolling browser
   * common
   */

  // Lấy tham chiếu đến nút cuộn lên đầu trang
  var btnBackTop = document.querySelector(".js-backtop-btn");
  var btnCard = document.querySelector('.js-cart-btn');

  btnBackTop.addEventListener('click', () => {
    // Cho Safari
    document.body.scrollTop = 0;
    // Cho Chrome, Firefox, IE và Opera
    document.documentElement.scrollTop = 0;
  })

  // var timer;
  window.onscroll = function () {
    if (window.innerWidth <= 1024) {
      // Get the current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      const btnTopHeight = btnBackTop.offsetHeight;

      const footerWrapEle = document.querySelector('.m-footer__wrap');

      const footerWrapEleOffsetTop = footerWrapEle.offsetTop - window.innerHeight + btnTopHeight;

      if (scrollTop >= footerWrapEleOffsetTop) {
        btnBackTop.classList.remove('fixed');
        btnCard && btnCard.classList.remove('fixed');
      } else {
        btnBackTop.classList.add('fixed');
        btnCard && btnCard.classList.add('fixed');
      }
    }
  };

  /**
   * hide current item in group link
   * common
   */

  const groupLinks = document.querySelectorAll('.js-link-btn');

  if (groupLinks) {
    groupLinks.forEach(element => {
      const href = element.href.split('/');
      const current = href[href.length - 2];
      if (window.location.href.match(current)) {
        element.parentNode.parentNode.style.display = 'none';
      }
    })
  }

  $('.js-select').each(function () {
    var _this = $(this);
    _this.find('.m-input-select').click(function () {
      $(this).toggleClass('is-active');
      if ($(this).hasClass('is-active')) {
        $(this).next('.m-box-select').show();
      } else {
        $(this).next('.m-box-select').hide();
      }
    })
    _this.find('.m-box-select__list li').click(function () {
      var data = $(this).data('box');
      _this.find('.m-input-select').val(data);
      _this.find('.m-input-select').removeClass('is-active');
      _this.find('.m-box-select').hide();
    })
  })

  var swiper = new Swiper('.js-swiper-box', {
    direction: 'vertical',
    slidesPerView: "auto",
    mousewheel: true,
    navigation: {
      nextEl: '.swiper-button-next',
    },
  });

  // TABS
  if($('.js-tabs').length) {
    $('.js-tabs').each(function(){
      var _tab = $(this);
      _tab.find('.m-tabs__nav a').click(function(){
        $('.m-tabs__nav a').removeClass('is-active');
        $(this).addClass('is-active');
        var dataTab = $(this).data('tab');
        $('.m-tabs__content .tab-block').removeClass('is-active');
        $('.m-tabs__content .tab-block#' + dataTab).addClass('is-active');
      })
    })
  }

});
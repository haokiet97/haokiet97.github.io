(function ($) {
  "use strict"

  /* 1. Proloder */
  $(window).on('load', function () {
    $('#preloader-active').delay(450).fadeOut('slow');
    $('body').delay(450).css({
      'overflow': 'visible'
    });
  });

  /* 2. sticky And Scroll UP */
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $(".header-sticky").removeClass("sticky-bar");
      $('#back-top').fadeOut(500);
    } else {
      $(".header-sticky").addClass("sticky-bar");
      $('#back-top').fadeIn(500);
    }
  });

  // Scroll Up
  $('#back-top a').on("click", function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });


  /* 3. slick Nav */
  // mobile_menu
  var menu = $('ul#navigation');
  if (menu.length) {
    menu.slicknav({
      prependTo: ".mobile_menu",
      closedSymbol: '+',
      openedSymbol: '-'
    });
  };

  /* 4. MainSlider-1 */
  // h1-hero-active
  function mainSlider() {
    var BasicSlider = $('.slider-active');
    BasicSlider.on('init', function (e, slick) {
      var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
      doAnimations($animatingElements);
    });
    BasicSlider.slick({
      autoplay: false,
      autoplaySpeed: 5000,
      dots: false,
      fade: true,
      arrows: false,
      prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
      ]
    });

    function doAnimations(elements) {
      var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
          'animation-delay': $animationDelay,
          '-webkit-animation-delay': $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();

  /* 5. Testimonial Active*/

  /* 4. Testimonial Active*/
  var testimonial = $('.h1-testimonial-active');
  if (testimonial.length) {
    testimonial.slick({
      dots: false,
      infinite: true,
      speed: 1000,
      autoplay: false,
      loop: true,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrow: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        }
      ]
    });
  }



  /* 6. Nice Selectorp  */
  var nice_Select = $('select');
  if (nice_Select.length) {
    nice_Select.niceSelect();
  }

  /* 7. data-background */
  $("[data-background]").each(function () {
    $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
  });


  /* 10. WOW active */
  new WOW().init();

  // 11. ---- Mailchimp js --------//  
  function mailChimp() {
    $('#mc_embed_signup').find('form').ajaxChimp();
  }
  mailChimp();


  // 12 Pop Up Img
  var popUp = $('.single_gallery_part, .img-pop-up');
  if (popUp.length) {
    popUp.magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  }
  // 12 Pop Up Video
  var popUp = $('.popup-video');
  if (popUp.length) {
    popUp.magnificPopup({
      type: 'iframe'
    });
  }

  /* 13. counterUp*/
  $('.counter').counterUp({
    delay: 10,
    time: 3000
  });
  /*------------------
      CountDown
  --------------------*/
  // Get event date from hidden input
  var eventDateInput = document.getElementById('event-date');
  var timerdate;

  if (eventDateInput) {
    // Parse the date from input value
    var eventDate = new Date(eventDateInput.value);
    // Format date as MM/DD/YYYY
    var dd = String(eventDate.getDate()).padStart(2, '0');
    var mm = String(eventDate.getMonth() + 1).padStart(2, '0');
    var yyyy = eventDate.getFullYear();
    timerdate = mm + '/' + dd + '/' + yyyy;
  } else {
    // Fallback to current date if input not found
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    if (mm == 12) {
      mm = '01';
      yyyy = yyyy + 1;
    } else {
      mm = parseInt(mm) + 1;
      mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end
  }

  // Use this for real timer date
  /*  var timerdate = "2020/01/01"; */

  $("#countdown").countdown(timerdate, function (event) {
    $(this).html(event.strftime("<div class='cd-item'><span>%D</span><p>Days</p> </div>" + "<div class='cd-item'><span>%H</span><p>Hrs</p> </div>" + "<div class='cd-item'><span>%M</span><p>Min</p> </div>" + "<div class='cd-item'><span>%S</span><p>Sec</p> </div>"));
  });




  /* 14. Datepicker */
  $('#datepicker1').datepicker();

  // 15. Time Picker
  $('#timepicker').timepicker();


  function formatDateTime(dateStr) {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  // WISH
  function getWishes({ page = 1, limit = 20 } = {}) {
    var wish = $('.rsvp');
    var theGallery = $('#the-gallery');
    var wishBoxSpinner = $('.wish-box-spinner');
    var wishBoxContent = $('.wish-box-content');
    var pagination = $('#pagination');

    wishBoxSpinner.show();
    wishBoxContent.hide();

    $.ajax({
      url: 'https://wishes-git-master-giap-nguyens-projects.vercel.app/v1/wishes',
      type: 'GET',
      dataType: 'json',
      data: { page, limit },
      timeout: 60000,
      success: function (response) {
        var wishes = response.data || [];
        var meta = response.meta || {};
        if (!!wishes) {
          wishBoxContent.empty();

          wishes.forEach(function (wish) {
            var { name, created_at: createdAt, content } = wish || {};

            wishBoxContent.append(`
              <div class="wish-box-item">
                <p class="name"><strong>${name || ''}</strong></p>
                <p class="time">${formatDateTime(createdAt || '')}</p>
                <p class="content">${content || ''}</p>
              </div>
            `);
          });

          wishBoxSpinner.hide();
          wishBoxContent.show();
        }

        if (!!meta && meta.total_pages > 1) {
          var { current_page: currentPage, total_pages: totalPages } = meta || {};

          pagination.empty();
          pagination.append(`
            <li class="${currentPage === 1 ? 'disabled' : ''}">
              <a
                class="pagination-link prev"
                data-page="${currentPage - 1}"
                data-total-pages="${totalPages}"
              >
                <i class="fa fa-angle-left"></i>
              </a>
            </li>
          `);

          for (let i = 1; i <= totalPages; i++) {
            pagination.append(`
              <li class="${currentPage === i ? 'active' : ''}">
                <a
                  class="pagination-link"
                  data-page="${i}"
                  data-total-pages="${totalPages}"
                >
                  ${i}
                </a>
              </li>
            `);
          }

          pagination.append(`
            <li class="${currentPage === totalPages ? 'disabled' : ''}">
              <a
                class="pagination-link next"
                data-page="${currentPage + 1}"
                data-total-pages="${totalPages}"
              >
                <i class="fa fa-angle-right"></i>
              </a>
            </li>
          `);
        }
      },
      error: function (jqXHR) {
        theGallery.addClass('empty-wish');
        wish.hide();
        console.log('jqXHR :>> ', jqXHR);
      },
    });
  }

  // PAGINATION
  let currentPage = 1;

  $(document).on('click', '.pagination-link', function () {
    var page = $(this).data('page');
    var totalPages = $(this).data('total-pages');

    if (page < 1 || page > totalPages || currentPage === page) return;

    currentPage = page;
    getWishes({ page });
  });

  // ADD WISH
  $(document).on('click', '.btn-wish', function () {
    var $this = $(this);
    $this.prop('disabled', true);

    $.ajax({
      url: 'https://wishes-git-master-giap-nguyens-projects.vercel.app/v1/wishes',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        name: $('#name').val().trim(),
        content: $('#content').val().trim(),
      }),
      success: function () {
        getWishes();
        $('#name').val('');
        $('#content').val('');
      },
      error: function (jqXHR) {
        $this.prop('disabled', false);
        console.log('jqXHR :>> ', jqXHR);
      },
    });
  });

  $(document).on('input', '#name, #content', function () {
    if (!!$('#name').val().trim() && !!$('#content').val().trim()) {
      $('.btn-wish').prop('disabled', false);
    } else {
      $('.btn-wish').prop('disabled', true);
    }
  });

  // GET WISH
  getWishes();


  // ... existing code ...

/* Gallery Carousel */
function initGalleryCarousel() {
  // Load gallery config
  $.getJSON('assets/js/gallery_config.json', function(config) {
    // Clear existing items
    $('.gallery-carousel').empty();
    
    // Add items from config
    config.gallery_items.forEach(function(item) {
      $('.gallery-carousel').append(`
        <div class="gallery-item">
          <img src="${item.src}" loading="lazy" alt="${item.alt}">
        </div>
      `);
    });

    // Initialize carousel
    $('.gallery-carousel').owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: true,
      lazyLoad: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>'
      ],
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    });
  });
}

$(document).ready(function() {
  initGalleryCarousel();
});

// ... existing code ...

})(jQuery);

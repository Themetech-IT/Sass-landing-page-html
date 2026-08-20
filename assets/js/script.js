"use strict";
(function ($) {

  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".theme-btn");

    const setTheme = (theme) => {
      // Handle system mode dynamically
      if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");

        // React to future system changes in real-time
        window.matchMedia("(prefers-color-scheme: dark)").onchange = (e) => {
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        };
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }

      localStorage.setItem("theme", theme);

      buttons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.theme === theme)
      );
    };

    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);

    // Handle click events
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;
        setTheme(theme);
      });
    });
  });

  const billingSwitch = document.getElementById('billingSwitch');
  const monthlyLabel = document.querySelector('.billing-label.monthly');
  const annuallyLabel = document.querySelector('.billing-label.annually');
  const prices = document.querySelectorAll('.price');
  const billingTypeTexts = document.querySelectorAll('.billing-type');

  billingSwitch.addEventListener('change', () => {
    const isMonthly = billingSwitch.checked;

    monthlyLabel.classList.toggle('active', isMonthly);
    annuallyLabel.classList.toggle('active', !isMonthly);

    prices.forEach(price => {
      const newPrice = isMonthly
        ? price.dataset.monthly
        : price.dataset.annually;
      price.textContent = `$${newPrice}`;
    });

    billingTypeTexts.forEach(text => {
      text.textContent = isMonthly ? 'Monthly' : 'Annually';
    });
  });

  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header-area");
    if (window.scrollY > 20) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  $(function () {
    var $client = $('.client-slider');
    var $quote = $('.quote-slider');
    $client.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.quote-slider',
      focusOnSelect: true,
      centerMode: false,
      arrows: true,
      dots: false,
      infinite: true,
      prevArrow: '<button class="slick-prev"><iconify-icon icon="basil:arrow-left-outline"></iconify-icon></button>',
      nextArrow: '<button class="slick-next"><iconify-icon icon="stash:arrow-right-duotone"></iconify-icon></button>',
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 3 } },
        { breakpoint: 576, settings: { slidesToShow: 1 } }
      ]
    });

    // initialize quote slider (main) — append dots into custom container
    $quote.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.client-slider',
      arrows: false,
      dots: false,
      fade: true,
      adaptiveHeight: true,
      autoplay: false
    });
  });

  $(window).on("load", () => $(".custom-preloader").fadeOut());
})(jQuery);
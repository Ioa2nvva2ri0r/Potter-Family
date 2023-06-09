/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Banner
const banner = document.getElementById('banner');
const bannerBox = document.getElementById('banner-animate');
const bannerVideo = document.getElementById('banner-video');

const observerBanner = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      bannerBox.classList.add('active');
      bannerVideo.play();
    } else {
      bannerBox.classList.remove('active');
      bannerVideo.pause();
    }
  },
  {
    threshold: [0.4],
  }
);
observerBanner.observe(bannerBox);

window.addEventListener('load', () => {
  if (window.matchMedia('(max-width: 768px)').matches) {
    const swiperHero = new Swiper('.hero__content-list', {
      slidesPerView: 'auto',
    });
  }
});

// Rates
document.querySelectorAll('.rates__btn').forEach((btn, _, arr) => {
  btn.addEventListener('mouseover', (e) => {
    const thisEl = e.currentTarget;

    [...arr, ...document.querySelectorAll('[data-tab]')].forEach((el) =>
      el.classList.remove('active')
    );
    [thisEl, document.querySelector(`[data-tab='${thisEl.id}']`)].forEach(
      (el) => el.classList.add('active')
    );
  });
});

// Popular
const swiperPopular = new Swiper('.popular__slider', {
  loop: true,
  navigation: {
    nextEl: '.popular__slider-btn-next',
    prevEl: '.popular__slider-btn-prev',
  },
  a11y: {
    prevSlideMessage: 'Назад',
    nextSlideMessage: 'Вперёд',
  },
  speed: 1000,
  breakpoints: {
    768: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
});

const popularTitle = document.getElementById('title-popular');

const observerPopular = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      popularTitle.classList.add('active');
    } else {
      popularTitle.classList.remove('active');
    }
  },
  {
    threshold: [0.4],
  }
);
observerPopular.observe(popularTitle);

// Formats
const swiperFormats = new Swiper('.formats__slider', {
  autoHeight: true,
  speed: 1000,
  breakpoints: {
    768: {
      slidesPerView: 'auto',
      slidesPerGroup: 3,
      spaceBetween: '3.4%',
    },
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
});

// Reviews
const swiperReviews = new Swiper('.reviews__slider', {
  speed: 1000,
  breakpoints: {
    768: {
      slidesPerView: 'auto',
      slidesPerGroup: 2,
      spaceBetween: '30%',
    },
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
  on: {
    setTranslate(swiper, transition) {
      // console.log(swiper);
      // console.log(swiper.snapGrid, swiper.translate, transition);
    },
  },
});

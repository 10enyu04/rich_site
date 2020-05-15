// モバイルブラウザかどうか判定
const isMobile = !!new MobileDetect(window.navigator.userAgent).mobile();


const parallaxXSpeed = 12;
const parallaxYSpeed = 3;
const parallaxXSpeedSmall = 5;
const parallaxYSpeedSmall = 1;

const showParallax = () => {
  const scrollTop = $(window).scrollTop();

  const offsetX = Math.round(scrollTop / parallaxXSpeed);
  const offsetY = Math.round(scrollTop / parallaxYSpeed);
  const offsetXSmall = Math.round(scrollTop / parallaxXSpeedSmall);
  const offsetYSmall = Math.round(scrollTop / parallaxYSpeedSmall);

  $('.puppies').css({
    'background-position':
      // 一番上
      `${-offsetX}px ${-offsetY}px, ${
        // 上から2番目
        offsetXSmall
      }px ${-offsetYSmall}px, `
      // 一番下
      + '0% 0%',
  });

  $('.kittens').css({
    'background-position':
      // 一番上
      `${offsetX}px ${-offsetY}px, ${
        // 上から2番目
        -offsetXSmall
      }px ${-offsetYSmall}px, `
      // 一番下
      + '0% 0%',
  });
};

const initParallax = () => {
  $(window).off("scroll", showParallax);
  if (!isMobile) {
    showParallax();
    $(window).on("scroll", showParallax);
  }
};

const showTab = (tabName) => {
  if ($(`#${tabName}`).is(":visible")) {
    return;
  }

  const tabsContainer = $(`a[href="#${tabName}"]`).closest(".tabs");
  tabsContainer.find(".tabs__menu li").removeClass("active");
  tabsContainer
    .find(`.tabs__menu a[href="#${tabName}"]`)
    .parent("li")
    .addClass("active");
  tabsContainer
    .find(".tabs__content > *")
    .css({ display: "none"});
  tabsContainer
    .find(`#${tabName}, .tabs__content .${tabName}`)
    .css({
      display: "block",
      opacity: 0.7
    })
    .animate({opacity: 1}, 400);
};

$(".animated").waypoint({
  handler(direction) {
    if (direction === "down") {
      $(this.element).addClass("fadeInUp");
      this.destroy();
    }
  },
  offset: "80%"
});

$(window).on("resize", () => {
  initParallax();
});

$(".tabs__menu a").on("click", (e) => {
  const tabName = $(e.currentTarget).attr("href");
  e.preventDefault();
  if (tabName[0] === "#") {
    showTab(tabName.substring(1));
  }
});


$(".nav-link").on("click", (e) => {
  const destination = $(e.target).attr("href");
  e.preventDefault();
  $("html, body").animate({
    scrollTop: $(destination).offset().top
  },1000
  );
  $(".navbar-toggler:visible").trigger("click");
});

$(".d-inline-block").magnificPopup({
  type: "image",
  gallery: {enabled: true},
  mainClass: "mfp-fade",
  removalDelay: 300
});


if (isMobile) {
  $(".top__bg").css({
    "background-image": "url(video/top-video-still.jpg)"
  });
} else {
  $(".top__video").css({ display: "block" });
}

showTab("puppies-1");
showTab("kittens-1");

initParallax();
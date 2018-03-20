import scrollTo from "../_utils/scrollTo";
import getOffsetTop from "../_utils/dom/getOffsetTop";
import { $ } from "../_utils/dom/select";

const mainMenu = $(".main-menu");
const links = mainMenu.querySelectorAll('a[href^="#"]');
const headerHeight = parseInt($(".header__top").offsetHeight);
const duration = 700;
const offset = headerHeight + 20;

Array.prototype.forEach.call(links, link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    const hash = link.getAttribute("href");
    const target = $(hash);

    if (target) {
      let options = { duration };
      const to = getOffsetTop(target) - offset;

      scrollTo({ to, options });

      if (history.pushState) {
        history.pushState(null, null, hash);
      } else {
        location.hash = hash;
      }
    }
  });
});

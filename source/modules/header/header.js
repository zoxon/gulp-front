import { debounce } from "throttle-debounce";
import { $ } from "../_utils/dom/select";

function headerScrollHandler() {
  let top = Math.abs(document.body.getBoundingClientRect().y);
  let fixed = false;

  if (top > 0) {
    fixed = true;
  }

  $(".header").classList.toggle("header_fixed", fixed);
}

window.addEventListener("scroll", debounce(66, headerScrollHandler));

headerScrollHandler();

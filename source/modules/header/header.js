import debounce from "lodash/debounce";
import { $ } from "../_utils/dom/select";

function headerScrollHandler() {
  let top = Math.abs(document.body.getBoundingClientRect().y);
  let fixed = false;

  if (top > 0) {
    fixed = true;
  }

  $(".header").classList.toggle("header_fixed", fixed);
}

window.addEventListener("scroll", debounce(headerScrollHandler, 66));

headerScrollHandler();

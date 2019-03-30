import debounce from "lodash/debounce";
import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";

class Header extends Plugin {
  defaults() {
    return {
      fixedClassName: "header_fixed"
    };
  }

  init() {
    this.headerScrollHandler();
  }

  bindEvents() {
    window.addEventListener(
      "scroll",
      debounce(this.headerScrollHandler.bind(this), 66)
    );
  }

  headerScrollHandler() {
    let top = Math.abs(document.body.getBoundingClientRect().y);
    let fixed = false;

    if (top > 0) {
      fixed = true;
    }

    this.element.classList.toggle(this.options.fixedClassName, fixed);
  }
}

export default init(Header, "header");

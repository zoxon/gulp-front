import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import scrollTo from "@/scripts/helpers/scrollTo";

class ScrollTop extends Plugin {
  defaults() {
    return {
      duration: 700
    };
  }

  bindEvents() {
    this.element.addEventListener("click", event => {
      this.onClickHandler(event);
    });
  }

  onClickHandler(event) {
    event.preventDefault();

    const options = { duration: this.options.duration };
    const to = 0;

    scrollTo({ to, options });
  }
}

export default init(ScrollTop, "scroll-top");

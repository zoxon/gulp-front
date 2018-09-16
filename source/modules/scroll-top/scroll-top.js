import Plugin, { init } from "@/modules/_utils/Plugin";
import scrollTo from "@/modules/_utils/scrollTo";

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

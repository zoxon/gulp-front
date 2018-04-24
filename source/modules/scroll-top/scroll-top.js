import init from "@/modules/_utils/plugin-init";
import scrollTo from "@/modules/_utils/scrollTo";

class ScrollTop {
  constructor(element, options) {
    this.element = element;
    this.name = "scroll-top";

    this._defaults = {
      duration: 700
    };

    this.options = {
      ...options,
      ...this._defaults
    };

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    const plugin = this;
    plugin.element.addEventListener("click", event => {
      plugin.onClickHandler.call(plugin, event);
    });
  }

  onClickHandler(event) {
    event.preventDefault();

    const options = { duration: this.options.duration };
    const to = 0;

    scrollTo({ to, options });
  }
}

export default init(ScrollTop);

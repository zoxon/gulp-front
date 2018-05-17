import Plugin, { init } from "@/modules/_utils/Plugin";
import scrollTo from "@/modules/_utils/scrollTo";

class ScrollTop extends Plugin {
  defaults() {
    return {
      duration: 700
    };
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

export default init(ScrollTop, "scroll-top");

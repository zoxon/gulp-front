import Plugin, { init } from "@/modules/_utils/Plugin";
import hide from "@/modules/_utils/animations/hide";

class Alert extends Plugin {
  defaults() {
    return {
      closeSelector: `[data-alert-close]`
    };
  }

  buildCache() {
    this.close = this.element.querySelector(this.options.closeSelector);
  }

  bindEvents() {
    this.close.addEventListener("click", event => this.onClick(event));
  }

  onClick(event) {
    event.preventDefault();
    hide(this.element);
  }
}

export default init(Alert, "alert");

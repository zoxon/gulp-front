import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import { slideUp } from "slide-anim";

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
    slideUp(this.element);
  }
}

export default init(Alert, "alert");

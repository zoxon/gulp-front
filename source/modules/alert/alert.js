import init from "@/modules/_utils/plugin-init";
import hide from "@/modules/_utils/animations/hide";

class Alert {
  constructor(element, options) {
    this.element = element;
    this.name = "alert";

    this._defaults = {
      closeSelector: `[data-alert-close]`
    };

    this.options = {
      ...this._defaults,
      ...options
    };

    this.init();
  }

  init() {
    this.buildCache();
    this.bindEvents();
  }

  buildCache() {
    this.close = this.element.querySelector(this.options.closeSelector);
  }

  bindEvents() {
    this.close.addEventListener("click", event =>
      this.onClick.call(this, event)
    );
  }

  onClick(event) {
    event.preventDefault();
    hide(this.element);
  }
}

export default init(Alert);

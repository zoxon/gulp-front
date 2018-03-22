import init from "../_utils/plugin-init";
import { createElement } from "../_utils/dom/createElement";

class ProgressBar {
  constructor(element, options) {
    this._defaults = {
      valueAttribute: "data-progress-value",
      barClassName: "progress-bar__bar"
    };

    this.element = element;
    this.options = Object.assign({}, this._defaults, options);

    this.init();
  }

  init() {
    this.buildCache();
    this.setBarWidth();
  }

  buildCache() {
    const { barClassName, valueAttribute } = this.options;

    this.bar = createElement("div", { className: barClassName });
    this.value = this.element.getAttribute(valueAttribute) || 0;
  }

  setBarWidth() {
    this.bar.style.width = this.value * 100 + "%";
    this.element.appendChild(this.bar);
  }
}

export default init(ProgressBar);

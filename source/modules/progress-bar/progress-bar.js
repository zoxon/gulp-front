import init from "@/modules/_utils/plugin-init";
import { createElement } from "@/modules/_utils/dom/createElement";

class ProgressBar {
  constructor(element, options) {
    this._defaults = {
      valueAttribute: "data-progress-value",
      barClassName: "progress-bar__bar"
    };

    this.element = element;
    this.options = {
      ...this._defaults,
      ...options
    };

    this.init();
  }

  init() {
    this.buildCache();
    this.setBarWidth();
  }

  buildCache() {
    const { barClassName, valueAttribute } = this.options;

    this.bar =
      this.element.querySelector(`.${barClassName}`) ||
      this.element.appendChild(
        createElement("div", { className: barClassName })
      );
    this.value = this.element.getAttribute(valueAttribute) || 0;
  }

  setBarWidth() {
    this.bar.style.width = this.value * 100 + "%";
  }
}

export default init(ProgressBar);

import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import { createElement } from "@/scripts/helpers/dom/createElement";

class ProgressBar extends Plugin {
  defaults() {
    return {
      valueAttribute: "data-progress-value",
      barClassName: "progress-bar__bar"
    };
  }

  init() {
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

export default init(ProgressBar, "progress-bar");

import init from "@/modules/_utils/plugin-init";
import { createElement } from "@/modules/_utils/dom/createElement";

class StarRating {
  constructor(element, options) {
    this.element = element;
    this.name = "star-rating";

    this._defaults = {
      maxValueAttribute: "data-raiting-max",
      valueAttribute: "data-raiting-value",
      barClassName: "star-rating__bar"
    };

    this.options = {
      ...this._defaults,
      ...options
    };

    this.init();
  }

  init() {
    this.buildCache();
    this.setContainerWidth();
    this.setBarWidth();
  }

  buildCache() {
    const { barClassName, valueAttribute, maxValueAttribute } = this.options;

    this.bar =
      this.element.querySelector(`.${barClassName}`) ||
      this.element.appendChild(
        createElement("div", { className: barClassName })
      );
    this.value = this.element.getAttribute(valueAttribute) || 0;
    this.max = parseInt(this.element.getAttribute(maxValueAttribute), 10) || 0;
  }

  setContainerWidth() {
    const computed = getComputedStyle(this.element);
    const width = this.max * parseInt(computed.height, 10);
    this.element.style.width = `${width}px`;
  }

  setBarWidth() {
    const starPercentage = this.value / this.max * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    this.bar.style.width = starPercentageRounded;
  }
}

export default init(StarRating);

import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import { createElement } from "@/scripts/helpers/dom/createElement";

class StarRating extends Plugin {
  defaults() {
    return {
      maxValueAttribute: "data-raiting-max",
      valueAttribute: "data-raiting-value",
      barClassName: "star-rating__bar",
      widthMode: "px" // "px" or "%"
    };
  }

  init() {
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

    this.starWidth = this.getStarWidth();

    this.containerWidth = this.getContainerWidth();
  }

  getStarWidth() {
    const computed = getComputedStyle(this.element);
    return parseInt(computed.width, 10);
  }

  getContainerWidth() {
    return this.max * this.starWidth;
  }

  setContainerWidth() {
    this.element.style.width = `${this.containerWidth}px`;
  }

  getBarWidth() {
    if (this.options.widthMode === "%") {
      const starPercentage = (this.value / this.max) * 100;
      return `${Math.round(starPercentage / 10) * 10}%`;
    }

    return this.value > 0 ? this.starWidth * this.value + "px" : 0;
  }

  setBarWidth() {
    this.bar.style.width = this.getBarWidth();
  }
}

export default init(StarRating, "star-rating");

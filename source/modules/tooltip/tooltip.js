import TooltipJS from "tooltip.js";
import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import toArray from "@/scripts/helpers/dom/toArray";

class Tooltip extends Plugin {
  defaults() {
    return {
      // Default options
      boundary: "scrollParent",
      container: false,
      delay: 0,
      html: false,
      placement: this.element.getAttribute("data-tooltip-placement") || "top",
      title: "",
      template: `<div class="tooltip" role="tooltip">
                  <div class="tooltip__arrow"></div>
                  <div class="tooltip__inner"></div>
                </div>`,
      trigger:
        this.element.getAttribute("data-tooltip-trigger") || "hover focus",
      offset: 0,
      arrowSelector: ".tooltip__arrow",
      innerSelector: ".tooltip__inner",

      // My options
      text: this.element.getAttribute("data-tooltip") || "",
      selector: this.element.getAttribute("data-tooltip-selector") || false,
      style: this.element.getAttribute("data-tooltip-style") || "default dark",
      closeSelector: "[data-tooltip-close]"
    };
  }

  init() {
    if (this.hasSelector()) {
      const content = document.querySelector(this.options.selector);
      const hasHtml = content.innerHTML.trim().length > 0;

      if (!content) {
        console.warn(
          `Selector '${this.options.selector}' is empty or does not exist`
        );
      }

      if (!hasHtml) {
        console.warn(`Selector HTML '${this.options.selector}' is empty`);
      }

      this.options = {
        ...this.options,
        html: true,
        title: content.innerHTML
      };
    } else {
      this.options = {
        ...this.options,
        title: this.options.text
      };
    }

    if (this.options.style) {
      const { style } = this.options;
      const styles = style
        .split(" ")
        .map(s => `tooltip_style_${s}`)
        .join(" ");

      this.options.template = `<div class="tooltip ${styles}" role="tooltip">
        <div class="tooltip__arrow"></div>
        <div class="tooltip__inner"></div>
      </div>`;
    }

    this.tooltip = new TooltipJS(this.element, this.options);
  }

  hasSelector() {
    return this.options.selector.length > 0;
  }

  buildCache() {}

  bindEvents() {
    this.element.addEventListener("click", () => this.element.focus());
  }
}

export default init(Tooltip, "tooltip");

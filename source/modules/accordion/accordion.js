import init from "@/modules/_utils/plugin-init";
import toArray from "@/modules/_utils/dom/toArray";

class Accordion {
  constructor(element, options) {
    this.element = element;
    this.name = "accordion";

    this._defaults = {
      itemSelector: `[data-accordion-item]`,
      triggerSelector: `[data-accordion-trigger]`,
      itemActiveAttr: `data-accordion-item`,
      singleOpen: true
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
    this.items = toArray(
      this.element.querySelectorAll(this.options.itemSelector)
    );
  }

  bindEvents() {
    this.items.forEach(item => {
      const trigger = item.querySelector(this.options.triggerSelector);

      trigger.addEventListener("click", event => {
        this.handleTriggerClick.call(this, event, item);
      });
    });
  }

  isOpen(item) {
    return item.getAttribute(this.options.itemActiveAttr) === "true"
      ? true
      : false;
  }

  handleTriggerClick(event, item) {
    event.preventDefault();

    if (this.options.singleOpen) {
      this.items.forEach(item => {
        item.setAttribute(this.options.itemActiveAttr, false);
      });
    }

    item.setAttribute(this.options.itemActiveAttr, !this.isOpen(item));
  }
}

export default init(Accordion);

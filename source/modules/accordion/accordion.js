import Plugin, { init } from "@/modules/_utils/Plugin";
import toArray from "@/modules/_utils/dom/toArray";

class Accordion extends Plugin {
  defaults() {
    return {
      itemSelector: `[data-accordion-item]`,
      triggerSelector: `[data-accordion-trigger]`,
      itemActiveAttr: `data-accordion-item`,
      singleOpen: true
    };
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

  open(item) {
    item.setAttribute(this.options.itemActiveAttr, true);
  }

  close(item) {
    item.setAttribute(this.options.itemActiveAttr, false);
  }

  toggle(item) {
    this.isOpen(item) ? this.close(item) : this.open(item);
  }

  isOpen(item) {
    return item.getAttribute(this.options.itemActiveAttr) === "true"
      ? true
      : false;
  }

  handleTriggerClick(event, item) {
    event.preventDefault();

    if (this.options.singleOpen) {
      this.items.forEach(i => {
        if (i !== item) {
          this.close(i);
        }
      });
    }

    this.toggle(item);
  }
}

export default init(Accordion, "accordion");

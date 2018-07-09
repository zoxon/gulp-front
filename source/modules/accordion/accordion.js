import Plugin, { init } from "@/modules/_utils/Plugin";
import toArray from "@/modules/_utils/dom/toArray";

class Accordion extends Plugin {
  defaults() {
    return {
      itemSelector: `[data-accordion-item]`,
      triggerSelector: `[data-accordion-trigger]`,
      panelSelector: `[data-accordion-panel]`,
      itemActiveAttr: `data-accordion-item-open`,
      singleOpen: true
    };
  }

  buildCache() {
    this.items = toArray(
      this.element.querySelectorAll(this.options.itemSelector)
    ).filter(item => {
      const isDisabled = this.isItemDisabled(item);

      if (isDisabled) {
        this.setItemDisabled(item);
      }

      return !isDisabled;
    });
  }

  isItemDisabled(item) {
    return (
      item.getAttribute("aria-disabled") === "true" ||
      item.hasAttribute("disabled") ||
      false
    );
  }

  getTrigger(item) {
    return item.querySelector(this.options.triggerSelector);
  }

  getPanel(item) {
    return item.querySelector(this.options.panelSelector);
  }

  setItemDisabled(item) {
    const trigger = this.getTrigger(item);

    trigger.setAttribute("disabled", true);
    this.element.setAttribute("aria-disabled", true);
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
    this.toggleVisibility(item, true);
  }

  close(item) {
    this.toggleVisibility(item, false);
  }

  toggleVisibility(item, visibility) {
    const trigger = this.getTrigger(item);
    const panel = this.getPanel(item);

    item.setAttribute(this.options.itemActiveAttr, visibility);
    trigger.setAttribute("aria-expanded", visibility);
    panel.setAttribute("aria-hidden", !visibility);
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

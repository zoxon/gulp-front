import attrs from "attrs";

import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import generateId from "@/scripts/helpers/generateId";
import toArray from "@/scripts/helpers/dom/toArray";

class Offcanvas extends Plugin {
  defaults() {
    return {
      triggerSelector: "[data-offcanvas-trigger]",
      menuSelector: "[data-offcanvas-menu]",
      containerSelector: "[data-offcanvas-container]",
      overlaySelector: "[data-offcanvas-overlay]"
    };
  }

  init() {
    this.setA11yAttributes();
  }

  buildCache() {
    this.triggers = toArray(
      document.querySelectorAll(this.options.triggerSelector)
    );
    this.container = document.querySelector(this.options.containerSelector);
    this.overlay = document.querySelector(this.options.overlaySelector);
    this.menu = document.querySelector(this.options.menuSelector);
  }

  bindEvents() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener("click", () => {
        this.triggerClickHandler();
      });
    });

    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.hide());
    }
  }

  triggerClickHandler() {
    this.toggle();
  }

  toggle() {
    this.isHidden() ? this.show() : this.hide();
  }

  hide() {
    this.menu.setAttribute("aria-hidden", "true");
    this.container.setAttribute("data-offcanvas-hidden", "true");
    this.overlay.setAttribute("data-offcanvas-hidden", "true");
    this.triggers.forEach(trigger => {
      trigger.setAttribute("aria-expanded", "false");
    });
  }

  show() {
    this.menu.setAttribute("aria-hidden", "false");
    this.container.setAttribute("data-offcanvas-hidden", "false");
    this.overlay.setAttribute("data-offcanvas-hidden", "false");
    this.triggers.forEach(trigger => {
      trigger.setAttribute("aria-expanded", "true");
    });
  }

  isHidden() {
    return this.menu.getAttribute("aria-hidden") === "true";
  }

  setA11yAttributes() {
    const id = generateId();

    this.container.setAttribute("data-offcanvas-hidden", "true");

    if (this.menu) {
      attrs(this.menu, {
        role: "dialog",
        tabindex: "-1",
        "aria-hidden": "true",
        id
      });
    }

    if (this.triggers && this.triggers.length > 0) {
      Array.prototype.forEach.call(this.triggers, trigger => {
        attrs(trigger, {
          role: "button",
          "aria-pressed": "false",
          "aria-expanded": "false"
        });
      });
    }
  }
}

export default init(Offcanvas, "offcanvas");

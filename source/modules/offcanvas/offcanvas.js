import init from "@/modules/_utils/plugin-init";
import { $, $$ } from "@/modules/_utils/dom/select";
import generateId from "@/modules/_utils/generateId";
import { mapAttributes } from "@/modules/_utils/dom/attr";
import toArray from "@/modules/_utils/dom/toArray";

class Offcanvas {
  constructor(options) {
    this._defaults = {
      triggerSelector: "[data-offcanvas-trigger]",
      menuSelector: "[data-offcanvas-menu]",
      containerSelector: "[data-offcanvas-container]",
      overlaySelector: "[data-offcanvas-overlay]"
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
    this.setA11yAttributes();
  }

  buildCache() {
    this.triggers = toArray($$(this.options.triggerSelector));
    this.container = $(this.options.containerSelector);
    this.overlay = $(this.options.overlaySelector);
    this.menu = $(this.options.menuSelector);
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
      mapAttributes(this.menu, {
        role: "dialog",
        tabindex: "-1",
        "aria-hidden": "true",
        id
      });
    }

    if (this.triggers && this.triggers.length > 0) {
      Array.prototype.forEach.call(this.triggers, trigger => {
        mapAttributes(trigger, {
          role: "button",
          "aria-pressed": "false",
          "aria-expanded": "false"
        });
      });
    }
  }
}

export default init(Offcanvas);

import init from "../_utils/plugin-init";
import { $, $$ } from "../_utils/dom/select";
import generateId from "../_utils/generateId";
import { mapAttributes } from "../_utils/dom/attr";

class Offcanvas {
  constructor(options) {
    this._defaults = {
      triggerSelector: "[data-offcanvas-trigger]",
      menuSelector: "[data-offcanvas-menu]",
      containerSelector: "[data-offcanvas-container]",
      overlaySelector: "[data-offcanvas-overlay]"
    };
    this.options = Object.assign({}, this._defaults, options);
    this.init();
  }

  init() {
    this.buildCache();
    this.bindEvents();
    this.setA11yAttributes();
  }

  buildCache() {
    this.triggers = $$(this.options.triggerSelector);
    this.container = $(this.options.containerSelector);
    this.overlay = $(this.options.overlaySelector);
    this.menu = $(this.options.menuSelector);
  }

  bindEvents() {
    const plugin = this;

    Array.prototype.forEach.call(this.triggers, trigger => {
      trigger.addEventListener("click", function() {
        plugin.triggerClickHandler.call(plugin);
      });
    });

    this.overlay.addEventListener("click", () => this.hide());
  }

  triggerClickHandler() {
    this.toggle();
  }

  toggle() {
    if (this.isHidden()) {
      this.show();
    } else {
      this.hide();
    }
  }

  hide() {
    this.menu.setAttribute("aria-hidden", "true");
    this.container.setAttribute("data-offcanvas-hidden", "true");
    this.overlay.setAttribute("data-offcanvas-hidden", "true");
    Array.prototype.forEach.call(this.triggers, trigger => {
      trigger.setAttribute("aria-expanded", "false");
    });
  }

  show() {
    this.menu.setAttribute("aria-hidden", "false");
    this.container.setAttribute("data-offcanvas-hidden", "false");
    this.overlay.setAttribute("data-offcanvas-hidden", "false");
    Array.prototype.forEach.call(this.triggers, trigger => {
      trigger.setAttribute("aria-expanded", "true");
    });
  }

  isHidden() {
    return this.menu.getAttribute("aria-hidden") === "true";
  }

  setA11yAttributes() {
    const id = generateId();

    this.container.setAttribute("data-offcanvas-hidden", "true");

    mapAttributes(this.menu, {
      role: "dialog",
      tabindex: "-1",
      "aria-hidden": "true",
      id
    });

    Array.prototype.forEach.call(this.triggers, trigger => {
      mapAttributes(trigger, {
        role: "button",
        "aria-pressed": "false",
        "aria-expanded": "false"
      });
    });
  }
}

export default init(Offcanvas);

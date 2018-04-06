import is from "is_js";

import init from "../_utils/plugin-init";
import { mapAttributes } from "../_utils/dom/attr";
import { KEYCODES } from "../_utils/constants";

class Dropdown {
  constructor(element, options) {
    this.element = element;
    this.name = "dropdown";

    this._defaults = {
      outerClickClose: true,
      menuClickClose: true,
      class: {
        base: "dropdown",
        open: "dropdown_open",
        disabled: "dropdown_disabled"
      }
    };

    this.options = {
      ...options,
      ...this._defaults
    };

    this.init();
  }

  init() {
    this.buildCache();
    this.setA11yAttrs();

    if (this.isDisabled()) {
      this.setDisabledState();
    } else {
      this.bindEvents();
    }
  }

  buildCache() {
    this.trigger = this.element.querySelector('[data-dropdown-role="trigger"]');
    this.dropMenu = this.element.querySelector(
      '[data-dropdown-role="drop-menu"]'
    );
    this.focusableElements = this.dropMenu.querySelectorAll(
      "*[tabindex], a[href]"
    );
    this.selected = 0;
    this.triggerId = `${this.name}_trigger_this.options.count`;
  }

  bindEvents() {
    const plugin = this;

    this.trigger.addEventListener("click", event => {
      this.toggle.call(this, event);
    });

    [plugin.trigger, this.focusableElements].forEach(elementSet => {
      let _elementSet = is.domNode(elementSet) ? [elementSet] : elementSet;

      Array.prototype.forEach.call(_elementSet, element =>
        element.addEventListener("keydown", function(event) {
          plugin.handleKeydown.call(plugin, event);
        })
      );
    });

    this.dropMenu.addEventListener("click", () => {
      if (this.options.menuClickClose) {
        this.close();
      }
    });

    document.addEventListener("click", event => {
      this.outerClickHandler.call(this, event);
    });
  }

  open() {
    if (!this.isOpen()) {
      this.element.classList.add(this.options.class.open);
      this.trigger.setAttribute("aria-expanded", true);
    }
  }

  close() {
    this.element.classList.remove(this.options.class.open);
    this.trigger.setAttribute("aria-expanded", false);
  }

  isOpen() {
    return this.element.classList.contains(this.options.class.open);
  }

  isDisabled() {
    return this.element.classList.contains(this.options.class.disabled);
  }

  toggle() {
    this.isOpen() ? this.close() : this.open();
  }

  outerClickHandler(event) {
    if (this.options.outerClickClose && this.isOpen()) {
      const isClickInside = this.element.contains(event.target);
      if (!isClickInside) {
        this.close();
      }
    }
  }

  handleKeydown(event) {
    const focusableLength = this.focusableElements.length;
    const which = event.which;

    if (this.isDisabled()) {
      return;
    }

    if (which === KEYCODES.ESC) {
      this.trigger.focus();
      this.close();
      return;
    }

    switch (which) {
      case KEYCODES.ENTER:
      case KEYCODES.SPACE:
        this.close();
        break;

      case KEYCODES.UP_ARROW:
      case KEYCODES.LEFT_ARROW:
        event.preventDefault();
        this.open();

        if (this.selected === 0) {
          this.selected = focusableLength - 1;
        } else {
          this.selected--;
        }
        break;

      case KEYCODES.DOWN_ARROW:
      case KEYCODES.RIGHT_ARROW:
        event.preventDefault();
        this.open();

        if (this.selected === focusableLength - 1) {
          this.selected = 0;
        } else {
          this.selected++;
        }

        break;
    }

    this.focusableElements[this.selected].focus();
  }

  setA11yAttrs() {
    mapAttributes(this.trigger, {
      "aria-haspopup": true,
      "aria-expanded": false,
      id: this.triggerId
    });

    this.dropMenu.setAttribute("aria-labelledby", this.triggerId);
  }

  setDisabledState() {
    this.element.setAttribute("aria-disabled", true);
    this.trigger.setAttribute("disabled", true);
  }

  callback(name) {
    const cb = this.options[name];

    if (typeof cb === "function") {
      cb.call(this.element);
    }
  }
}

export default init(Dropdown);

import Plugin, { init } from "@/modules/_utils/Plugin";
import { mapAttributes } from "@/modules/_utils/dom/attr";
import { KEYCODES } from "@/modules/_utils/constants";
import toArray from "@/modules/_utils/dom/toArray";
import generateId from "@/modules/_utils/generateId";

class Dropdown extends Plugin {
  defaults() {
    return {
      outerClickClose: true,
      menuClickClose: true,
      triggerSelector: `[data-dropdown-trigger]`,
      menuSelector: `[data-dropdown-menu]`,
      focusableElements: "*[tabindex], a[href]",
      menuOpenAttribute: "data-dropdown-open"
    };
  }

  init() {
    this.setA11yAttrs();

    if (this.isDisabled()) {
      this.setDisabledState();
    }
  }

  buildCache() {
    const { triggerSelector, menuSelector, focusableElements } = this.options;

    this.trigger = this.element.querySelector(triggerSelector);
    this.dropMenu = this.element.querySelector(menuSelector);
    this.focusableElements = toArray(
      this.dropMenu.querySelectorAll(focusableElements)
    );
    this.selected = 0;
    this.triggerId = `_${generateId()}`;
  }

  bindEvents() {
    this.trigger.addEventListener("click", event => {
      this.toggle.call(this, event);
    });

    const targets = [this.trigger, ...this.focusableElements];

    targets.forEach(element => {
      element.addEventListener("keydown", event => {
        this.handleKeydown.call(this, event);
      });
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
      this.element.setAttribute(this.options.menuOpenAttribute, true);
      this.trigger.setAttribute("aria-expanded", true);
    }
  }

  close() {
    this.element.setAttribute(this.options.menuOpenAttribute, false);
    this.trigger.setAttribute("aria-expanded", false);
  }

  isOpen() {
    return this.element.getAttribute(this.options.menuOpenAttribute) === "true";
  }

  isDisabled() {
    return (
      this.element.getAttribute("aria-disabled") === "true" ||
      this.element.hasAttribute("disabled") ||
      false
    );
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
    this.element.setAttribute(this.options.menuOpenAttribute, false);

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
}

export default init(Dropdown, "dropdown");

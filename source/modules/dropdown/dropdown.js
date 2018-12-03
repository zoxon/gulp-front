import Popper from "popper.js";
import attrs from "attrs";

import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import { KEYCODES } from "@/scripts/helpers/constants";
import toArray from "@/scripts/helpers/dom/toArray";
import generateId from "@/scripts/helpers/generateId";
import { isDomNode } from "@/scripts/helpers/is";

class Dropdown extends Plugin {
  defaults() {
    return {
      outerClickClose: true,
      menuClickClose: true,
      triggerSelector: `[data-dropdown-trigger]`,
      menuSelector: `[data-dropdown-menu]`,
      focusableElements: "*[tabindex], a[href]",
      menuOpenAttribute: "data-dropdown-open",
      /**
       * Position a dropdown menu relatively
       * https://popper.js.org/popper-documentation.html#referenceObject
       * self - dropdown wrapper
       * parent - parent element
       * HTMLElement - any element
       */
      reference: "self",

      // https://popper.js.org/popper-documentation.html#Popper.Defaults.placement
      placement: "bottom"
    };
  }

  init() {
    this.setA11yAttrs();
    this.initPopper();

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
      this.toggle(event);
    });

    const targets = [this.trigger, ...this.focusableElements];

    targets.forEach(element => {
      element.addEventListener("keydown", event => {
        this.handleKeydown(event);
      });
    });

    this.dropMenu.addEventListener("click", () => {
      if (this.options.menuClickClose) {
        this.close();
      }
    });

    document.addEventListener("click", event => {
      this.outerClickHandler(event);
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

      default:
        break;
    }

    this.focusableElements[this.selected].focus();
  }

  setA11yAttrs() {
    this.element.setAttribute(this.options.menuOpenAttribute, false);

    attrs(this.trigger, {
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

  initPopper() {
    const { placement, reference } = this.options;
    this.referenceElement = this.element;

    if (reference === "parent") {
      this.referenceElement = this.element.parentNode;
    } else if (isDomNode(reference)) {
      this.referenceElement = reference;
    }

    this.popper = new Popper(this.referenceElement, this.dropMenu, {
      placement
    });
  }
}

export default init(Dropdown, "dropdown");

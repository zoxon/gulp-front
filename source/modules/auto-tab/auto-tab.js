import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import { KEYCODES } from "@/scripts/helpers/constants";
import toArray from "@/scripts/helpers/dom/toArray";

class AutoTab extends Plugin {
  defaults() {
    return {
      targetSelector: "input"
    };
  }

  buildCache() {
    const { targetSelector } = this.options;
    this.targets = toArray(this.element.querySelectorAll(targetSelector));
    this.selected = 0;
  }

  bindEvents() {
    this.targets.forEach(target => {
      target.addEventListener("keyup", event => this.handleKeydown(event));
      target.addEventListener("focus", event => this.handleFocusIn(event));
      target.addEventListener("blur", event => this.handleFocusOut(event));
    });
  }

  getElementOrderFromSet(elements = [], target) {
    let result = -1;
    elements.forEach((el, index) => {
      if (el === target) {
        result = index + 1;
      }
    });

    return result;
  }

  handleFocusIn(event) {
    const input = event.target;
    const index = this.getElementOrderFromSet(this.targets, input);
    this.selected = index - 1;
  }

  handleFocusOut() {
    this.selected = 0;
  }

  handleKeydown(event) {
    let first = 0;
    let last = this.targets.length - 1;
    const input = event.target;
    const inputLength = input.value.length;
    const keyCode = event.which || event.keyCode;
    const max = input.maxLength.valueOf();

    if (keyCode !== KEYCODES.TAB && keyCode !== KEYCODES.SHIFT) {
      if (keyCode === KEYCODES.DELETE || keyCode === KEYCODES.BACKSPACE) {
        if (inputLength === 0) {
          if (this.selected === first) {
            this.selected = last;
          } else {
            this.selected--;
          }
        }
      } else {
        if (inputLength === max) {
          if (this.selected >= last) {
            this.selected = first;
          } else {
            this.selected++;
          }
        }
      }
    }

    this.targets[this.selected].focus();
  }
}

export default init(AutoTab, "autotab");

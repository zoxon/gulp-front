import init from "../_utils/plugin-init";
import { createElement } from "../_utils/dom/createElement";

class InputPassword {
  constructor(element, options) {
    this.element = element;
    this.name = "input-password";

    this._defaults = {
      buttonClassName: "input__show-password",
      buttonText: "Toggle password visibility",
      buttonAdditionalClassNames: ["button"],
      buttonToggleAttribute: "data-input-password-showed",
      mode: "click"
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
    this.renderButton();
    this.addInitedClassName();
  }

  buildCache() {
    const {
      buttonClassName,
      buttonAdditionalClassNames,
      buttonText
    } = this.options;
    this.button = createElement(
      "button",
      {
        type: "button",
        className: [buttonClassName, ...buttonAdditionalClassNames].join(" ")
      },
      createElement("span", { className: "visuallyhidden" }, buttonText)
    );

    this.input = this.element.querySelector("input");
  }

  bindEvents() {
    this.button.addEventListener("click", () => this.handleClick());
  }

  handleClick() {
    const type = this.input.getAttribute("type");
    const isPassword = type === "password";

    this.input.setAttribute("type", isPassword ? "text" : "password");
    this.button.setAttribute(this.options.buttonToggleAttribute, isPassword);
  }

  renderButton() {
    this.element.appendChild(this.button);
    this.button.setAttribute(this.options.buttonToggleAttribute, false);
  }

  addInitedClassName() {
    this.element.classList.add(`${this.name}_inited`);
  }
}

export default init(InputPassword);

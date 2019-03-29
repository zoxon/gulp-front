import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import { createElement } from "@/scripts/helpers/dom/createElement";

class InputPassword extends Plugin {
  defaults() {
    return {
      buttonClassName: "textfield__show-password",
      buttonText: "Toggle password visibility",
      buttonAdditionalClassNames: ["button"],
      buttonToggleAttribute: "data-input-password-showed",
      mode: "click"
    };
  }

  init() {
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

export default init(InputPassword, "input-password");

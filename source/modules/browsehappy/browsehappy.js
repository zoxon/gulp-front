import hide from "../_utils/animations/hide";
import cookie from "js-cookie";

export default class Browsehappy {
  constructor(element, options) {
    this.element = element;
    this.name = "browsehappy";

    this._defaults = {
      single: true,
      cookeName: "browsehappy-showed",
      cookeExpires: 7
    };

    this.options = {
      ...options,
      ...this._defaults
    };

    this.init();
  }

  init() {
    this.bindEvents();

    if (this.options.single && !this.isShowed) {
      this.element.style.display = "block";
    }
  }

  bindEvents() {
    this.element.addEventListener("click", event =>
      this.onClick.call(this, event)
    );
    this.isShowed = cookie.get(this.options.cookeName) || false;
  }

  onClick(event) {
    if (event.target.tagName.toUpperCase() === "A") {
      return false;
    }

    hide(this.element);
    cookie.set(this.options.cookeName, "true", {
      expires: this.options.cookeExpires
    });
  }
}

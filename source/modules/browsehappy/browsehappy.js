import init from "@/modules/_utils/plugin-init";
import hide from "@/modules/_utils/animations/hide";
import cookie from "js-cookie";

class Browsehappy {
  constructor(element, options) {
    this.element = element;
    this.name = "browsehappy";

    this._defaults = {
      showOnce: true,
      cookeName: "browsehappy-showed",
      cookeExpires: 7
    };

    this.options = {
      ...this._defaults,
      ...options
    };

    this.init();
  }

  init() {
    this.bindEvents();

    if (this.options.showOnce && !this.isShowed) {
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

export default init(Browsehappy);

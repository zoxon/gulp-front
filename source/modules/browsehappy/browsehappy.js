import Plugin, { init } from "@/modules/_utils/Plugin";
import hide from "@/modules/_utils/animations/hide";
import cookie from "js-cookie";

class Browsehappy extends Plugin {
  defaults() {
    return {
      showOnce: true,
      cookeName: "browsehappy-showed",
      cookeExpires: 7
    };
  }

  init() {
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

export default init(Browsehappy, "browsehappy");

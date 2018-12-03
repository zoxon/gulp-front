import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import { slideUp } from "slide-anim";
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
    this.element.addEventListener("click", event => this.onClick(event));
    this.isShowed = cookie.get(this.options.cookeName) || false;
  }

  onClick(event) {
    if (event.target.tagName.toUpperCase() === "A") {
      return false;
    }

    slideUp(this.element);
    cookie.set(this.options.cookeName, "true", {
      expires: this.options.cookeExpires
    });
  }
}

export default init(Browsehappy, "browsehappy");

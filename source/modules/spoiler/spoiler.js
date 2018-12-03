import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import generateId from "@/scripts/helpers/generateId";
import getHiddenElementHeight from "@/scripts/helpers/getHiddenElementHeight";
import toArray from "@/scripts/helpers/dom/toArray";

class Spoiler extends Plugin {
  defaults() {
    return {
      targetAttribute: "data-spoiler-target",
      idAttribute: "data-spoiler-id"
    };
  }

  buildCache() {
    this.triggers = toArray(
      document.querySelectorAll(`[${this.options.targetAttribute}]`)
    );
  }

  bindEvents() {
    const plugin = this;
    const { targetAttribute, idAttribute } = this.options;

    this.triggers.forEach(trigger => {
      const targetId = trigger.getAttribute(targetAttribute);
      const target = document.querySelector(`[${idAttribute}="${targetId}"]`);

      plugin.hide(target);
      plugin.setIds({ target, trigger });
      plugin.setMaxHeigth(target);

      trigger.addEventListener("click", () => {
        plugin.triggerClickHandler(target);
      });
    });
  }

  setIds({ target, trigger }) {
    const id = `_${generateId()}`;
    target.setAttribute("aria-labelledby", id);
    trigger.setAttribute("id", id);
  }

  setMaxHeigth(target) {
    const height = getHiddenElementHeight(target) + "px";
    target.style.maxHeight = height;
  }

  triggerClickHandler(target) {
    this.toggle(target);
  }

  hide(target) {
    target.setAttribute("aria-hidden", "true");
    this.triggers.forEach(trigger => {
      trigger.setAttribute("aria-expanded", "false");
    });
  }

  show(target) {
    target.setAttribute("aria-hidden", "false");
    this.triggers.forEach(trigger => {
      trigger.setAttribute("aria-expanded", "true");
    });
  }

  isHidden(target) {
    return target.getAttribute("aria-hidden") === "true";
  }

  toggle(target) {
    this.isHidden(target) ? this.show(target) : this.hide(target);
  }
}

export default init(Spoiler, "spoiler");

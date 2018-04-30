import init from "@/modules/_utils/plugin-init";
import { $, $$ } from "@/modules/_utils/dom/select";
import generateId from "@/modules/_utils/generateId";
import getHiddenElementHeight from "@/modules/_utils/getHiddenElementHeight";
import toArray from "@/modules/_utils/dom/toArray";

class Spoiler {
  constructor(options) {
    this._defaults = {
      targetAttribute: "data-spoiler-target",
      idAttribute: "data-spoiler-id"
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
  }

  buildCache() {
    this.triggers = toArray($$(`[${this.options.targetAttribute}]`));
  }

  bindEvents() {
    const plugin = this;
    const { targetAttribute, idAttribute } = this.options;

    this.triggers.forEach(trigger => {
      const targetId = trigger.getAttribute(targetAttribute);
      const target = $(`[${idAttribute}="${targetId}"]`);

      plugin.hide(target);
      plugin.setIds({ target, trigger });
      plugin.setMaxHeigth(target);

      trigger.addEventListener("click", () => {
        plugin.triggerClickHandler.call(plugin, target);
      });
    });
  }

  setIds({ target, trigger }) {
    const id = "_" + generateId();
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

export default init(Spoiler);

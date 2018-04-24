import init from "@/modules/_utils/plugin-init";
import { $, $$ } from "@/modules/_utils/dom/select";
import generateId from "@/modules/_utils/generateId";
import getHiddenElementHeight from "@/modules/_utils/getHiddenElementHeight";

class Spoiler {
  constructor(options) {
    this._defaults = {
      targetAttribute: "data-spoiler-target",
      idAttribute: "data-spoiler-id"
    };

    this.options = Object.assign({}, this._defaults, options);

    this.init();
  }

  init() {
    this.buildCache();
    this.bindEvents();
  }

  buildCache() {
    this.triggers = $$(`[${this.options.targetAttribute}]`);
  }

  bindEvents() {
    const plugin = this;
    const { targetAttribute, idAttribute } = this.options;

    Array.prototype.forEach.call(this.triggers, trigger => {
      const targetId = trigger.getAttribute(targetAttribute);
      const target = $(`[${idAttribute}="${targetId}"]`);

      plugin.hide({ target, trigger });
      plugin.setIds({ target, trigger });
      plugin.setMaxHeigth(target);

      trigger.addEventListener("click", function() {
        plugin.triggerClickHandler.call(plugin, { target, trigger });
      });
    });
  }

  setIds({ target, trigger }) {
    const id = generateId();
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

  hide({ target, trigger }) {
    target.setAttribute("aria-hidden", "true");
    trigger.setAttribute("aria-expanded", "false");
  }

  show({ target, trigger }) {
    target.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
  }

  isHidden(target) {
    return target.getAttribute("aria-hidden") === "true";
  }

  toggle({ target, trigger }) {
    if (this.isHidden(target)) {
      this.show({ target, trigger });
    } else {
      this.hide({ target, trigger });
    }
  }
}

export default init(Spoiler);

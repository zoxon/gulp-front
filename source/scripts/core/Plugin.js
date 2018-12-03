import deepMerge from "@/scripts/helpers/deepMerge";
import EventsBus from "./EventsBus";

const events = new EventsBus();

export default class Plugin {
  constructor(element, options, name) {
    this.name = name;
    this.element = element;
    this.options = options;
    this.events = events;

    if (!this.isInited()) {
      this._init();
    }
  }

  _init() {
    this.mergeOptions();
    this.buildCache();
    this.bindEvents();
    this.setInited();
    this.init();
  }

  mergeOptions() {
    this.options = deepMerge(this.defaults(), this.options);
  }

  defaults() {
    return {};
  }

  init() {}

  buildCache() {}

  bindEvents() {}

  setInited() {
    this.element.setAttribute(`data-${this.name}-inited`, true);
  }

  isInited() {
    return (
      this.element.hasAttribute(`data-${this.name}-inited`) ||
      this.element.getAttribute(`data-${this.name}-inited`) ||
      false
    );
  }

  callback(name, ...params) {
    const cb = this.options[name];

    if (typeof cb === "function") {
      return cb.call(...params);
    }
  }
}

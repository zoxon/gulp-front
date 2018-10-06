import deepMerge from "@/modules/_utils/deepMerge";
import { isDomNode, isString, isArray } from "@/modules/_utils/is";
import toArray from "@/modules/_utils/dom/toArray";

export default class Plugin {
  constructor(element, options, name) {
    this.name = name;
    this.element = element;
    this.options = options;

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
}

export function init(Plugin, name = "plugin") {
  return function _init(selector, options = {}) {
    console.log({ selector });

    const initByElement = element => [new Plugin(element, options, name)];
    const initByString = selector =>
      toArray(document.querySelectorAll(selector)).map(initByElement);

    if (isString(selector) && selector.length > 0) {
      return initByString(selector);
    }

    if (isDomNode(selector)) {
      return initByElement(selector);
    }

    if (isArray(selector)) {
      selector.forEach(item => {
        _init(item, options);
      });
    }

    return initByElement(document.body);
  };
}

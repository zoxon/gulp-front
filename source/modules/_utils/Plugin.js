import deepMerge from "@/modules/_utils/deepMerge";
import {
  isDomNode,
  isString,
  isArray,
  isUndefined,
  isNull
} from "@/modules/_utils/is";
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

  callback(name, ...params) {
    const cb = this.options[name];
    console.log(cb);
    if (typeof cb === "function") {
      return cb.call(...params);
    }
  }
}

export function init(Plugin, name = "plugin") {
  return (_selectors, options = {}) => {
    const getSelector = selector => {
      if (isUndefined(selector) || isNull(selector)) {
        return [document.body];
      }

      if (isArray(selector)) {
        return selector;
      }

      return [selector];
    };

    const selectors = getSelector(_selectors);
    let instances = [];

    selectors.forEach(selector => {
      if (selector && isString(selector)) {
        const elements = toArray(document.querySelectorAll(selector));
        elements.forEach(element => {
          instances.push(new Plugin(element, options, name));
        });
      }

      if (isDomNode(selector)) {
        instances.push(new Plugin(selector, options, name));
      }
    });

    return instances;
  };
}

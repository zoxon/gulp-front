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
    this.options = Object.assign({}, this.defaults(), this.options);
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
  return function(selector, options = {}) {
    let elements = document.documentElement;

    if (selector) {
      elements = document.querySelectorAll(selector);

      return [].map.call(elements, element => {
        return new Plugin(element, options, name);
      });
    }

    return new Plugin(document.body, options, name);
  };
}

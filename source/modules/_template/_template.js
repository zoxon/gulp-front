import init from "../_utils/plugin-init";

class Plugin {
  constructor(element, options) {
    this.element = element;
    this.name = "plugin";

    this._defaults = {};

    this.options = {
      ...options,
      ...this._defaults
    };

    this.init();
  }

  init() {
    this.buildCache();
    this.bindEvents();
  }

  buildCache() {}

  bindEvents() {
    const plugin = this;
  }
}

export default init(Plugin);

import init from "../_utils/plugin-init";

class #{blockname.pascalCase} {
  constructor(element, options) {
    this.element = element;
    this.name = "#{blockname.dashCase}";

    this._defaults = {};

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

  buildCache() {}

  bindEvents() {}
}

export default init(#{blockname.pascalCase});

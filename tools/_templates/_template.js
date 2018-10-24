import Plugin, { init } from "@/modules/_utils/Plugin";

class #{blockname.pascalCase} extends Plugin {
  defaults() {
    return {};
  }

  init() {}

  buildCache() {}

  bindEvents() {}
}

export default init(#{blockname.pascalCase}, "#{blockname.paramCase}");

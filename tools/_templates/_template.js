import Plugin, { init } from "@/scripts/helpers/Plugin";

class #{blockname.pascalCase} extends Plugin {
  defaults() {
    return {};
  }

  init() {}

  buildCache() {}

  bindEvents() {}
}

export default init(#{blockname.pascalCase}, "#{blockname.paramCase}");

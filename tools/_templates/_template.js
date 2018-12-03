import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";

class #{blockname.pascalCase} extends Plugin {
  defaults() {
    return {};
  }

  init() {}

  buildCache() {}

  bindEvents() {}
}

export default init(#{blockname.pascalCase}, "#{blockname.paramCase}");

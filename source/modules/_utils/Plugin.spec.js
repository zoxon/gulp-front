import { init } from "./Plugin";

class TestPluginClass {
  constructor(element, options, name) {
    this.name = name;
    this.element = element;
    this.options = options;
  }
}

describe("`init` helper", () => {
  let TestPlugin;
  beforeEach(() => {
    document.body.innerHTML = `<div class="test">test</div>`;
    const name = "test-plugin";
    TestPlugin = init(TestPluginClass, name);
  });

  it("should return new plugin instance", () => {
    const plugin = TestPlugin();
    expect(plugin[0]).toBeInstanceOf(TestPluginClass);
  });

  describe("should set element to `document.body`", () => {
    test("when selector not set", () => {
      const plugin = TestPlugin();
      expect(plugin[0].element).toEqual(document.body);
    });

    test("when selector is string", () => {
      const selector = ".test";
      const pluginElement = document.querySelector(selector);

      const plugin = TestPlugin(selector);
      expect(plugin[0].element).toEqual(pluginElement);
    });

    test("when selector is empty string", () => {
      const plugin = TestPlugin("");
      expect(plugin[0].element).toEqual(document.body);
    });

    test("when selector is HTMLElement", () => {
      const pluginElement = document.querySelector(".test");
      const plugin = TestPlugin(pluginElement);
      expect(plugin[0].element).toEqual(pluginElement);
    });
  });
});

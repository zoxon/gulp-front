import init from "./init";

class TestPluginClass {
  constructor(element, options, name) {
    this.name = name;
    this.element = element;
    this.options = options;
  }
}

describe("`init` helper", () => {
  let TestPlugin = {};
  beforeEach(() => {
    document.body.innerHTML = `<div class="test test_1">test</div>
    <div class="test test_2">test</div>
    <div class="test test_3">test</div>`;
    const name = "test-plugin";
    TestPlugin = init(TestPluginClass, name);
  });

  test("should return new plugin instance", () => {
    const plugin = TestPlugin();

    expect(plugin).toHaveLength(1);
    expect(plugin[0]).toBeInstanceOf(TestPluginClass);
  });

  test("when selector not set", () => {
    const plugin = TestPlugin();
    expect(plugin).toHaveLength(1);
    expect(plugin[0].element).toEqual(document.body);
  });

  describe("when selector type", () => {
    test("string", () => {
      const selector = ".test";
      const plugin = TestPlugin(selector);

      expect(plugin).toHaveLength(3);
      expect(plugin[0].element.className).toEqual("test test_1");
      expect(plugin[1].element.className).toEqual("test test_2");
      expect(plugin[2].element.className).toEqual("test test_3");
    });

    test("array of string", () => {
      const plugin = TestPlugin(["", ".test_1", ".test_2"]);

      expect(plugin).toHaveLength(2);
      expect(plugin[0].element.className).toEqual("test test_1");
      expect(plugin[1].element.className).toEqual("test test_2");
    });

    test("array of HTMLElements", () => {
      const test1 = document.querySelector(".test_1");
      const test2 = document.querySelector(".test_2");
      const plugin = TestPlugin([test1, test2]);

      expect(plugin).toHaveLength(2);
      expect(plugin[0].element).toEqual(test1);
      expect(plugin[1].element).toEqual(test2);
      // expect(plugin[2].element).toEqual(document.body);
    });

    test("HTMLElement", () => {
      const pluginElement = document.querySelector(".test");
      const plugin = TestPlugin(pluginElement);
      expect(plugin[0].element).toEqual(pluginElement);
    });
  });

  describe("when selector is", () => {
    test("empty string", () => {
      const plugin = TestPlugin("");
      expect(plugin).toEqual([]);
    });

    test("empty array", () => {
      const plugin = TestPlugin([]);
      expect(plugin).toEqual([]);
    });

    test("array of empty strings", () => {
      const plugin = TestPlugin(["", ""]);
      expect(plugin).toEqual([]);
    });

    test("undefined", () => {
      const plugin = TestPlugin(undefined);
      expect(plugin[0].element).toEqual(document.body);
    });

    test("null", () => {
      const plugin = TestPlugin(null);
      expect(plugin[0].element).toEqual(document.body);
    });
  });
});

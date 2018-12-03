import Plugin from "./Plugin";

class TestPluginClass {
  constructor(element, options, name) {
    this.name = name;
    this.element = element;
    this.options = options;
  }
}

describe("Plugin class", () => {
  let element;
  beforeEach(() => {
    document.body.innerHTML = `<div class="test">test</div>`;
    element = document.querySelector(".test");
  });

  describe("constructor", () => {
    test("create instance", () => {
      const name = "plugin";
      const options = { test: true };
      const plugin = new Plugin(element, options, name);

      expect(plugin.name).toEqual(name);
      expect(plugin.element).toEqual(element);
      expect(plugin.options).toEqual(options);
    });
  });

  describe("methods", () => {
    test("setInited", () => {
      const name = "plugin";
      const options = {};
      const plugin = new Plugin(element, options, name);

      expect(element.hasAttribute(`data-${name}-inited`)).toBeTruthy();
    });

    test("isInited", () => {
      const name = "plugin";
      const options = {};
      const plugin = new Plugin(element, options, name);

      expect(plugin.isInited()).toBeTruthy();
    });

    test("callback", () => {
      let callback1WasCall = false;
      const name = "plugin";
      const options = {
        callback1() {
          callback1WasCall = true;
        },
        callback2: {}
      };
      const plugin = new Plugin(element, options, name);
      plugin.callback("callback1");
      plugin.callback("callback2");
      plugin.callback("callback3");
      expect(callback1WasCall).toBeTruthy();
    });
  });
});

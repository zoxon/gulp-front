import siblings from "../_utils/dom/siblings";
import simulate from "../_utils/event/simulate";

let KEYCODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  HOME: 36,
  END: 35,
  ENTER: 13,
  SPACE: 32
};

export default class Tabs {
  constructor(element, options) {
    this.element = element;
    this.name = "tabs";
    this.count = (Tabs.count || 0) + 1;

    this._defaults = {
      activeTabClassName: "tabs__tab_active",
      activePanelClassName: "tabs__panel_active",
      descriptionSelector: "[data-tabs-description]",
      preloaderSelector: "[data-tabs-preloader]",
      tabsIdAttrName: "data-tab-id",
      panelsIdAttrName: "data-panel-id",
      tabsNameAttrName: "data-tabs-name"
    };

    this.options = {
      ...options,
      ...this._defaults
    };

    this.init();
  }

  init() {
    this.buildCache();
    this.bindEvents();

    this.setA11yAttrs();

    this.hidePreloader();
    this.open(this.tabsName, this.firstTabId);

    this.firstTab.setAttribute("aria-describedby", this.descId);
  }

  buildCache() {
    this.tabsName = this.element.getAttribute(this.options.tabsNameAttrName);
    this.tabs = this.element.querySelectorAll(
      "[" + this.options.tabsIdAttrName + "]"
    );
    this.firstTab = this.tabs[0];
    this.firstTabId = this.firstTab.getAttribute(this.options.tabsIdAttrName);
    this.panels = this.element.querySelectorAll(
      "[" + this.options.panelsIdAttrName + "]"
    );
    this.panelId = this.name + "__panel_index-" + this.count;
    this.preloader = this.element.querySelector(this.options.preloaderSelector);
    this.description = this.element.querySelector(
      this.options.descriptionSelector
    );
    this.descId =
      this.name + "__description_index-" + Math.ceil(Math.random() * 1000);
    this.triggerId = this.name + "__trigger_index-" + this.count;
    this.selected = 0;
  }

  bindEvents() {
    let plugin = this;

    ["hashchange", "onpopstate"].forEach(eventName => {
      window.addEventListener(eventName, () => {
        plugin.onHashchangeHandler.call(plugin);
      });

      simulate(eventName, window);
    });

    ["focus", "click"].forEach(eventName => {
      Array.prototype.forEach.call(plugin.tabs, tab => {
        tab.addEventListener(eventName, event => {
          event.preventDefault();

          let id = event.target.getAttribute(this.options.tabsIdAttrName);
          plugin.open(plugin.tabsName, id);

          window.location.hash = plugin.tabsName + "__" + id;
        });
      });
    });

    Array.prototype.forEach.call(plugin.tabs, tab => {
      tab.addEventListener("keydown", event => {
        plugin.handleKeydown.call(plugin, event);
      });
    });
  }

  open(tabsName, id) {
    let tabsContainer = document.querySelector(
      "[" + this.options.tabsNameAttrName + '="' + tabsName + '"]'
    );
    let targetTab = tabsContainer.querySelector(
      "[" + this.options.tabsIdAttrName + '="' + id + '"]'
    );
    let targetPanel = tabsContainer.querySelector(
      "[" + this.options.panelsIdAttrName + '="' + id + '"]'
    );

    targetTab.setAttribute("tabindex", 0);
    targetTab.setAttribute("aria-selected", "true");
    targetTab.classList.add(this.options.activeTabClassName);

    const targetTabSiblings = siblings(targetTab);
    Array.prototype.forEach.call(targetTabSiblings, tab => {
      tab.setAttribute("tabindex", "-1");
      tab.setAttribute("aria-selected", "false");
      tab.classList.remove(this.options.activeTabClassName);
    });

    targetPanel.setAttribute("aria-hidden", "false");
    targetPanel.classList.add(this.options.activePanelClassName);

    const targetPanelSiblings = siblings(targetPanel);
    Array.prototype.forEach.call(targetPanelSiblings, panel => {
      panel.setAttribute("aria-hidden", "true");
      panel.classList.remove(this.options.activePanelClassName);
    });

    simulate("change", window);
  }

  hidePreloader() {
    if (this.preloader) {
      this.preloader.style.display = "none";
    }
  }

  parseHash(hash) {
    let data = hash.split("__");
    return {
      name: data[0],
      id: data[1]
    };
  }

  onHashchangeHandler() {
    let hash = window.location.hash.replace("#", "");

    if (hash !== "") {
      let hashData = this.parseHash(hash);

      let tabsContainer = document.querySelector(
        "[" + this.options.tabsNameAttrName + '="' + hashData.name + '"]'
      );

      if (tabsContainer.length) {
        if (typeof hashData.id !== undefined) {
          this.open(hashData.name, hashData.id);
        } else {
          this.open(hashData.name, this.firstTabId);
        }
      }
    }
  }

  handleKeydown(event) {
    let first = 0;
    let last = this.tabs.length - 1;

    switch (event.which) {
      case KEYCODE.LEFT:
      case KEYCODE.UP:
        event.preventDefault();
        event.stopPropagation();

        if (this.selected === first) {
          this.selected = last;
        } else {
          this.selected--;
        }

        break;

      case KEYCODE.RIGHT:
      case KEYCODE.DOWN:
        event.preventDefault();
        event.stopPropagation();

        if (this.selected >= last) {
          this.selected = first;
        } else {
          this.selected++;
        }

        break;

      case KEYCODE.HOME:
        event.preventDefault();
        event.stopPropagation();

        this.selected = first;

        break;

      case KEYCODE.END:
        event.preventDefault();
        event.stopPropagation();

        this.selected = last;

        break;

      case KEYCODE.ENTER:
      case KEYCODE.SPACE:
        event.preventDefault();
        event.stopPropagation();

        break;
    }

    this.tabs[this.selected].focus();
  }

  setA11yAttrs() {
    this.tabs[0].parentNode.setAttribute("role", "tablist");

    this.description.setAttribute("id", this.descId);

    Array.prototype.forEach.call(this.tabs, tab => {
      tab.setAttribute("id", this.triggerId);
      tab.setAttribute("tabindex", "-1");
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("aria-controls", this.panelId);
    });

    Array.prototype.forEach.call(this.panels, panel => {
      panel.setAttribute("id", this.panelId);
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-hidden", "true");
      panel.setAttribute("aria-labelledby", this.triggerId);
    });
  }
}

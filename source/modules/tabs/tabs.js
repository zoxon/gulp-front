import init from "@/modules/_utils/plugin-init";
import getSiblings from "@/modules/_utils/dom/getSiblings";
import simulate from "@/modules/_utils/event/simulate";
import { mapAttributes } from "@/modules/_utils/dom/attr";
import { KEYCODES } from "@/modules/_utils/constants";
import toArray from "@/modules/_utils/dom/toArray";

let instances = 0;

class Tabs {
  constructor(element, options) {
    this.element = element;
    this.name = "tabs";
    this.count = instances++;

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
      ...this._defaults,
      ...options
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
    const {
      tabsNameAttrName,
      tabsIdAttrName,
      panelsIdAttrName,
      preloaderSelector,
      descriptionSelector
    } = this.options;

    this.tabsName = this.element.getAttribute(tabsNameAttrName);
    this.tabs = toArray(this.element.querySelectorAll(`[${tabsIdAttrName}]`));
    this.firstTab = this.tabs[0];
    this.firstTabId = this.firstTab.getAttribute(tabsIdAttrName);
    this.panels = toArray(
      this.element.querySelectorAll(`[${panelsIdAttrName}]`)
    );
    this.panelId = this.name + "__panel_index-" + this.count;
    this.preloader = this.element.querySelector(preloaderSelector);
    this.description = this.element.querySelector(descriptionSelector);
    this.descId =
      this.name + "__description_index-" + Math.ceil(Math.random() * 1000);
    this.triggerId = this.name + "__trigger_index-" + this.count;
    this.selected = 0;
  }

  bindEvents() {
    const plugin = this;

    ["hashchange", "onpopstate"].forEach(eventName => {
      window.addEventListener(eventName, () => {
        plugin.onHashchangeHandler.call(plugin);
      });

      simulate(eventName, window);
    });

    ["focus", "click"].forEach(eventName => {
      plugin.tabs.forEach(tab => {
        tab.addEventListener(eventName, event => {
          event.preventDefault();

          let id = event.target.getAttribute(this.options.tabsIdAttrName);
          plugin.open(plugin.tabsName, id);

          window.location.hash = plugin.tabsName + "__" + id;
        });
      });
    });

    plugin.tabs.forEach(tab => {
      tab.addEventListener("keydown", event => {
        plugin.handleKeydown.call(plugin, event);
      });
    });
  }

  open(tabsName, id) {
    const {
      tabsNameAttrName,
      tabsIdAttrName,
      panelsIdAttrName,
      activeTabClassName,
      activePanelClassName
    } = this.options;

    const tabsContainer = document.querySelector(
      `[${tabsNameAttrName}="${tabsName}"]`
    );
    const targetTab = tabsContainer.querySelector(
      `[${tabsIdAttrName}="${id}"]`
    );
    const targetPanel = tabsContainer.querySelector(
      `[${panelsIdAttrName}="${id}"]`
    );

    mapAttributes(targetTab, {
      tabindex: "0",
      "aria-selected": "true"
    });
    targetTab.classList.add(activeTabClassName);

    const targetTabSiblings = toArray(getSiblings(targetTab));
    targetTabSiblings.forEach(tab => {
      mapAttributes(tab, {
        tabindex: "-1",
        "aria-selected": "false"
      });
      tab.classList.remove(activeTabClassName);
    });

    targetPanel.setAttribute("aria-hidden", "false");
    targetPanel.classList.add(activePanelClassName);

    const targetPanelSiblings = toArray(getSiblings(targetPanel));
    targetPanelSiblings.forEach(panel => {
      panel.setAttribute("aria-hidden", "true");
      panel.classList.remove(activePanelClassName);
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
      name: data[0] || null,
      id: data[1] || null
    };
  }

  onHashchangeHandler() {
    let hash = window.location.hash.replace("#", "");

    if (hash !== "") {
      let { name, id } = this.parseHash(hash);

      let tabsContainer = document.querySelector(
        `[${this.options.tabsNameAttrName}="${name}"]`
      );

      if (tabsContainer && name) {
        this.open(name, id ? id : this.firstTabId);
      }
    }
  }

  handleKeydown(event) {
    let first = 0;
    let last = this.tabs.length - 1;

    switch (event.which) {
      case KEYCODES.LEFT_ARROW:
      case KEYCODES.UP_ARROW:
        event.preventDefault();
        event.stopPropagation();

        if (this.selected === first) {
          this.selected = last;
        } else {
          this.selected--;
        }

        break;

      case KEYCODES.RIGHT_ARROW:
      case KEYCODES.DOWN_ARROW:
        event.preventDefault();
        event.stopPropagation();

        if (this.selected >= last) {
          this.selected = first;
        } else {
          this.selected++;
        }

        break;

      case KEYCODES.HOME:
        event.preventDefault();
        event.stopPropagation();

        this.selected = first;

        break;

      case KEYCODES.END:
        event.preventDefault();
        event.stopPropagation();

        this.selected = last;

        break;

      case KEYCODES.ENTER:
      case KEYCODES.SPACE:
        event.preventDefault();
        event.stopPropagation();

        break;
    }

    this.tabs[this.selected].focus();
  }

  setA11yAttrs() {
    this.tabs[0].parentNode.setAttribute("role", "tablist");

    this.description.setAttribute("id", this.descId);

    this.tabs.forEach(tab => {
      mapAttributes(tab, {
        id: this.triggerId,
        tabindex: "-1",
        role: "tab",
        "aria-selected": "false",
        "aria-controls": this.panelId
      });
    });

    this.panels.forEach(panel => {
      mapAttributes(panel, {
        id: this.panelId,
        role: "tabpanel",
        "aria-hidden": "true",
        "aria-labelledby": this.triggerId
      });
    });
  }
}

export default init(Tabs);

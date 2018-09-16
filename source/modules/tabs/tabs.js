import Plugin, { init } from "@/modules/_utils/Plugin";
import getSiblings from "@/modules/_utils/dom/getSiblings";
import simulate from "@/modules/_utils/event/simulate";
import { mapAttributes } from "@/modules/_utils/dom/attr";
import { KEYCODES } from "@/modules/_utils/constants";
import toArray from "@/modules/_utils/dom/toArray";
import generateId from "@/modules/_utils/generateId";

class Tabs extends Plugin {
  defaults() {
    return {
      descriptionSelector: "[data-tabs-description]",
      preloaderSelector: "[data-tabs-preloader]",
      tabsIdAttrName: "data-tab-id",
      panelsIdAttrName: "data-panel-id",
      tabsNameAttrName: "data-tabs-name"
    };
  }

  init() {
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
    this.panelId = `_${generateId()}`;
    this.preloader = this.element.querySelector(preloaderSelector);
    this.description = this.element.querySelector(descriptionSelector);
    this.descId = `_${generateId()}`;
    this.triggerId = `_${generateId()}`;
    this.selected = 0;
  }

  bindEvents() {
    const plugin = this;

    ["hashchange", "onpopstate"].forEach(eventName => {
      window.addEventListener(eventName, () => {
        plugin.onHashchangeHandler();
      });

      simulate(eventName, window);
    });

    ["focus", "click"].forEach(eventName => {
      plugin.tabs.forEach(tab => {
        tab.addEventListener(eventName, event => {
          event.preventDefault();

          let id = tab.getAttribute(this.options.tabsIdAttrName);
          plugin.open(plugin.tabsName, id);

          window.location.hash = `${plugin.tabsName}__${id}`;
        });
      });
    });

    plugin.tabs.forEach(tab => {
      tab.addEventListener("keydown", event => {
        plugin.handleKeydown(event);
      });
    });
  }

  open(tabsName, id) {
    const { tabsNameAttrName, tabsIdAttrName, panelsIdAttrName } = this.options;

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

    const targetTabSiblings = toArray(getSiblings(targetTab));
    targetTabSiblings.forEach(tab => {
      mapAttributes(tab, {
        tabindex: "-1",
        "aria-selected": "false"
      });
    });

    targetPanel.setAttribute("aria-hidden", "false");

    const targetPanelSiblings = toArray(getSiblings(targetPanel));
    targetPanelSiblings.forEach(panel => {
      panel.setAttribute("aria-hidden", "true");
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
        this.open(name, id || this.firstTabId);
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

      default:
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

export default init(Tabs, "tabs");

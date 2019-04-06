import attrs from "attrs";

import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import getSiblings from "@/scripts/helpers/dom/getSiblings";
import simulate from "@/scripts/helpers/event/simulate";
import { KEYCODES } from "@/scripts/helpers/constants";
import toArray from "@/scripts/helpers/dom/toArray";
import generateId from "@/scripts/helpers/generateId";
// eslint-disable-next-line no-unused-vars
import { h } from "jsx-dom/svg";

class Tabs extends Plugin {
  defaults() {
    return {
      descriptionSelector: "[data-tabs-description]",
      preloaderSelector: "[data-tabs-preloader]",
      tabsIdAttrName: "data-tab-id",
      panelsIdAttrName: "data-panel-id",
      tabsNameAttrName: "data-tabs-name",
      headerAttrSelector: "[data-tabs-header]",
      activeBarAttr: "data-tabs-active-bar"
    };
  }

  init() {
    this.setA11yAttrs();

    this.hidePreloader();
    this.open(this.tabsName, this.firstTabId);
  }

  buildCache() {
    const {
      tabsNameAttrName,
      tabsIdAttrName,
      panelsIdAttrName,
      preloaderSelector,
      descriptionSelector,
      headerAttrSelector,
      activeBarAttr
    } = this.options;

    this.tabsName = this.element.getAttribute(tabsNameAttrName);
    this.header = this.element.querySelector(headerAttrSelector);
    this.tabs = toArray(this.element.querySelectorAll(`[${tabsIdAttrName}]`));
    this.firstTab = this.tabs[0];
    this.firstTabId = this.firstTab.getAttribute(tabsIdAttrName);
    this.panels = toArray(
      this.element.querySelectorAll(`[${panelsIdAttrName}]`)
    );
    this.preloader = this.element.querySelector(preloaderSelector);
    this.description = this.element.querySelector(descriptionSelector);
    this.activeBar = this.header.appendChild(
      h("span", {
        [activeBarAttr]: true
      })
    );
    this.selected = 0;
  }

  bindEvents() {
    const plugin = this;

    ["focus", "click"].forEach(eventName => {
      plugin.tabs.forEach(tab => {
        tab.addEventListener(eventName, event => {
          event.preventDefault();

          let id = tab.getAttribute(this.options.tabsIdAttrName);
          plugin.open(plugin.tabsName, id);
        });
      });
    });

    plugin.tabs.forEach(tab => {
      tab.addEventListener("keydown", event => {
        plugin.handleKeydown(event);
      });
    });
  }

  generateId() {
    return "_" + generateId();
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

    const tabRect = targetTab.getBoundingClientRect();

    attrs(this.activeBar, {
      style: {
        left: targetTab.offsetLeft + "px",
        width: tabRect.width + "px"
      }
    });

    attrs(targetTab, {
      tabindex: "0",
      "aria-selected": "true"
    });

    const targetTabSiblings = toArray(getSiblings(targetTab));
    targetTabSiblings.forEach(tab => {
      attrs(tab, {
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
    const { panelsIdAttrName, tabsIdAttrName } = this.options;
    const descriptionId = `${this.tabsName}__descripiton`;

    this.description.setAttribute("id", descriptionId);
    this.firstTab.setAttribute("aria-describedby", descriptionId);

    this.tabs.forEach(tab => {
      const tabId = tab.getAttribute(tabsIdAttrName);

      const targetPanel = this.element.querySelector(
        `[${panelsIdAttrName}="${tabId}"]`
      );

      const generatedTabId = `${this.tabsName}__tab-${tabId}`;

      tab.setAttribute("id", "generatedTabId");
      targetPanel.setAttribute("aria-labelledby", generatedTabId);
    });
  }
}

export default init(Tabs, "tabs");

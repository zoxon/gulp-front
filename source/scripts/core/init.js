import {
  isDomNode,
  isString,
  isArray,
  isUndefined,
  isNull
} from "@/scripts/helpers/is";
import toArray from "@/scripts/helpers/dom/toArray";

export default (Plugin, name = "plugin") => {
  return (_selectors, options = {}) => {
    const getSelector = selector => {
      if (isUndefined(selector) || isNull(selector)) {
        return [document.body];
      }

      if (isArray(selector)) {
        return selector;
      }

      return [selector];
    };

    const selectors = getSelector(_selectors);
    let instances = [];

    selectors.forEach(selector => {
      if (selector && isString(selector)) {
        const elements = toArray(document.querySelectorAll(selector));
        elements.forEach(element => {
          instances.push(new Plugin(element, options, name));
        });
      }

      if (isDomNode(selector)) {
        instances.push(new Plugin(selector, options, name));
      }
    });

    return instances;
  };
};

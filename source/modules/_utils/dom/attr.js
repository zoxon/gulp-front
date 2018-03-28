import is from "is_js";

/**
 * Map object to dom element attributes
 *
 * @export
 * @param {element} element
 * @param {object} attributes
 */
export function mapAttributes(element, attributes) {
  const nType = element.nodeType;

  // Don't get/set attributes on text, comment and attribute nodes
  if (nType === 3 || nType === 8 || nType === 2) {
    return;
  }

  // Fallback to prop when attributes are not supported
  if (typeof element.getAttribute === "undefined") {
    throw new Error("Prop when attributes are not supported by attr()");
  }

  if (typeof attributes === "object") {
    for (let key in attributes) {
      const value = attributes[key];

      element.setAttribute(key, is.string(value) ? value : value.toString());
    }
  }
}

export default function attr(element, name, value) {
  let attributes = {};

  if (value !== undefined) {
    attributes[name] = value;
    mapAttributes(element);
  } else {
    return element.getAttribute(name) || "";
  }
}

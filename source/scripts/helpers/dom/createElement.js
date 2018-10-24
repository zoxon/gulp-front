/* Example usage:
 * let el = createElement('div', {style: 'color: green'}, 'Hello world!');
 * document.body.appendChild(el);
 */

import { isDomNode } from "@/scripts/helpers/is";

export const createElement = (type, props, ...children) => {
  if (type.constructor === Function) {
    return type(props);
  }

  let el = document.createElement(type);

  for (let propName in props || {}) {
    if (/^on/.test(propName)) {
      el.addEventListener(propName.substring(2).toLowerCase(), props[propName]);
    } else {
      el[propName] = props[propName];
    }
  }

  for (let child of children || []) {
    if (child) {
      if (child.constructor === String) {
        child = document.createTextNode(child);
      }

      el.appendChild(child);
    }
  }

  return el;
};

export const render = (element, rootComponent) => {
  if (!isDomNode(element)) {
    throw new Error("First parameter should be a DOM Node");
  }

  return element.appendChild(rootComponent());
};

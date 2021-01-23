/*
 * Example usage:
 * let el = createElement('div', {style: 'color: green'}, 'Hello world!');
 * document.body.appendChild(el);
 */

import { isDomNode } from "@/scripts/helpers/is";

export const createElement = (type, properties, ...children) => {
  if (type.constructor === Function) {
    return type(properties);
  }

  const element = document.createElement(type);

  for (const propertyName in properties || {}) {
    if (propertyName.startsWith("on")) {
      element.addEventListener(
        propertyName.slice(2).toLowerCase(),
        properties[propertyName]
      );
    } else {
      element[propertyName] = properties[propertyName];
    }
  }

  for (let child of children || []) {
    if (child) {
      if (child.constructor === String) {
        child = document.createTextNode(child);
      }

      element.append(child);
    }
  }

  return element;
};

export const render = (element, rootComponent) => {
  if (!isDomNode(element)) {
    throw new Error("First parameter should be a DOM Node");
  }

  // eslint-disable-next-line unicorn/prefer-dom-node-append
  return element.appendChild(rootComponent());
};

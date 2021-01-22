import "../polyfill/matches";

/*! getParents.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/getParents */
/**
 * Get all of an element's parent elements up the DOM tree
 * @param  {Node}   elem     The element
 * @param  {String} selector Selector to match against [optional]
 * @return {Array}           The parent elements
 */
const getParents = (element, selector) => {
  // Setup parents array
  const parents = [];

  // Get matching parent elements
  for (; element && element !== document; element = element.parentNode) {
    // Add matching parents to array
    if (selector) {
      if (element.matches(selector)) {
        parents.push(element);
      }
    } else {
      parents.push(element);
    }
  }

  return parents;
};

export default getParents;

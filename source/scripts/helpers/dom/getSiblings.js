/*! getSiblings.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/getSiblings */
/**
 * Get all siblings of an element
 * @param  {Node}  elem The element
 * @return {Array}      The siblings
 */
let getSiblings = function(elem) {
  let siblings = [];
  let sibling = elem.parentNode.firstChild;
  for (; sibling; sibling = sibling.nextSibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
  }
  return siblings;
};

export default getSiblings;

// Usage example:
// let elem = document.querySelector("#some-element");
// let siblings = getSiblings(elem);

/*! getSiblings.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/getSiblings */
/**
 * Get all siblings of an element
 * @param  {Node}  elem The element
 * @return {Array}      The siblings
 */
const getSiblings = function (element) {
  const siblings = [];
  let sibling = element.parentNode.firstChild;

  for (; sibling; sibling = sibling.nextSibling) {
    if (sibling.nodeType === 1 && sibling !== element) {
      siblings.push(sibling);
    }
  }

  return siblings;
};

export default getSiblings;

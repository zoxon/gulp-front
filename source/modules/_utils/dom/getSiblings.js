/**
 * Get all siblings of an element
 * @param  {Node}  elem The element
 * @return {Array}      The siblings
 */
let getSiblings = elem => {
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

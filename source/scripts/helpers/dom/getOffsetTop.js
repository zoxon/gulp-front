/*! getOffsetTop.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/getOffsetTop */
/**
 * Get an element's distance from the top of the Document.
 * @param  {Node} elem The element
 * @return {Number}    Distance from the top in pixels
 */
const getOffsetTop = function (element) {
  let location = 0;
  if (element.offsetParent) {
    do {
      location += element.offsetTop;
      element = element.offsetParent;
    } while (element);
  }
  return location >= 0 ? location : 0;
};

export default getOffsetTop;

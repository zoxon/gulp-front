/*! getOffsetTop.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/getOffsetTop */
/**
 * Get an element's distance from the top of the Document.
 * @param  {Node} elem The element
 * @return {Number}    Distance from the top in pixels
 */
let getOffsetTop = function(elem) {
  let location = 0;
  if (elem.offsetParent) {
    do {
      location += elem.offsetTop;
      elem = elem.offsetParent;
    } while (elem);
  }
  return location >= 0 ? location : 0;
};

export default getOffsetTop;

// Element.matches() polyfill
(function(ElementProto) {
  if (typeof ElementProto.matches !== "function") {
    ElementProto.matches =
      ElementProto.msMatchesSelector ||
      ElementProto.mozMatchesSelector ||
      ElementProto.webkitMatchesSelector ||
      function matches(selector) {
        let element = this;
        let elements = (
          element.document || element.ownerDocument
        ).querySelectorAll(selector);
        let index = 0;

        while (elements[index] && elements[index] !== element) {
          ++index;
        }

        return Boolean(elements[index]);
      };
  }
})(window.Element.prototype);

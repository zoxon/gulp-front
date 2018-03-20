// Element.closest() polyfill
(function(ElementProto) {
  if (typeof ElementProto.closest !== "function") {
    ElementProto.closest = function closest(selector) {
      let element = this;

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentNode;
      }

      return null;
    };
  }
})(window.Element.prototype);

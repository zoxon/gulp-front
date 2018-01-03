function init(Plugin) {
  return function(selector, options = {}) {
    let elements = document.documentElement;

    if (selector) {
      elements = document.querySelectorAll(selector);
    }

    Array.prototype.forEach.call(elements, element => {
      return new Plugin(element, options);
    });
  };
}

export default init;

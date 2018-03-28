function init(Plugin) {
  return function(selector, options = {}) {
    let elements = document.documentElement;

    if (selector) {
      elements = document.querySelectorAll(selector);

      return [].map.call(elements, element => {
        return new Plugin(element, options);
      });
    }

    return new Plugin(options);
  };
}

export default init;

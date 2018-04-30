import init from "@/modules/_utils/plugin-init";
import { createElement } from "@/modules/_utils/dom/createElement";

class File {
  constructor(element, options) {
    this.element = element;
    this.name = "file";

    this._defaults = {
      language: "en",
      messages: {
        ru: {
          selected: "Файлов выбрано: {count}",
          nothing: "Ничего не выбрано",
          button: "Выбрать файл(ы)"
        },
        en: {
          selected: "Files selected: {count}",
          nothing: "Nothing is selected",
          button: "Select the file(s)"
        }
      },
      baseClassName: "file",
      initedClassName: "file_inited",
      buttonClassName: "file__button",
      labelClassName: "file__label"
    };

    this.options = {
      ...this._defaults,
      ...options
    };

    this.messages = this.options.messages[this.options.language];

    this.init();
  }

  init() {
    this.buildCache();
    this.bindEvents();

    this.element.classList.add(this.options.initedClassName);
    this.renderElements();
  }

  buildCache() {
    const { buttonClassName, labelClassName } = this.options;

    this.control = this.element.querySelector('input[type="file"]');
    this.button = createElement(
      "span",
      { className: buttonClassName },
      this.messages.button
    );
    this.label = createElement(
      "span",
      { className: labelClassName },
      this.messages.nothing
    );
  }

  renderElements() {
    [this.button, this.label].forEach(item => this.element.appendChild(item));
  }

  bindEvents() {
    this.control.addEventListener("change", event => {
      this.controlChangeHandler.call(this, event);
    });
  }

  controlChangeHandler(event) {
    let fileName = "";

    const files = event.target.files;

    if (files && files.length > 1) {
      fileName = this.messages.selected.replace("{count}", files.length);
    } else {
      fileName = event.target.value.split("\\").pop();
    }

    if (fileName) {
      this.label.innerHTML = fileName;
    } else {
      this.label.innerHTML = this.messages.nothing;
    }
  }
}

export default init(File);

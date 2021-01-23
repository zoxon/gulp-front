import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import { createElement } from "@/scripts/helpers/dom/createElement";

class File extends Plugin {
  defaults() {
    return {
      language: "en",
      messages: {
        ru: {
          selected: "Файлов выбрано: {count}",
          nothing: "Ничего не выбрано",
          button: "Выбрать файл(ы)",
        },
        en: {
          selected: "Files selected: {count}",
          nothing: "Nothing is selected",
          button: "Select the file(s)",
        },
      },
      baseClassName: "file",
      initedClassName: "file_inited",
      buttonClassName: "file__button",
      labelClassName: "file__label",
    };
  }

  init() {
    this.element.classList.add(this.options.initedClassName);
    this.renderElements();
  }

  buildCache() {
    const {
      buttonClassName,
      labelClassName,
      messages,
      language,
    } = this.options;

    this.messages = messages[language];
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
    this.element.append(this.button, this.label);
  }

  bindEvents() {
    this.control.addEventListener("change", (event) => {
      this.controlChangeHandler(event);
    });
  }

  controlChangeHandler(event) {
    let fileName = "";

    const files = event.target.files;

    fileName =
      files && files.length > 1
        ? this.messages.selected.replace("{count}", files.length)
        : event.target.value.split("\\").pop();

    if (fileName) {
      this.label.innerHTML = fileName;
    } else {
      this.label.innerHTML = this.messages.nothing;
    }
  }
}

export default init(File, "file");

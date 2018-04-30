import init from "@/modules/_utils/plugin-init";

class Code {
  constructor(element, options) {
    this.element = element;
    this.name = "code";

    this._defaults = {
      baseClassName: "code",
      lineClassName: "code__line"
    };

    this.options = {
      ...this._defaults,
      ...options
    };

    this.init();
  }

  init() {
    this.buildCache();
    this.wrapLines();
  }

  buildCache() {
    this.code = this.element.querySelector("code");
    this.lines = this.code.innerHTML.split("\n");
  }

  wrapLines() {
    this.element.innerHTML = this.generateNewCode();
  }

  generateNewCode() {
    let code = "";
    const linesCount = this.lines.length;

    this.lines.forEach((line, index) => {
      const wrapLine = line => `<div class="code__line">${line}</div>`;

      if (line.length > 0) {
        code += wrapLine(line);
      } else {
        if (linesCount !== index + 1) {
          code += wrapLine(" ");
        }
      }
    });

    return code;
  }
}

export default init(Code);

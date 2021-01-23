import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";

class Code extends Plugin {
  defaults() {
    return {
      baseClassName: "code",
      lineClassName: "code__line",
    };
  }

  init() {
    this.wrapLines();
  }

  buildCache() {
    this.code = this.element.querySelector("code");
    this.lines = this.code.innerHTML.split("\n");
  }

  wrapLines() {
    this.element.innerHTML = this.generateNewCode();
  }

  wrapLine(line) {
    return `<div class="code__line">${line}</div>`;
  }

  generateNewCode() {
    let code = "";
    const linesCount = this.lines.length;

    this.lines.forEach((line, index) => {
      if (line.length > 0) {
        code += this.wrapLine(line);
      } else {
        if (linesCount !== index + 1) {
          code += this.wrapLine(" ");
        }
      }
    });

    return code;
  }
}

export default init(Code, "code");

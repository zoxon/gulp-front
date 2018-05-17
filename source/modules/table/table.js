import Plugin, { init } from "@/modules/_utils/Plugin";
import getIndex from "@/modules/_utils/dom/getIndex";

class Table extends Plugin {
  defaults() {
    return {
      initedClassName: "table_responsive",
      cellAttributeName: "data-th",
      cellInnerClassName: "table__content"
    };
  }

  init() {
    this.updateCells();
    this.setInited();
  }

  buildCache() {
    this.cells = this.element.querySelectorAll("td");
    this.headings = this.element.querySelectorAll(this.findHeadings());
  }

  findHeadings() {
    if (this.element.querySelectorAll("thead tr th").length) {
      return "thead th";
    }
    if (this.element.querySelectorAll("tfoot tr th").length) {
      return "tfoot th";
    } else if (this.element.querySelectorAll("tbody tr th").length) {
      return "tbody tr th";
    } else if (this.element.querySelectorAll("th").length) {
      return "tr:first th";
    } else if (this.element.querySelectorAll("thead tr td").length) {
      return "thead td";
    } else if (this.element.querySelectorAll("tfoot tr td").length) {
      return "tfoot td";
    } else {
      return "tr:first td";
    }
  }

  getHeadings() {
    let headings = [];

    Array.prototype.forEach.call(this.headings, heading => {
      const colspan = parseInt(heading.getAttribute("colspan"), 10) || 1;
      const row = getIndex(heading.closest("tr")) - 1;

      if (!headings[row]) {
        headings[row] = [];
      }

      for (let i = 0; i < colspan; i++) {
        headings[row].push(heading);
      }
    });

    return headings;
  }

  updateCells() {
    const headings = this.getHeadings();
    const { cellAttributeName } = this.options;

    Array.prototype.forEach.call(this.cells, cell => {
      const cellIndex = getIndex(cell) - 1;

      let headingText = "";

      for (let j = 0; j < headings.length; j++) {
        const heading = headings[j][cellIndex];
        headingText += heading.textContent;
      }

      cell.setAttribute(cellAttributeName, headingText);
      this.wrappCellContent(cell);
    });
  }

  wrappCellContent(cell) {
    const { cellInnerClassName } = this.options;

    const isCellContentWrapped = cell =>
      cell.querySelector(`span.${cellInnerClassName}`);

    if (isCellContentWrapped(cell)) {
      cell.wrapInner(`<span class="${cellInnerClassName}" />`);
    }
  }

  setInited() {
    this.element.classList.add(this.options.initedClassName);
  }
}

export default init(Table, "table");

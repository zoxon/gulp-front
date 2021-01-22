import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import getIndex from "@/scripts/helpers/dom/getIndex";

class Table extends Plugin {
  defaults() {
    return {
      cellAttributeName: "data-th",
      cellInnerClassName: "table__content",
    };
  }

  init() {
    this.updateCells();
  }

  buildCache() {
    this.cells = this.element.querySelectorAll("td");
    this.headings = this.element.querySelectorAll(this.findHeadings());
  }

  findHeadings() {
    if (this.element.querySelectorAll("thead tr th").length > 0) {
      return "thead th";
    }
    if (this.element.querySelectorAll("tfoot tr th").length > 0) {
      return "tfoot th";
    } else if (this.element.querySelectorAll("tbody tr th").length > 0) {
      return "tbody tr th";
    } else if (this.element.querySelectorAll("th").length > 0) {
      return "tr:first th";
    } else if (this.element.querySelectorAll("thead tr td").length > 0) {
      return "thead td";
    } else if (this.element.querySelectorAll("tfoot tr td").length > 0) {
      return "tfoot td";
    } else {
      return "tr:first td";
    }
  }

  getHeadings() {
    const headings = [];

    Array.prototype.forEach.call(this.headings, (heading) => {
      const colspan = Number.parseInt(heading.getAttribute("colspan"), 10) || 1;
      const row = getIndex(heading.closest("tr")) - 1;

      if (!headings[row]) {
        headings[row] = [];
      }

      for (let index = 0; index < colspan; index++) {
        headings[row].push(heading);
      }
    });

    return headings;
  }

  updateCells() {
    const headings = this.getHeadings();
    const { cellAttributeName } = this.options;

    Array.prototype.forEach.call(this.cells, (cell) => {
      const cellIndex = getIndex(cell) - 1;

      let headingText = "";

      for (const heading_ of headings) {
        const heading = heading_[cellIndex];
        headingText += heading.textContent;
      }

      cell.setAttribute(cellAttributeName, headingText);
      this.wrappCellContent(cell);
    });
  }

  wrappCellContent(cell) {
    const { cellInnerClassName } = this.options;

    const isCellContentWrapped = (cell) =>
      cell.querySelector(`span.${cellInnerClassName}`);

    if (isCellContentWrapped(cell)) {
      cell.wrapInner(`<span class="${cellInnerClassName}" />`);
    }
  }
}

export default init(Table, "table");

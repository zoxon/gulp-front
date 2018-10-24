import Tooltip from "tooltip.js";
import toArray from "@/scripts/helpers/dom/toArray";

export default () => {
  const tooltips = toArray(document.querySelectorAll("[data-tooltip-id]"));

  tooltips.forEach(tooltip => {
    const id = tooltip.getAttribute("data-tooltip-id");
    const placement = tooltip.getAttribute("data-tooltip-placement");
    const target = document.querySelector(`[data-tooltip-target="${id}"]`);

    return new Tooltip(tooltip, {
      template: `<div class="tooltip" role="tooltip">
        <div class="tooltip__arrow"></div>
        <div class="tooltip__inner"></div>
      </div>`,
      html: true,
      title: target.innerHTML,
      placement
    });
  });
};

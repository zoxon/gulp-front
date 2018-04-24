import { $, $$ } from "@/modules/_utils/dom/select";
import Tooltip from "tooltip.js";

export default () => {
  const tooltips = $$("[data-tooltip-id]");

  Array.prototype.forEach.call(tooltips, tooltip => {
    const id = tooltip.getAttribute("data-tooltip-id");
    const placement = tooltip.getAttribute("data-tooltip-placement");
    const target = $('[data-tooltip-target="' + id + '"]');

    new Tooltip(tooltip, {
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

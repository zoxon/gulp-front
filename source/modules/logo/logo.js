import scroll from "scroll";
import scrollDoc from "scroll-doc";

import { $ } from "../_utils/dom/select";

const page = scrollDoc();

const logo = $(".logo");
const duration = 700;

logo.addEventListener("click", event => {
  event.preventDefault();

  let options = { duration };
  const to = 0;

  if (page.scrollTop) {
    const cancel = scroll.top(page, to, options, () => {
      page.removeEventListener("wheel", cancel);
    });

    page.addEventListener("wheel", cancel);
  }
});

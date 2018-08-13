import scroll from "scroll";
import scrollDoc from "scroll-doc";

const page = scrollDoc();

function scrollTo({ to = 0, options = { duration: 700 } }) {
  if (page.scrollTop >= 0) {
    const cancel = scroll.top(page, to, options, () => {
      page.removeEventListener("wheel", cancel);
    });

    page.addEventListener("wheel", cancel);
  }
}

export default scrollTo;

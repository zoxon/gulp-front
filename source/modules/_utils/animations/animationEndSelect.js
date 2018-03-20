// Determine which animationend event is supported
function animationEndSelect() {
  let t;
  let el = document.createElement("fake");
  let transitions = {
    transition: "animationend",
    OTransition: "oAnimationEnd",
    MozTransition: "animationend",
    WebkitTransition: "webkitAnimationEnd"
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

export default animationEndSelect;

/* global document */
const transitionEndEventNames = {
  transition: "transitionend",
  WebkitTransition: "webkitTransitionEnd",
  MozTransition: "transitionend",
  OTransition: "oTransitionEnd",
  msTransition: "MSTransitionEnd"
};

const animationEndEventNames = {
  animation: "animationend",
  WebkitAnimation: "webkitAnimationEnd",
  MozAnimation: "animationend",
  OAnimation: "oanimationend",
  msAnimation: "MSAnimationEnd"
};

const animationIterationEventNames = {
  animation: "animationiteration",
  WebkitAnimation: "webkitAnimationIteration",
  MozAnimation: "animationiteration",
  OAnimation: "oAnimationIteration",
  msAnimation: "MSAnimationIteration"
};

const testEvent = props => {
  const el = document.createElement("span");

  for (const prop in props) {
    if (typeof el.style[prop] !== "undefined") {
      return props[prop];
    }
  }

  return false;
};

export const transitionEndEventName = () => testEvent(transitionEndEventNames);
export const animationEndEventName = () => testEvent(animationEndEventNames);
export const animationIterationEventName = () =>
  testEvent(animationIterationEventNames);

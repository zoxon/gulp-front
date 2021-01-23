/* global document */
const transitionEndEventNames = {
  transition: "transitionend",
  WebkitTransition: "webkitTransitionEnd",
  MozTransition: "transitionend",
  OTransition: "oTransitionEnd",
  msTransition: "MSTransitionEnd",
};

const animationEndEventNames = {
  animation: "animationend",
  WebkitAnimation: "webkitAnimationEnd",
  MozAnimation: "animationend",
  OAnimation: "oanimationend",
  msAnimation: "MSAnimationEnd",
};

const animationIterationEventNames = {
  animation: "animationiteration",
  WebkitAnimation: "webkitAnimationIteration",
  MozAnimation: "animationiteration",
  OAnimation: "oAnimationIteration",
  msAnimation: "MSAnimationIteration",
};

const testEvent = (properties) => {
  const element = document.createElement("span");

  for (const property in properties) {
    if (typeof element.style[property] !== "undefined") {
      return properties[property];
    }
  }

  return false;
};

export const transitionEndEventName = () => testEvent(transitionEndEventNames);
export const animationEndEventName = () => testEvent(animationEndEventNames);
export const animationIterationEventName = () =>
  testEvent(animationIterationEventNames);

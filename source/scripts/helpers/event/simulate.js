/**
 * Call an specific event by name on element
 *
 * @export
 * @param {sting} eventName - name of the event
 * @param {element} element - dom element
 */
export default function simulate(eventName, element) {
  let event = document.createEvent("HTMLEvents");
  event.initEvent(eventName, true, false);
  element.dispatchEvent(event);
}
